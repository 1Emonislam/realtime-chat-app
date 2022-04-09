import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import ChatMiddle from './ChatMiddle/ChatMiddle';
const ChatMaincontener = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={4}md={3}>
                <Box>
                    <Typography>Chatting Group</Typography>
                </Box>
            </Grid>
            <Grid item xs={4}md={6}>
                <ChatMiddle/>
            </Grid>
            <Grid item xs={4}md={3}>
                <Box>
                    <Typography>Chatting profile</Typography>
                </Box>
            </Grid>
        </Grid>
        </Box>
    );
};

export default ChatMaincontener;