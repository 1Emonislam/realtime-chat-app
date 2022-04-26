import { Grid, ToggleButton, Tooltip } from '@mui/material';
import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdOutlineAttachFile, MdSend, MdSettingsVoice } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { editMessage, sendMessage } from '../store/actions/messageAction';
import { SUCCESS_MESSAGE_CLEAR, UPDATE_MESSAGE_FAILED, WRITE_MESSAGE_UPDATE } from '../store/type/messageTypes';
import './Editor.css';
function Editor({ handleTyping, messageEditHandle, editMsg, isTyping, size = 25 }) {

    const { groupMessage, theme, selectedChat, socketFunc, auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        dispatch({
            type: WRITE_MESSAGE_UPDATE,
            payload: {
                data: {
                    ...groupMessage?.messageInfoStore,
                    content: {
                        text: e.target.value,
                    }
                },
            },
        })
    }

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
            type: SUCCESS_MESSAGE_CLEAR,
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
                type: UPDATE_MESSAGE_FAILED,
                payload: {
                    error: '',
                }
            })
        })
    }
    const handleSendMessage = () => {
        if (selectedChat?.chat?._id) {
            socketFunc?.socket?.current?.emit('stop typing', selectedChat?.chat?._id);
            dispatch(sendMessage(groupMessage?.write, selectedChat?.chat?._id, auth?.user?.token, socketFunc))
        }
    }
    // console.log(isTyping)
    return (
        <div style={{
            marginTop: '30px',
            border: '1px solid rgb(133 127 127 / 15%)',
            boxhadow: "0px 0px 10px rgba(0,0,0,0.1)",
            padding: '14px 20px',
            borderRadius: '30px'
        }}>
            <Grid container spacing={0} alignItems="center" justifyContent={'space-between'} >
                <Grid item xs={0.6}>
                    <ToggleButton value="one" sx={{ marginBottom: '0px!important', border: 'none' }}>
                        <BsEmojiSmile size={size} />
                    </ToggleButton>
                </Grid>
                <Grid item xs={1}>
                    <ToggleButton value="two" sx={{ marginBottom: '0px!important', border: 'none' }}>
                        <MdOutlineAttachFile size={size} />
                    </ToggleButton>

                </Grid>
                {editMsg ? <Grid item xs={6}>
                    <textarea className='text-msg' sx={{
                        fontSize: {
                            lg: '18px',
                            md: '16px',
                            sm: '15px',
                            xs: '10px'
                        }
                    }} onChange={(e) => {
                        handleUpdate(e)
                    }} value={groupMessage?.messageInfoStore?.content?.text} placeholder='Enter text here...'>
                    </textarea>
                </Grid> : <Grid item xs={8}>
                    <textarea className='text-msg' sx={{
                        fontSize: {
                            lg: '18px',
                            md: '16px',
                            sm: '15px',
                            xs: '10px'
                        }
                    }} onChange={(e) => handleTyping(e)} value={groupMessage?.write} placeholder='Enter text here...'>
                    </textarea>
                </Grid>}
                <Grid item xs={0.7}>
                    <ToggleButton value="three" sx={{ marginBottom: '0px!important', border: 'none' }}>
                        <MdSettingsVoice size={size} />
                    </ToggleButton>
                </Grid>
                <>
                    {editMsg ? <Grid item xs={2}>
                        <ToggleButton className='send-btn' value="four" sx={{ marginBottom: '0px!important', border: 'none' }}>
                            {auth?.user?.token && selectedChat?.chat?._id ? <MdSend size={size} onClick={() => dispatch(editMessage(groupMessage?.messageInfoStore?.content?.text, groupMessage?.messageInfoStore?.chat?._id, groupMessage?.messageInfoStore?._id, auth?.user?.token, messageEditHandle))} /> : <Tooltip style={{cursor:"pointer"}} title="Permission Denied" arrow> <MdSend /></Tooltip>}
                        </ToggleButton>
                    </Grid> : <Grid item xs={1}>
                        <ToggleButton className='send-btn' value="four" sx={{ marginBottom: '0px!important', border: 'none' }}>
                            {auth?.user?.token && selectedChat?.chat?._id ? <MdSend size={size} onClick={handleSendMessage} /> : <Tooltip style={{cursor:"pointer"}} title="Permission Denied" arrow> <MdSend /></Tooltip>}
                        </ToggleButton>
                    </Grid>}
                </>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Grid>
        </div>
    )
}

export default Editor