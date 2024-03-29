import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleProfileInfo from '../ProfileSetting/SingleProfileInfo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        lg: '600px',
        md: '500px',
        xs: 'auto'
    },
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const SingleProfile = ({ mode, handleClose, caneclBtn, handleOpen, open }) => {
    const { profile } = useSelector(state => state)
    // console.log(profile?.singleProfile?.data)
    return (
        <Box>
            <Modal
                style={{ overflowY: 'scroll' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SingleProfileInfo caneclBtn="caneclBtn" handleClose={handleClose} profileInfo={profile?.singleProfile?.data} mode={mode} />
                </Box>
            </Modal>
        </Box>
    );
};

export default SingleProfile;