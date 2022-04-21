import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatBodyPage from '../../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../../Ashikur/Nav/Nav';
function Chat({ children }) {
  const { auth } = useSelector(state => state)
  useEffect(() => {
    if (!auth?.user?.token) {
      window.location.replace('/login')
    }
  }, [auth?.user?.token])
  return (
    <>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={0.8}>
          <Nav>{children}</Nav>
        </Grid>
        <Grid item xs={12} md={11.2}>
          <ChatBodyPage></ChatBodyPage>
        </Grid>
      </Grid>
    </>
  )
}

export default Chat