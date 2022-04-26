import React from 'react';
import './Group/Group.css';
import './Group/__Groupcontainer.css';
import RecentChat from './RecentChat';
function ChatHome({ handleSingleUser,isTyping,handleTyping, groupData, groupMessage }) {
    return (
        <div className="chat-box-container">
            {groupData?.data?.length && <RecentChat  isTyping={isTyping} handleTyping={handleTyping} handleSingleUser={handleSingleUser} groupData={groupData?.data} groupMessage={groupMessage} />}
        </div>
    )
}

export default ChatHome