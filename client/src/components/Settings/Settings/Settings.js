import { Grid } from '@mui/material';
import React from 'react';
import Nav from "../../../Ashikur/Nav/Nav";
import SettingsBody from '../SettingsBody/SettingsBody';

const Settings = ({ children, mode }) => {
  return (
    <>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={0.8}>
          <Nav>{children}</Nav>
        </Grid>
        <Grid item xs={12} md={11.2}>
          <SettingsBody mode={mode} />
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;