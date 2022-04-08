import { Box, Grid } from '@mui/material';
import React from 'react';
import AllStatus from '../AllStatus/AllStatus';
import ExpandStatus from '../ExpandStatus/ExpandStatus';

const StatusBody = () => {
    return (
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3.6}>
            <AllStatus />
          </Grid>
          <Grid item xs={12} md={8.4}>
            <ExpandStatus />
          </Grid>
        </Grid>
      </Box>
    );
};

export default StatusBody;