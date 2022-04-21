import CloseIcon from '@mui/icons-material/Close';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import chatImg from '../../../../../../assets/images/avatar-8.jpg';
import './AllModal.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

const AllModal = (props) => {
    const handleClose = () => {
        props.setOpen(false)
        props.setVideo(false)
    }
    return (
        <div>
            {
                props.open === true ?
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={props.open || props.video}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.open || props.video}>
                            <Box sx={style}>
                                <div className="modal-body voice_body">
                                    <div className="call-box incoming-box">
                                        <div className="call-wrapper">
                                            <div className="call-inner">
                                                <div className="call-user">
                                                    <img alt="User" src={chatImg} className="call-avatar" />
                                                    <h4>Brietta Blogg <span>voice calling</span>
                                                    </h4>
                                                </div>
                                                <div className="call-items">
                                                    <span><CloseIcon /></span>
                                                    <span className='green_btn'><SettingsVoiceIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal> : null
            }
            {
                props.video === true ?
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={props.open || props.video}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.open || props.video}>
                            <Box sx={style}>
                                <div className="modal-body voice_body">
                                    <div className="call-box incoming-box">
                                        <div className="call-wrapper">
                                            <div className="call-inner">
                                                <div className="call-user">
                                                    <img alt="User" src={chatImg} className="call-avatar" />
                                                    <h4>Brietta Blogg <span>Video calling</span>
                                                    </h4>
                                                </div>
                                                <div className="call-items">
                                                    <span><CloseIcon /></span>
                                                    <span className='green_btn'><VideocamIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal> : null
            }

        </div>
    );
};

export default AllModal;