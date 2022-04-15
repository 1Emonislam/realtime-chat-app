import React from 'react';
import { WriterEditor } from '../../../Editor/WriterEditor';
import ChatBody from './ChatBody/ChatBody';
import Header from './Header/Header';

const ChatMiddle = () => {
    return (
        <>
            <Header />
            <ChatBody />
            <WriterEditor />
        </>
    );
};

export default ChatMiddle;