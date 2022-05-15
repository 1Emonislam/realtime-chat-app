import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import ProfileSetting from "../ProfileSetting/ProfileSetting";

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Profile = ({ mode }) => {
    const [open, setOpen] = React.useState(false);
    const { auth } = useSelector(state => state)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Box>
            <Box onClick={handleOpen} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                <Typography sx={{ fontFamily: 'Poppins' }}>Profile</Typography>
                <FiUser sx={{ fontSize: '20px' }} />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProfileSetting profileInfo={auth?.user?.user} mode={mode} />
                </Box>
            </Modal>
        </Box>
    );
};

export default Profile;