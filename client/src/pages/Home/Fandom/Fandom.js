import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Fandom = () => {
    return (
        <Box sx={{ py: 12, background: 'white' }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ textAlign: 'center' }} >
                            <Typography sx={{ width: '80%', height: '450px', borderRadius: '10px' }} component='img' src='https://img.freepik.com/free-vector/computer-social-media-icons_24877-74707.jpg' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: { md: '48px', xs: '27px' }, fontWeight: 'bold', pb: 4 }}>Modern chat support system</Typography>
                            <Typography sx={{ fontSize: { md: '20px', xs: '18px' }, fontWeight: 300 }} variant='p'>The modern chat support system is a system that can provide students with learning disabilities with the help they need in order to succeed in their courses</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Fandom;