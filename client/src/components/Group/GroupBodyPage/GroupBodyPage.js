import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import GroupChat from '../GroupChat/GroupChat';
import GroupHome from '../GroupHome/GroupHome';

const GroupBodyPage = () => {
    return (
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3.6}>
                    <GroupHome />
                </Grid>
                <Grid item xs={12} md={8.4}>
                    <GroupChat />
                </Grid>
            </Grid>
        </Box>
    );
};

export default GroupBodyPage;