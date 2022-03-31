import { Grid } from '@mui/material'
import React from 'react'
import ChatMiddle from '../../RakibComponent/ChattingAria/ChatMiddle/ChatMiddle'
import AboutPage from '../AboutPage/AboutPage'
import './../../components/__Container.css'
function BodyChat() {
    return (
        <div style={{paddingTop:'20px',paddingLeft:'10px'}}>
            <Grid container spacing={0}>
                <Grid item xs={12}md={8}className="current-chat-box-container">
                  <ChatMiddle/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <AboutPage></AboutPage>
                </Grid>
            </Grid>
        </div>
    )
}

export default BodyChat