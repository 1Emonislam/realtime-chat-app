import React from 'react';
import ChatBody from './ChatBody/ChatBody';
const ChatMiddle = ({handleTyping,isTyping}) => {
    return (
        <>
            <ChatBody isTyping={isTyping}handleTyping={handleTyping}/>
        </>
    );
};

export default ChatMiddle;