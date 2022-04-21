// import React, { useState } from 'react';
// import profileImg from '../../../../assets/images/avatar-8.jpg'
// import profileImg2 from '../../../../assets/images/avatar-12.jpg'
// import { Link } from 'react-router-dom';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import SaveIcon from '@mui/icons-material/Save';
// import RedoIcon from '@mui/icons-material/Redo';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import ScrollChat from './ScrollChat';
const ChatBody = () => {
    const { groupMessage, auth } = useSelector(state => state);
    return (
        <div className="chat-body">
                {groupMessage?.msg?.data?.length && <ScrollChat messages={groupMessage?.msg?.data} user={auth?.user?.user} />}
        </div>
    );
};

export default ChatBody;