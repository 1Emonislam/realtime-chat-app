import { Tooltip } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useSpeechSynthesis } from 'react-speech-kit';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import addNoteImg from '../../../../Ashikur/chatRepliedImages/add-note.png';
import confusedImg from '../../../../Ashikur/chatRepliedImages/confused.png';
import copyImg from '../../../../Ashikur/chatRepliedImages/copy.png';
import deleteImg from '../../../../Ashikur/chatRepliedImages/delete.png';
import editImg from '../../../../Ashikur/chatRepliedImages/edit.png';
import questionImg from '../../../../Ashikur/chatRepliedImages/question.png';
// import resendImg from '../../../../Ashikur/chatRepliedImages/resend.png';
import readTextImg from '../../../../Ashikur/chatRepliedImages/readtext.png';
import EditMessage from '../../../../Editor/EditMessage';
import { deleteMessage, sendMessage, updateMessageStore } from '../../../../store/actions/messageAction';
import { FAILED_MESSAGE, SUCCESS_MESSAGE_CLEAR } from '../../../../store/type/messageTypes';
import NoteAdd from './NoteAdd';

export default function MessageFunc({ isSameSenderPermission, handleTyping, isTyping, message, messageInfo }) {
    const { theme, auth, groupMessage } = useSelector(state => state);
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [noteOpen, setNoteOpen] = React.useState(false);
    const handleNoteOpen = () => setNoteOpen(true);
    const handleNoteClose = () => setNoteOpen(false);
    // text to read
    const [value, setValue] = React.useState('');
    const { speak } = useSpeechSynthesis();

    const handleSpeechToRead = () => {
        setValue(message)
        speak({ text: value })
    }
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
       // eslint-disable-next-line react-hooks/rules-of-hooks
       useEffect(() =>{
        dispatch({
            type: FAILED_MESSAGE,
            payload: {
                error: ''
            }
        })
        toast.success(`${groupMessage?.success}`, {
            position: "top-center",
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
       // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])
    }
    if (groupMessage?.error) {
        dispatch({
            type: SUCCESS_MESSAGE_CLEAR
        })
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() =>{
            Object.values(groupMessage?.error)?.forEach((err) => {
                toast.error(`${err}`, {
                    position: "top-center",
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
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

                {/* copy message */}
                <Typography onClick={handleCopy} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}>Copy </span>
                    <span>
                        <img style={{ height: '20px', marginLeft: '10px' }} src={copyImg} alt='' />
                    </span>
                </Typography>
                {isSameSenderPermission && <>
                    <Typography onClick={() => {
                        messageEditHandle(true)
                        dispatch(updateMessageStore(messageInfo))
                    }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, fontSize: 14, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        Edit
                        <span>
                            <img style={{ height: '20px', marginLeft: '10px' }} src={editImg} alt='' />
                        </span>
                    </Typography>
                    {<EditMessage handleTyping={handleTyping} isTyping={isTyping} messageInfo={messageInfo} messageText={message} messageEditHandle={messageEditHandle} setEditMessageOpen={setEditMessageOpen} editMessageOpen={editMessageOpen} />}
                    {/* Delete message */}
                    {(messageInfo?.chat?._id && messageInfo?._id && auth?.user?.token) && <Typography onClick={() => {
                        dispatch(deleteMessage(messageInfo?.chat?._id, messageInfo?._id, auth?.user?.token))
                    }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 14 }}> Delete </span>
                        {/* {messageInfo?.chat?._id && messageInfo?._id && auth?.user?.token 
                        ? 
                        <span onClick={() => {
                            dispatch(deleteMessage(messageInfo?.chat?._id, messageInfo?._id, auth?.user?.token))
                        }}><MdDelete style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                        </span>
                         :  */}
                        <Tooltip style={{ cursor: "pointer" }} title="Delete" arrow>
                            <img style={{ height: '20px', marginLeft: '10px' }} src={deleteImg} alt='' />
                        </Tooltip>
                        {/* } */}
                    </Typography>}
                </>}
                {/* onClick={() => dispatch(noteCreate(messageInfo?._id, messageInfo?.chat?._id, auth.user?.token))} */}
                {/* Add to Note Message */}
                <Typography onClick={handleNoteOpen} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}> add To Note </span>
                    <span>
                        <img style={{ height: '20px', marginLeft: '10px' }} src={addNoteImg} alt='' />
                    </span>
                </Typography>
                <NoteAdd noteOpen={noteOpen} msg={messageInfo} handleNoteClose={handleNoteClose} handleNoteOpen={handleNoteOpen} />

                {/* this is need to solve for question */}
                <Typography onClick={() => {
                    dispatch(sendMessage('Question?', messageInfo?.chat?._id, auth.user?.token))
                }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}>Question</span>
                    <span>
                        <img style={{ height: '20px', marginLeft: '10px' }} src={questionImg} alt='' />
                    </span>
                </Typography>

                {/* Repeat Message */}
                {/* <Typography onClick={() => {
                    dispatch(sendMessage('Repeat!', messageInfo?.chat?._id, auth.user?.token))
                }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}>Repeat </span>
                    <span>
                        <img style={{ height: '20px', marginLeft: '10px' }} src={resendImg} alt='' />
                    </span>
                </Typography> */}

                {/* Don't Understand Message */}
                <Typography onClick={() => {
                    dispatch(sendMessage("Don't Understand!", messageInfo?.chat?._id, auth.user?.token))
                }} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}> Don't Understand
                    </span>
                    <span>
                        {/* <RiQuestionnaireFill style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} /> */}
                        <img style={{ height: '20px', marginLeft: '10px' }} src={confusedImg} alt='' />
                    </span>
                </Typography>

                {/* Text to speak */}
                <Typography onClick={handleSpeechToRead} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgb(234, 234, 234, 0.5)' }, py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14 }}> Read Message
                    </span>
                    <span>
                        {/* <RiQuestionnaireFill style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} /> */}
                        <img style={{ height: '20px', marginLeft: '10px' }} src={readTextImg} alt='' />
                    </span>
                </Typography>
            </Popover>
            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}
        </div>
    );
}