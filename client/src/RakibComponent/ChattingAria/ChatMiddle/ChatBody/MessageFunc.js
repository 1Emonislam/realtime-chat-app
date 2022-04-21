import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Bold from '@tiptap/extension-bold';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdFileCopy, MdStickyNote2 } from 'react-icons/md';
import { RiEditCircleFill, RiQuestionnaireFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import EditMessage from '../../../../Editor/EditMessage';
import { updateMessageStore } from '../../../../store/actions/messageAction';
export default function MessageFunc({ idTo, isSameSenderPermission, message, messageInfo }) {
    const { theme } = useSelector(state => state);
    const dispatch = useDispatch()
    const output = React.useMemo(() => {
        return generateHTML(message, [
            Document,
            StarterKit, Underline, Link, CodeBlock, Bold, Code, Text, Italic,
        ])
    }, [message])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const text = document.createElement("p");
    text.innerHTML = output;
    const handleCopy = () => {
        navigator.clipboard.writeText(text.innerText)
        toast.success(`Copied ${text.innerText}`, {
            position: "top-center",
            theme: theme?.theme,
            fontWeight: '500',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const [editMessageOpen, setEditMessageOpen] = React.useState(false);
    const messageEditHandle = (condition) => {
        if (condition === true) {
            setEditMessageOpen(true)
        }
        if (condition === false) {
            setEditMessageOpen(false)
        }
    }

    // console.log(messageInfo)
    return (
        <div className='ancor'>
            <BsThreeDotsVertical id={id} onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography onClick={handleCopy} sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Copy </span>
                    <span>
                        <MdFileCopy style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
                {isSameSenderPermission && <>
                    <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        Edit  <EditMessage messageInfo={messageInfo} messageText={text.innerText} messageEditHandle={messageEditHandle} editMessageOpen={editMessageOpen}></EditMessage>
                        <span>
                            <RiEditCircleFill onClick={() => {
                                messageEditHandle(true)
                                dispatch(updateMessageStore(messageInfo))
                            }} style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </span>
                    </Typography>
                    <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Delete </span>
                        <span><MdDelete style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </span>
                    </Typography>
                </>}
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span> add To Note </span>
                    <span>
                        <MdStickyNote2 style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>

                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Question Repeat </span>
                    <span>
                        <AiFillThunderbolt style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Don't Understand</span>
                    <span>
                        <RiQuestionnaireFill style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>

            </Popover>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}