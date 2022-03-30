import { Grid } from '@mui/material';
import React from 'react';
import ChatBodyPage from '../../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../../Ashikur/Nav/Nav';

function Chat({ isDark, children }) {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}sm={1}>
          <Nav>{children}</Nav>
        </Grid>
        <Grid item xs={11}>
          <ChatBodyPage isDark={isDark}></ChatBodyPage>
        </Grid>
      </Grid>
    </>
  )
}

export default Chat