import { Box, Typography } from '@mui/material';
import React from 'react';
import ChatBody from './ChatBody/ChatBody';
import './ChatMiddle.css'
import Footer from './Footer/Footer';
import Header from './Header/Header';

const ChatMiddle = () => {
    return (
        <>
        <Header/>
        <ChatBody/>
        <Footer/>
        </>
    );
};

export default ChatMiddle;