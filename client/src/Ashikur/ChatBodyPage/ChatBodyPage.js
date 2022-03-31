import { Box, Grid } from '@mui/material';
import React from 'react';
import ChatHome from '../../components/ChatHome';
import BodyChat from './BodyChat';
const ChatBodyPage = () => {
    return (
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={12}md={3.6}>
                    <ChatHome />
                </Grid>
                <Grid item xs={12}md={8.4}>
                    <BodyChat/>
                </Grid>
            </Grid> 
        </Box>
    );
};

export default ChatBodyPage;