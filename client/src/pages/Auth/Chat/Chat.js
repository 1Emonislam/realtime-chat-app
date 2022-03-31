import { Box, Grid } from '@mui/material';
import React from 'react'
import ChatBodyPage from '../../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../../Ashikur/Nav/Nav';
import styles from './Chat.module.scss';

function Chat({ children }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}className={styles.mainDiv}>
        <Grid container spacing={2}>
            <Grid item xs={12}md={1}>
            <Box className={styles.chatMenus}>
                <Nav>{children}</Nav>
              </Box>
            </Grid>
            <Grid item xs={12}md={11}>
            <Box className={styles.chatBody}>
                <ChatBodyPage></ChatBodyPage>
              </Box>
            </Grid>
        </Grid>
        </Box>
    </>
  )
}

export default Chat