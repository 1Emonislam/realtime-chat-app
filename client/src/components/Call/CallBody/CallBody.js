import { Box, Grid } from '@mui/material';
import React from 'react';
import CallerInfo from '../CallerInfo/CallerInfo';
import CallList from '../CallList/CallList';

const CallBody = () => {
    return (
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3.6}>
            <CallList />
          </Grid>
          <Grid item xs={12} md={8.4}>
            <CallerInfo />
          </Grid>
        </Grid>
      </Box>
    );
};

export default CallBody;