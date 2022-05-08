import { Box, Grid } from '@mui/material';
import React from 'react';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import OtherSettings from '../OtherSettings/OtherSettings';

const SettingsBody = ({ mode }) => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} md={3.6}>
          <ProfileSettings mode={mode} />
        </Grid>
        <Grid item xs={12} md={8.4}>
          <OtherSettings mode={mode} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsBody;