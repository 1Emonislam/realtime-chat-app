import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography, Box } from '@mui/material';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '0px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        // console.log(event);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Box
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                    p: '5px 10px',
                    ml: 3,
                    cursor: 'pointer',

                    '&:hover': {
                        bgcolor: '#dddede',
                    }
                }}>
                <Typography
                    sx={{ height: '31px', width: '31px', borderRadius: '30%', }}
                    component='img'
                    src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                />
            </Box>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', p: '10px 15px', background: '#eef0f6', }}>
                    <Typography
                        sx={{ height: '41px', width: '41px', borderRadius: '30%', }}
                        component='img'
                        src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                    />
                    <Box sx={{ ml: '10px', }}>
                        <Typography sx={{ fontSize: '16px' }} variant='h6'>Seema Sisty </Typography>
                        <Typography sx={{ fontSize: '14px' }} variant='p'>Administrators</Typography>
                    </Box>
                </Box>
                <MenuItem sx={{ py: 1, borderBottom: '1px solid #eef0f6' }} onClick={handleClose} disableRipple>
                    My Profile
                </MenuItem>
                <MenuItem sx={{ py: 1, borderBottom: '1px solid #eef0f6' }} onClick={handleClose} disableRipple>
                    Settings
                </MenuItem>
                <MenuItem sx={{ py: 1, borderBottom: '1px solid #eef0f6' }} onClick={handleClose} disableRipple>
                    Logout
                </MenuItem>
            </StyledMenu>
        </Box>
    );
};

export default Profile;