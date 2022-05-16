import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import GeneralSettings from '../GeneralSettings/GeneralSettings';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    bgcolor: 'background.paper',
    
    boxShadow: 24,
    p: 4,
};

const EditProfile = ({ mode }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box>
            <Box onClick={handleOpen} sx={{ cursor:'pointer', display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                <Typography sx={{ fontFamily: 'Poppins' }}>Edit Profile</Typography>
                <FiEdit sx={{ fontSize: '20px' }} />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <GeneralSettings mode={mode} />
                </Box>
            </Modal>
        </Box>
    );
};

export default EditProfile;