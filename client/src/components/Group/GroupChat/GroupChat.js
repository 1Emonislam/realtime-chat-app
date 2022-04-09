import { Grid } from '@mui/material';
import React from 'react';
import AboutPage from '../../../Ashikur/AboutPage/AboutPage';
import GroupChatMiddle from '../GroupChattingAria/GroupChatMiddle/GroupChatMiddle';
// import ChatMiddle from '../../../RakibComponent/ChattingAria/ChatMiddle/ChatMiddle';

const GroupChat = () => {
    return (
        <div style={{ paddingTop: '20px', paddingLeft: '10px' }}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={8} className="current-chat-box-container">
                    <GroupChatMiddle />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AboutPage></AboutPage>
                </Grid>
            </Grid>
        </div>
    );
};

export default GroupChat;