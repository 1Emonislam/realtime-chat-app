import React from 'react';
import './Group/Group.css';
import './Group/__Groupcontainer.css';
import RecentChat from './RecentChat';
function ChatHome({ chatActive, handleSingleChat, isTyping, handleTyping, groupData, groupMessage }) {
    return (
        <div className="chat-box-container">
            {<RecentChat chatActive={chatActive} isTyping={isTyping} handleTyping={handleTyping} handleSingleChat={handleSingleChat} groupData={groupData} groupMessage={groupMessage} />}
        </div>
    )
}

export default ChatHome