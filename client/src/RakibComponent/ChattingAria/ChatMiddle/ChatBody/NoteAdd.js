import Modal from '@mui/material/Modal';
import * as React from 'react';
import { Box, IconButton, Paper, Typography } from "@mui/material";
import "./../../../../components/KeeperDashboard/Notes/Notes.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArchiveIcon from "@mui/icons-material/Archive";
import LabelIcon from "@mui/icons-material/Label";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useSelector } from 'react-redux'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '200px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    padding: '10px 30px'
};

export default function NoteAdd({ noteOpen, handleNoteOpen, msg, handleNoteClose }) {
    const mode = useSelector(state => state?.theme?.theme)
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
                 <p color={mode === 'dark' ? '#dcd1d1' : 'black'}>
                            {msg}
                        </p>
                    <div style={{ display: "flex" }}>
                      
                        <Typography
                            component='input'
                            color={mode === 'dark' ? '#dcd1d1' : 'black'}
                            type="text"
                            placeholder="Title"
                            className="input1" />
                        <IconButton sx={{ width: "30px", height: "30px" }}>
                            <PushPinIcon
                                sx={{ color: "#bebebe", fontSize: "19px", marginTop: "10px" }}
                            />
                        </IconButton>
                    </div>
                    <Typography
                        color={mode === 'dark' ? '#dcd1d1' : 'black'}
                        sx={{ background: 'none', resize: 'none' }}
                        component='textarea'
                        rows="auto"
                        type="text"
                        placeholder="Take a note..."
                        className=""
                    />

                    <Box className="notes-icon-container">
                        {/* -- Color box component -- */}
                        <IconButton>
                            <CheckBoxIcon className="notes-icons" />
                        </IconButton>
                        <IconButton>
                            <LabelIcon className="notes-icons" />
                        </IconButton>
                        <IconButton>
                            <ArchiveIcon className="notes-icons" />
                        </IconButton>
                        <IconButton onClick={handleNoteClose}>
                            <CancelIcon className="notes-icons"/>
                        </IconButton>
                        <IconButton>
                            <AddCircleIcon className="notes-icons" />
                        </IconButton>
                    </Box>
                </Paper>
            </Modal>
        </div>
    );
}