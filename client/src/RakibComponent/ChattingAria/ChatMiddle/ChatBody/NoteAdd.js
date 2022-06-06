import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import LabelIcon from "@mui/icons-material/Label";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ERROR_NOTE, POST_NOTES } from '../../../../store/reducers/notesReducer';
import "./../../../../components/KeeperDashboard/Notes/Notes.css";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '150px',
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    padding: '20px 30px'
};

export default function NoteAdd({ noteOpen, handleNoteOpen, msg, handleNoteClose }) {
    const { theme, auth, } = useSelector(state => state);
    const mode = theme?.theme;
    const [title, setTitle] = useState('')
    // const [details, setDetails] = useState('')
    const dispatch = useDispatch()
    const handleNoteCreate = (messageId, chatId, title, token, handleNoteClose) => {
        if (auth?.user?.token && messageId && chatId) {
            fetch(`https://chalechat.herokuapp.com/api/note/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    messageId, chatId, title
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.data) {
                        handleNoteClose()
                        toast.success(data.message, {
                            position: "top-right",
                            theme: theme?.theme,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // console.log(data)
                        dispatch({
                            type: POST_NOTES,
                            payload: {
                                message: data?.message,
                                data: data.data,
                            }
                        })
                    }
                    if (data.error) {
                        dispatch({
                            type: ERROR_NOTE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                })
        } else {
            toast.error('Fill up all fields!', {
                position: "top-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div>
            <Modal
                open={noteOpen}
                onClose={handleNoteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper
                    style={style}
                    elevation={4}
                    className="notes-container"
                    sx={{ height: "100%", borderRadius: 2 }}
                >
                    <div style={{ display: "flex" }}>
                        <Typography
                            component='input'
                            color={mode === 'dark' ? 'gray' : 'black'}
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="input1" />
                        <IconButton sx={{ width: "30px", height: "30px" }}>
                            <PushPinIcon
                                sx={{ color: "#bebebe", fontSize: "19px", marginTop: "10px" }}
                            />
                        </IconButton>
                    </div>
                    {/* <Typography
                        color={mode === 'dark' ? 'gray' : 'black'}
                        sx={{ background: 'none', resize: 'none' }}
                        component='textarea'
                        onChange={(e) => setTitle(e.target.value)}
                        rows="auto"
                        type="text"
                        placeholder="Take a note..."
                        className=""
                    /> */}

                    <Box className="notes-icon-container">
                        {/* -- Color box component -- */}
                        {/* <IconButton>
                            <CheckBoxIcon className="notes-icons" />
                        </IconButton>
                        <IconButton>
                            <LabelIcon className="notes-icons" />
                        </IconButton>
                        <IconButton>
                            <ArchiveIcon className="notes-icons" />
                        </IconButton> */}
                        <IconButton onClick={handleNoteClose}>
                            <CancelIcon className="notes-icons" />
                        </IconButton>
                        <IconButton onClick={() => handleNoteCreate(msg?._id, msg?.chat?._id, title, auth?.user?.token, handleNoteClose)}>
                            <AddCircleIcon className="notes-icons" />
                        </IconButton>

                    </Box>
                    <p color={mode === 'dark' ? 'gray' : 'black'}>
                        {msg?.content?.text}
                    </p>
                </Paper>
            </Modal>
        </div>
    );
}