import { Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete, MdFileCopy, MdStickyNote2 } from 'react-icons/md';
import { RiEditCircleFill, RiQuestionnaireFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import EditMessage from '../../../../Editor/EditMessage';
import { deleteMessage, noteCreate, sendMessage, updateMessageStore } from '../../../../store/actions/messageAction';
import { FAILED_MESSAGE, SUCCESS_MESSAGE_CLEAR } from '../../../../store/type/messageTypes';
export default function MessageFunc({ isSameSenderPermission, handleTyping, isTyping, message, messageInfo }) {
    const { theme, auth, groupMessage } = useSelector(state => state);
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleCopy = () => {
        navigator.clipboard.writeText(message)
        toast.success(`Text copied to clipboard`, {
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
    if (groupMessage?.success) {
        toast.success(`${groupMessage?.success}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: SUCCESS_MESSAGE_CLEAR
        })
    }
    if (groupMessage?.error) {
        Object.values(groupMessage?.error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: FAILED_MESSAGE,
                payload: {
                    error: ''
                }
            })
        })
    }
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
                        Edit <EditMessage handleTyping={handleTyping} isTyping={isTyping} messageInfo={messageInfo} messageText={message} messageEditHandle={messageEditHandle} editMessageOpen={editMessageOpen} />
                        <span onClick={() => {
                            messageEditHandle(true)
                            dispatch(updateMessageStore(messageInfo))
                        }}>
                            <RiEditCircleFill style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </span>
                    </Typography>
                    <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span> Delete </span>
                        {messageInfo?.chat?._id && messageInfo?._id && auth?.user?.token ? <span onClick={() => {
                            dispatch(deleteMessage(messageInfo?.chat?._id, messageInfo?._id, auth?.user?.token))
                        }}><MdDelete style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </span> : <Tooltip style={{ cursor: "pointer" }} title="Permission Denied" arrow>
                            <MdDelete style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </Tooltip>}
                    </Typography>
                </>}
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span> add To Note </span>
                    <span onClick={() => dispatch(noteCreate(messageInfo?._id, messageInfo?.chat?._id, auth.user?.token))}>
                        <MdStickyNote2 style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>

                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Question Repeat </span>
                    <span onClick={() => {
                        dispatch(sendMessage('Question Repeat!', messageInfo?.chat?._id, auth.user?.token))
                    }}>
                        <AiFillThunderbolt style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span> Don't Understand
                    </span>
                    <span onClick={() => {
                        dispatch(sendMessage("Don't Understand!", messageInfo?.chat?._id, auth.user?.token))
                    }}>
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