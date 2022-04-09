import { Box, Grid } from '@mui/material';
import React from 'react';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import OtherSettings from '../OtherSettings/OtherSettings';

const SettingsBody = () => {
    return (
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3.6}>
            <ProfileSettings />
          </Grid>
          <Grid item xs={12} md={8.4}>
            <OtherSettings />
          </Grid>
        </Grid>
      </Box>
    );
};

export default SettingsBody;