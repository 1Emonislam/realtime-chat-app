import { Grid } from '@mui/material'
import React from 'react'
import ChatMiddle from '../../RakibComponent/ChattingAria/ChatMiddle/ChatMiddle'
import OnlineOfline from '../AboutPage/OnlineOfline'
import './../../components/__Container.css'
function BodyChat({ handleTyping, isTyping }) {
  return (
    <div style={{ paddingTop: '20px', paddingLeft: '10px' }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={9} className="current-chat-box-container">
          <ChatMiddle isTyping={isTyping} handleTyping={handleTyping} />
        </Grid>
        <Grid item xs={12} md={3}>
          <OnlineOfline />
        </Grid>
      </Grid>
    </div>
  )
}

export default BodyChat