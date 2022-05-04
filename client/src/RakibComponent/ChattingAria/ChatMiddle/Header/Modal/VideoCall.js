import CloseIcon from '@mui/icons-material/Close';
import VideocamIcon from '@mui/icons-material/Videocam';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import chatImg from '../../../../../assets/images/avatar-8.jpg';
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
    outline: 'none',
    borderRadius: '10px',
    p: 4,
};

function VideoCall({ videoOpen, setVideoOpen }) {
    return (
         <Modal
                style={{ overflowY: 'scroll' }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={videoOpen}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={videoOpen}>
                <Box sx={style}>
                    <div className="modal-body voice_body">
                        <div className="call-box incoming-box">
                            <div className="call-wrapper">
                                <div className="call-inner">
                                    <div className="call-user">
                                        <img alt="User" src={chatImg} className="call-avatar" />
                                        <h4>Sumon Khan <span>Video calling</span>
                                        </h4>
                                    </div>
                                    <div className="call-items">
                                        <span onClick={() => setVideoOpen(false)}><CloseIcon /></span>
                                        <span className='green_btn'><VideocamIcon /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default VideoCall