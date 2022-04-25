import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getGroupChatData } from '../store/actions/groupActions';
import { getMessage } from '../store/actions/messageAction';
import { getSelectedChat } from '../store/actions/selectedChatAction';
import './Group/Group.css';
import './Group/__Groupcontainer.css';
import RecentChat from './RecentChat';
function ChatHome() {
    const dispatch = useDispatch();
    const { auth, groupData, groupMessage, selectedChat } = useSelector(state => state);
    useEffect(() => {
        dispatch(getGroupChatData(auth?.user?.token))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, groupMessage?.msg]);
    const handleSingleUser = (id) => {
        if (id) {
            dispatch(getSelectedChat(id, auth?.user?.token))
            dispatch(getMessage(id, auth?.user?.token))
        }
    }
    const [socketConnected, setSocketConnected] = useState(false);
    console.log(socketConnected)
    const socket = useRef();
    const ENDPOINT = "http://localhost:5000";
    useEffect(() => {
        socket.current = io(ENDPOINT);
        socket.current.emit("setup", auth?.user?.user)
        socket.current.emit("join chat",selectedChat?.chat)
        console.log(selectedChat)
        socket.current.on('connection', () => setSocketConnected(true))
        return () => { socket.current?.disconnect(); };
    }, [auth?.user?.user, selectedChat, selectedChat?.chat]);
    return (
        <div className="chat-box-container">
            {groupData?.data?.length && <RecentChat handleSingleUser={handleSingleUser} groupData={groupData?.data} groupMessage={groupMessage} />}
        </div>
    )
}

export default ChatHome