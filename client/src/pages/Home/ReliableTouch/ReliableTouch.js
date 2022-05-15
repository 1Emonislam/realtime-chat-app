import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import relibleBg from '../../../assets/images/relibleBg.svg';

const ReliableTouch = () => {

    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <Box sx={{ background: '#f6f6f6', textAlign: 'center', py: 12 }}>
            <Container>
                <Box sx={{ maxWidth: '980px', margin: '0 auto' }}>
                    <Typography sx={{ fontSize: { lg: '48px', md: '40px', sm: '36px', xs: '28px' }, fontWeight: 800, mb: 4 }} variant="h2">Personalize your thinking  </Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 300, lineHeight: 1.7 }} variant="p">provide a more personalized experience for students with any type of disability.</Typography>
                </Box>
                <Box sx={{ pt: 6 }}>
                    {/* <Typography sx={{ width: '100%', height: '500px', p: 1.5, borderRadius: '20px' }} component='img' src='https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18146.jpg' /> */}
                    <Typography sx={{ width: '100%', height: { lg: '550px', md: '500px', sm: '450px', xs: '400px' }, p: 1.5, borderRadius: '20px' }} component='img' src='https://img.freepik.com/free-vector/illustration-social-media-concept_53876-17828.jpg' />
                </Box>
                <Box>
                    <Typography sx={{ width: '60%', mt: 3 }} component='img' src={relibleBg} />
                    <Typography sx={{ mt: '-48px', fontWeight: 800, fontSize: { md: '26px', sm: '24px', xs: '20px' } }} variant='h5'>Create an account and invite your peers</Typography>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Button
                        onClick={handleRegister}
                        sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            background: '#5865f2',
                            textTransform: 'capitalize',
                            color: 'white',
                            borderRadius: '40px',
                            padding: '16px 32px !important',
                            mr: 2,

                            '&:hover': {
                                background: '#7c86f7',
                                boxShadow: '1px 1px 1px #7c86f7'
                            }

                        }}
                    >Register</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ReliableTouch;