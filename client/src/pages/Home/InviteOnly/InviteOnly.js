import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const InviteOnly = () => {
    return (
        <Box sx={{ py: 12, background: 'white' }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box >
                            <Typography sx={{ width: '100%', borderRadius: '10px' }} component='img' src='https://img.freepik.com/free-vector/business-work-dayline-illustration_599842-23.jpg' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: { md: '48px', xs: '27px' }, fontWeight: 'bold', pb: 4 }}>Create groups and share ideas</Typography>
                            <Typography sx={{ fontSize: { md: '20px', xs: '18px' }, fontWeight: 300 }} variant='p'>Discuss your topics using custom features that will help understanding concepts.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default InviteOnly;