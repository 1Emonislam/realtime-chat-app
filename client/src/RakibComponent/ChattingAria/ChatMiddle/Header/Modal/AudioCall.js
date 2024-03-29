import * as React from 'react';
import './AllModal.css';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
// import chatImg from '../../../../../assets/images/avatar-8.jpg';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import CloseIcon from '@mui/icons-material/Close';
// import { useSelector } from 'react-redux';
import { Tooltip, Avatar } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    outline: 'none',
    borderRadius: '10px',
    p: 4,
};

const AudioCall = ({ setAudioOpen, audioOpen, chat }) => {
    // console.log(chat)
    return (
        <div>
            <Modal
                style={{ overflowY: 'scroll' }}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={audioOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={audioOpen}>
                    <Box sx={style}>
                        <div className="modal-body voice_body">
                            <div className="call-box incoming-box">
                                <div className="call-wrapper">
                                    <div className="call-inner">
                                        <div className="call-user">
                                            <Avatar alt="User" style={{ display: 'block', margin: 'auto' }} src={chat?.img} className="call-avatar" />
                                            <Tooltip title={chat?.chatName} arrow placement='top'>
                                                <h4>{chat?.chatName?.slice(0, 20)} <span> voice calling</span>
                                                </h4>
                                            </Tooltip>
                                        </div>
                                        <div className="call-items">
                                            <span onClick={() => setAudioOpen(false)}><CloseIcon /></span>
                                            <span className='green_btn'><SettingsVoiceIcon /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default AudioCall;