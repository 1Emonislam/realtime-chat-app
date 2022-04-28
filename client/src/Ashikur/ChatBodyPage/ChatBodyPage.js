import { Box, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import ChatHome from '../../components/ChatHome';
import { getGroupChatData } from '../../store/actions/groupActions';
import { getNotification } from '../../store/actions/messageNotificationAction';
import { NOTIFICATION_PUSH } from '../../store/type/messageNotificationTypes';
import { MESSAGE_WRITE, SEND_MESSAGE } from '../../store/type/messageTypes';
import { SOCKET_GLOBAL } from '../../store/type/socketType';
import BodyChat from './BodyChat';
const ChatBodyPage = ({ handleSingleChat, chatActive }) => {
    const dispatch = useDispatch();
    const { auth, groupData, notification, groupMessage, selectedChat } = useSelector(state => state);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState({ typing: false, user: null });
    // console.log(socketConnected)
    const socket = useRef();
    const ENDPOINT = "http://localhost:5000";
    useEffect(() => {
        socket.current = io(ENDPOINT, {
            auth: {
                token: auth?.user?.token
            }
        });
        if (auth?.user?.user) {
            socket.current.emit("setup", auth?.user?.user)
        }
        dispatch({
            type: SOCKET_GLOBAL,
            payload: { socket },
        })
        if (selectedChat?.chat?._id) {
            socket.current.emit("join chat", selectedChat?.chat?._id);
        }
        socket.current.on("typing", (data) => {
            // console.log(data)
            setIsTyping({ typing: true, user: data })
        })
        socket.current.on('stop typing', () => setIsTyping({ typing: false, user: null }))
        return () => { socket.current?.disconnect() };
    }, [auth?.user?.token, auth?.user?.user, dispatch, selectedChat?.chat?._id]);
    const handleTyping = (e) => {
        dispatch({
            type: MESSAGE_WRITE,
            payload: {
                data: e.target?.value,
            },
        })
        if (!auth?.user?.token) {
            return;
        }
        if (!typing) {
            setTyping(true)
            socket.current.emit('typing', { chat: selectedChat?.chat?._id, user: auth?.user?.user });
        } if (typing) {
            let lastTypingEpachType = new Date().getTime();
            let timerLength = 5000;
            setTimeout(() => {
                let timeNow = new Date().getTime();
                let timediff = timeNow - lastTypingEpachType;
                if (timediff >= timerLength && typing) {
                    socket.current.emit('stop typing', selectedChat?.chat?._id);
                    setTyping(false)
                }
            }, timerLength);
        }
    }
    useEffect(() => {
        socket.current.on("message recieved", (newMessageRecieved) => {
            // console.log(selectedChat?.chat?._id !== newMessageRecieved?.chat?._id)
            if (selectedChat?.chat?._id !== newMessageRecieved?.chat?._id) {
                if (!notification?.msgNotification?.includes(newMessageRecieved)) {
                    const allMsg = [newMessageRecieved, ...notification?.msgNotification]
                    const unsen = allMsg?.filter(msg => msg?.seen === false);
                    dispatch({
                        type: NOTIFICATION_PUSH,
                        payload: {
                            data: allMsg,
                            myunread: unsen?.length
                        }
                    })
                }
            } else {
                //console.log(newMessageRecieved)
                if (newMessageRecieved?._id) {
                    dispatch({
                        type: SEND_MESSAGE,
                        payload: {
                            data: { data: newMessageRecieved }
                        }
                    })
                }
            }
        })
        // console.log('hello')
    }, [auth?.user?.token, dispatch, notification?.msgNotification, selectedChat?.chat, selectedChat?.chat?._id])
    // console.log(notification)
    useEffect(() => {
        dispatch(getGroupChatData(auth?.user?.token));
        dispatch(getNotification(auth?.user?.token))
    }, [auth?.user?.token, dispatch, groupMessage?.sendMsg?._id])

    useEffect(() => {
        if (groupMessage?.sendMsg?._id) {
            socket.current.emit("new message", groupMessage?.sendMsg);
        }
    }, [groupMessage?.messageInfoStore?._id, groupMessage?.msg, groupMessage?.sendMsg, groupMessage?.sendMsg?._id])

    return (
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3.6}>
                    <ChatHome chatActive={chatActive} isTyping={isTyping} handleTyping={handleTyping} handleSingleChat={handleSingleChat} groupData={groupData} groupMessage={groupMessage} />
                </Grid>
                <Grid item xs={12} md={8.4}>
                    <BodyChat isTyping={isTyping} handleTyping={handleTyping} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatBodyPage;