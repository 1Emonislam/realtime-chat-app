
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { Typography, Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';

const MenuBar = ({ selected, mouseOver }) => {

    const [showUser, setShowUser] = useState(false);
    const [settings, setSettings] = useState(false);
    const [active, setActive] = useState('dashboard');

    return (
        <Box sx={{ py: '15px', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box
                    onClick={() => setActive('dashboard')}
                    sx={
                        active !== 'dashboard' ?
                            {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '15px',
                                p: '12px 15px',

                                '&:hover': {
                                    background: '#f1f4f5'
                                }
                            } :
                            {
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '15px',
                                p: '12px 15px',
                                background: '#7c2296',
                                color: '#fff'
                            }
                    }
                    component={Link} to="/admin-dashboard"
                >
                    <HomeIcon sx={{ width: '20px' }} />
                    {
                        (selected || mouseOver) && <Typography sx={{ fontSize: '15px', ml: 1, fontFamily: 'Poppines', fontWeight: 600 }}> Dashboard </Typography>
                    }
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 1,

                    '&:hover': {
                        background: '#f1f4f5'
                    }
                }}>
                    <Box
                        onClick={() => setShowUser(!showUser)}

                        sx={
                            active !== 'user' ?
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    p: '12px 15px',

                                    '&:hover': {
                                        background: '#f1f4f5'
                                    }
                                } :
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    p: '12px 15px',
                                    background: '#7c2296',
                                    color: '#fff'
                                }
                        }
                    >
                        <GroupIcon sx={{ width: '20px' }} />
                        {
                            (selected || mouseOver) && <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography component='p' sx={{ fontSize: '15px', ml: 1, fontFamily: 'Poppines', fontWeight: 600, width: '150px' }} >User</Typography>

                                {showUser ?
                                    <KeyboardArrowDownIcon sx={{ width: '20px' }} /> :
                                    <ArrowForwardIosIcon sx={{ width: '12px' }} />}
                            </Box>
                        }
                    </Box>
                    {
                        showUser && <Box sx={{ pl: 4 }}>
                            <Typography
                                onClick={() => setActive('user')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >Users</Typography>
                            <Typography
                                onClick={() => setActive('user')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >Blocked Users</Typography>
                            <Typography
                                onClick={() => setActive('user')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >Report Users</Typography>
                        </Box>
                    }

                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 1,

                    '&:hover': {
                        background: '#f1f4f5'
                    }
                }}>
                    <Box
                        onClick={() => setSettings(!settings)}

                        sx={
                            active !== 'settings' ?
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    p: '12px 15px',

                                    '&:hover': {
                                        background: '#f1f4f5'
                                    }
                                } :
                                {
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '15px',
                                    p: '12px 15px',
                                    background: '#7c2296',
                                    color: '#fff'
                                }
                        }
                    >
                        <SettingsIcon sx={{ width: '20px' }} />
                        {
                            (selected || mouseOver) && <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography component='p' sx={{ fontSize: '15px', ml: 1, fontFamily: 'Poppines', fontWeight: 600, width: '150px' }} >Settings</Typography>

                                {settings ?
                                    <KeyboardArrowDownIcon sx={{ width: '20px' }} /> :
                                    <ArrowForwardIosIcon sx={{ width: '12px' }} />}
                            </Box>
                        }
                    </Box>
                    {
                        settings && <Box sx={{ pl: 4 }}>
                            <Typography
                                onClick={() => setActive('settings')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >General</Typography>
                            <Typography
                                onClick={() => setActive('settings')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >Admob</Typography>
                            <Typography
                                onClick={() => setActive('settings')}
                                sx={{ fontSize: '15px', fontFamily: 'Poppines', fontWeight: 600, display: 'block', pb: 1 }}
                                component={Link} to=""
                            >Sinch Settings</Typography>
                        </Box>
                    }

                </Box>
            </Box>
        </Box>
    );
};

export default MenuBar;