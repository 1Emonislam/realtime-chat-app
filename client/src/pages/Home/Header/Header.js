import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                <div>
                    <Typography sx={{
                        fontSize: {
                            lg: '24px',
                            md: '20px',
                            sm: '18px',
                            xs: "16px"
                        }, color: '#fff', fontWeight: 'bold', letterSpacing: 1.6
                    }}>CollabAll</Typography>
                </div>
                <div>
                    <NavLink to="/login">
                        <Button sx={{
                            marginRight: {
                                lg: '15px',
                                md: '10px',
                                sm: '3px',
                                xs: "2px"
                            },
                            fontSize: {
                                lg: '14px',
                                md: '14px',
                                sm: '14px',
                                xs: "12px"
                            },
                            background: 'transparent',
                            textTransform: 'capitalize',
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '40px',
                            padding: '6px 16px !important',

                            '&:hover': {
                                color: 'blue',
                                background: '#fff',
                                boxShadow: '1px 1px 1px #fff'
                            }

                        }}>Login</Button>
                    </NavLink>
                    <NavLink to="/register">
                        <Button sx={{
                            marginRight: {
                                lg: '15px',
                                md: '10px',
                                sm: '3px',
                                xs: "2px"
                            },
                            fontSize: {
                                lg: '14px',
                                md: '14px',
                                sm: '14px',
                                xs: "12px"
                            },
                            background: 'transparent',
                            textTransform: 'capitalize',
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '40px',
                            padding: '6px 16px !important',

                            '&:hover': {
                                color: 'blue',
                                background: '#fff',
                                boxShadow: '1px 1px 1px #fff'
                            }

                        }}>Register</Button>
                    </NavLink>
                </div>

            </Box>
        </Container >
    );
};

export default Header;