import { Box } from '@mui/material';
import React from 'react'
import ChatBodyPage from '../../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../../Ashikur/Nav/Nav';
import styles from './Chat.module.scss';

function Chat() {
  return (
    <>
      <Box className={styles.mainDiv}>
        <Box className={styles.chatMenus}>
          <Nav></Nav>
        </Box>
        <Box className={styles.chatBody}>
          <ChatBodyPage></ChatBodyPage>
        </Box>
      </Box>
    </>
  )
}

export default Chat