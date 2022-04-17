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
    // const [menuOpen, setMenuOpen] = useState(false)
    // const [dotsOpen, setdotsOpen] = useState(false)
    // const moreActionLef = () => {
    //     menuOpen === true ? setMenuOpen(false) : setMenuOpen(true)
    // }
    // const moreActionRight = () => {
    //     dotsOpen === true ? setdotsOpen(false) : setdotsOpen(true)
    // }
    return (
        <div className="chat-body">
            {/* <div className="messages"> */}
                {groupMessage?.msg?.data?.length && <ScrollChat messages={groupMessage?.msg?.data} user={auth?.user?.user} />}
                {/* <div className="chats">
                    <div className="chat-avatar">
                        <img src={profileImg} className="dreams_chat" alt="profile" />
                    </div>
                    <div className="chat-content">
                        <div className="message-content">
                            Hi James! What’s Up?
                            <div className="chat-time">
                                <div>
                                    <div className="time"><AccessTimeFilledIcon /> <span> 10:00</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-profile-name">
                            <h6>Doris Brown</h6>
                        </div>
                    </div>
                    <div className="chat-action-btns">
                        <div className="chat-action-col">
                            <Link to='/'>
                                <MoreVertIcon onClick={moreActionLef} />
                            </Link>
                            <ul className={menuOpen ? 'dropdown-menu displayBlock' : 'dropdown-menu'}>
                                <li><span>Copy</span><FileCopyIcon /></li>
                                <li><span>Save</span><SaveIcon /></li>
                                <li><span>Forward </span><RedoIcon /></li>
                                <li><span>Delete </span><DeleteIcon /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="chats chats-right">
                    <div className="chat-action-btns">
                        <div className="chat-action-col">
                            <Link to='/'>
                                <MoreVertIcon onClick={moreActionRight} />
                            </Link>
                            <div className={dotsOpen ? 'dropdown-menu displeyBlock' : 'dropdown-menu'}>
                                <li><span>Copy</span><FileCopyIcon /></li>
                                <li><span>Save</span><SaveIcon /></li>
                                <li><span>Forward </span><RedoIcon /></li>
                                <li><span>Delete </span><DeleteIcon /></li>
                            </div>
                        </div>
                        <div className="chat-read-col">
                            <span className="material-icons"><DoneAllIcon /></span>
                        </div>
                    </div>
                    <div className="chat-content">
                        <div className="message-content">
                            Good morning, How are you? What about our next meeting?
                            <div className="chat-time">
                                <div>
                                    <div className="time"><AccessTimeFilledIcon /> <span>10:00</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-profile-name">
                            <h6>Alexandr</h6>
                        </div>
                    </div>
                    <div className="chat-avatar">
                        <img src={profileImg2} className="dreams_chat" alt="" />
                    </div>
                </div>*/}
            {/* </div> */}
        </div>
    );
};

export default ChatBody;