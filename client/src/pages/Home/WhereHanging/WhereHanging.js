import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import justChillin from '../../../assets/images/justChillin.svg';

const WhereHanging = () => {
    return (
        <Box sx={{ py: 12, background: '#f6f6f6' }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: '48px', fontWeight: 'bold', pb: 4 }}>Where hanging out is easy</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 300 }} variant='p'>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box >
                            <Typography sx={{ width: '100%' }} component='img' src={justChillin} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WhereHanging;