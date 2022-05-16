import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import footer_logo from '../../../assets/logo/footer-logo.png';

const Footer = () => {
    return (
        <Box sx={{ pt: 12, pb: 5, background: '#23272a' }}>
            <Container>
                {/* <Grid container spacing={3} sx={{ borderBottom: '1px solid #5865f2', pb: 5 }}>
                    <Grid item xs={8} md={4}>
                        <Box>
                            <Typography sx={{ fontSize: '32px', color: '#5865f2', fontWeight: 800 }} variant="h4">Collaborate</Typography>
                            <Box sx={{ color: 'white', display: 'flex', pt: 4 }}>
                                <Typography sx={{ mr: 2, fontSize: '24px', cursor: 'pointer' }}><i className="fa-brands fa-twitter"></i></Typography>
                                <Typography sx={{ mr: 2, fontSize: '24px', cursor: 'pointer' }}><i className="fa-brands fa-linkedin-in"></i></Typography>
                                <Typography sx={{ mr: 2, fontSize: '24px', cursor: 'pointer' }}><i className="fa-brands fa-instagram"></i></Typography>
                                <Typography sx={{ mr: 2, fontSize: '24px', cursor: 'pointer' }}><i className="fa-brands fa-facebook"></i></Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Box >
                            <Typography sx={{ fontSize: '16px', color: '#5865f2', pt: 1 }} variant='h6'>Product</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Download</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Nitro</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Status</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Box >
                            <Typography sx={{ fontSize: '16px', color: '#5865f2', pt: 1 }} variant='h6'>Company</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>About</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Jobs</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Branding</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Newsroom</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Box >
                            <Typography sx={{ fontSize: '16px', color: '#5865f2', pt: 1 }} variant='h6'>Resources</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>College</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Support</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Blog</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Feedback</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Developers</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <Box >
                            <Typography sx={{ fontSize: '16px', color: '#5865f2', pt: 1 }} variant='h6'>Policies</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Terms</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Policy</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Cookies Settings</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Guideline</Typography>
                            <Typography sx={{
                                fontSize: '16px',
                                color: 'white',
                                pt: 1,

                                '&:hover': {
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }
                            }} variant='h6'>Moderators</Typography>
                        </Box>
                    </Grid>
                </Grid> */}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                    <Box>
                        <Typography sx={{ height: '30px' }} component='img' src={footer_logo} />
                        <Box sx={{ color: 'white', display: 'flex', pt: 2, pl: 4 }}>
                            <Typography sx={{ mr: 2, fontSize: '20px', cursor: 'pointer' }}><i className="fa-brands fa-twitter"></i></Typography>
                            <Typography sx={{ mr: 2, fontSize: '20px', cursor: 'pointer' }}><i className="fa-brands fa-linkedin-in"></i></Typography>
                            <Typography sx={{ mr: 2, fontSize: '20px', cursor: 'pointer' }}><i className="fa-brands fa-instagram"></i></Typography>
                            <Typography sx={{ mr: 2, fontSize: '20px', cursor: 'pointer' }}><i className="fa-brands fa-facebook"></i></Typography>
                        </Box>
                    </Box>
                    <NavLink to="/register" variant="inherit">
                        <Button variant="inherit" sx={{
                            fontSize: '14px',
                            background: '#5865f2',
                            textTransform: 'capitalize',
                            color: 'white',
                            borderRadius: '40px',
                            padding: '7px 16px !important',

                            '&:hover': {
                                background: '#7c86f7',
                                boxShadow: '1px 1px 1px #7c86f7'
                            }

                        }}>Register</Button></NavLink>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography sx={{ textAlign: 'center', color: '#fff' }}>Copyright 2022 All Right Reserved</Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;