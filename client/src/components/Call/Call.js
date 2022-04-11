import { Grid } from '@mui/material';
import React from 'react';
import Nav from '../../Ashikur/Nav/Nav';
import CallBody from './CallBody/CallBody';

const Call = ({children}) => {
    return (
      <>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={0.8}>
            <Nav>{children}</Nav>
          </Grid>
          <Grid item xs={12} md={11.2}>
            <CallBody />
          </Grid>
        </Grid>
      </>
    );
};

export default Call;