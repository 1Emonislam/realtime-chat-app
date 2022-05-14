import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import white_large from '../../../assets/logo/white_large.png';

const Header = () => {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                <Typography sx={{ height: { lg: '28px', sm: '25px', xs: '20px' } }} component='img' src={white_large} />
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ height: '30px' }} component='img' src={logo_white} />
                    <Typography sx={{
                        fontSize: {
                            lg: '28px',
                            md: '28px',
                            sm: '28px',
                            xs: "28px"
                        }, color: '#fff', fontFamily: 'Comfortaa', fontWeight: 'bold', letterSpacing: 1.6, ml: 1
                    }}>chale</Typography>
                </Box> */}
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