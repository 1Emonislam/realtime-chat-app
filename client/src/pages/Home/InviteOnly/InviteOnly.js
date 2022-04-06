import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import studyGroup from '../../../assets/images/studyGroup.svg';

const InviteOnly = () => {
    return (
        <Box sx={{ py: 12 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box >
                            <Typography sx={{ width: '100%' }} component='img' src={studyGroup} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: '48px', fontWeight: 'bold', pb: 4 }}>Create an invite-only place where you belong</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 300 }} variant='p'>Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default InviteOnly;