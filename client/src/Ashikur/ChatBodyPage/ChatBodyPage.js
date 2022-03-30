import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AboutPage from '../AboutPage/AboutPage';

const ChatBodyPage = ({isDark}) => {
    return (
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}>
                    <Typography variant='h4'>
                        chat persons
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h4'>
                        chat
                    </Typography>

                </Grid>
                <Grid item xs={12} md={3}>
                        <AboutPage isDark={isDark}></AboutPage>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatBodyPage;