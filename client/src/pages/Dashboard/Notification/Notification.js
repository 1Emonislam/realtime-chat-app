import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Badge, Box, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';

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
        width: 350,
        height: 290,
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

const Notification = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        console.log(event);
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
            >
                <Badge sx={{
                    p: '5px 10px',
                    ml: 3,
                    color: '#dddede',
                    cursor: 'pointer',

                    '&:hover': {
                        bgcolor: '#dddede',
                        color: '#ffffff'
                    }
                }} badgeContent={4} color="primary">
                    <Typography sx={{ fontSize: '20px' }}><i class="fa-solid fa-bell"></i></Typography>
                </Badge>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px 15px', fontSize: '14px', cursor: 'pointer', background: '#fff', color: 'rgb(33 33 33)' }}>
                    <Typography variant='p'>Notification</Typography>
                    <Typography sx={{ color: 'red', textTransform: 'uppercase' }} variant='p'>Clear All</Typography>
                </Box>
                <MenuItem sx={{
                    display: 'flex', py: 1,
                    background: '#fff',
                    color: 'rgb(33 33 33)',
                    borderBottom: '1px solid #eef0f6',
                    '&:hover': {
                        background: '#fff',
                        color: 'rgb(33 33 33)',
                    }
                }}
                    onClick={handleClose}
                    disableRipple
                >
                    <Typography
                        sx={{ height: '41px', width: '41px', borderRadius: '30%', }}
                        component='img'
                        src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                    />
                    <Box sx={{ ml: '10px', }}>
                        <Typography sx={{ fontSize: '14px', display: 'block', width: '100px' }} variant='p'>Lorem ipsum, dolor sit amet</Typography>
                        <Typography sx={{ fontSize: '12px' }} variant='p'>4 Mins ago</Typography>
                    </Box>
                </MenuItem>
                <MenuItem sx={{
                    display: 'flex', py: 1,
                    background: '#fff',
                    color: 'rgb(33 33 33)',
                    borderBottom: '1px solid #eef0f6',
                    '&:hover': {
                        background: '#fff',
                        color: 'rgb(33 33 33)',
                    }
                }}
                    onClick={handleClose}
                    disableRipple
                >
                    <Typography
                        sx={{ height: '41px', width: '41px', borderRadius: '30%', }}
                        component='img'
                        src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                    />
                    <Box sx={{ ml: '10px', }}>
                        <Typography sx={{ fontSize: '14px', display: 'block', width: '100px' }} variant='p'>Lorem ipsum, dolor sit amet</Typography>
                        <Typography sx={{ fontSize: '12px' }} variant='p'>4 Mins ago</Typography>
                    </Box>
                </MenuItem>
                <MenuItem sx={{
                    display: 'flex', py: 1,
                    background: '#fff',
                    color: 'rgb(33 33 33)',
                    borderBottom: '1px solid #eef0f6',
                    '&:hover': {
                        background: '#fff',
                        color: 'rgb(33 33 33)',
                    }
                }}
                    onClick={handleClose}
                    disableRipple
                >
                    <Typography
                        sx={{ height: '41px', width: '41px', borderRadius: '30%', }}
                        component='img'
                        src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                    />
                    <Box sx={{ ml: '10px', }}>
                        <Typography sx={{ fontSize: '14px', display: 'block', width: '100px' }} variant='p'>Lorem ipsum, dolor sit amet</Typography>
                        <Typography sx={{ fontSize: '12px' }} variant='p'>4 Mins ago</Typography>
                    </Box>
                </MenuItem>
                <MenuItem sx={{
                    display: 'flex', py: 1,
                    background: '#fff',
                    color: 'rgb(33 33 33)',
                    borderBottom: '1px solid #eef0f6',
                    '&:hover': {
                        background: '#fff',
                        color: 'rgb(33 33 33)',
                    }
                }}
                    onClick={handleClose}
                    disableRipple
                >
                    <Typography
                        sx={{ height: '41px', width: '41px', borderRadius: '30%', }}
                        component='img'
                        src='https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg'
                    />
                    <Box sx={{ ml: '10px', }}>
                        <Typography sx={{ fontSize: '14px', display: 'block', width: '100px' }} variant='p'>Lorem ipsum, dolor sit amet</Typography>
                        <Typography sx={{ fontSize: '12px' }} variant='p'>4 Mins ago</Typography>
                    </Box>
                </MenuItem>
                <Box sx={{ py: 0 }}>
                    <Typography sx={{ fontSize: '14px', textAlign: 'center', background: '#fff', color: '#333333', py: 1, cursor: 'pointer' }} variant='h6'>View all notification</Typography>
                </Box>
            </StyledMenu>
        </Box>
    );
};

export default Notification;