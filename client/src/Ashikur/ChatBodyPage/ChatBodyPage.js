/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginationContext } from '../../App';
import ChatHome from '../../components/ChatHome';
import sockets from '../../socket';
import { getGroupChatData } from '../../store/actions/groupActions';
import { removeNotificationDB } from '../../store/actions/messageNotificationAction';
import { ONLINE_USER } from '../../store/reducers/allOnlineUserReducer';
import { NOTIFICATION_PUSH } from '../../store/type/messageNotificationTypes';
import { MESSAGE_WRITE, SEND_MESSAGE } from '../../store/type/messageTypes';
import BodyChat from './BodyChat';
const ChatBodyPage = ({ handleSingleChat, chatActive }) => {
    const dispatch = useDispatch();
    const paginationContext = useContext(PaginationContext)
    const { page, setPage, setCount, limit } = paginationContext;
    const { auth, groupData, notification, groupMessage, selectedChat } = useSelector(state => state);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState({ typing: false, user: null });
    const socket = useRef()
    useEffect(() => {
        socket.current = sockets;
        if (!auth?.user?.token) {
            window.location.replace('/login')
        }
        if (!socket?.current) return;
        if (!auth?.user?.token) return;
        if (selectedChat?.chat?._id) {
            socket?.current?.emit("join chat", selectedChat?.chat?._id);
        }
        socket?.current?.on("typing", (data) => {
            //console.log(data)
            setIsTyping({ typing: true, user: data })
        })
        socket?.current?.on('stop typing', () => setIsTyping({ typing: false, user: null }))
    }, [auth?.user?.user, dispatch, selectedChat?.chat?._id]);
    useEffect(() => {
        if (!socket?.current) return;
        socket?.current?.off('online user').on('online user', (data) => {
            dispatch({
                type: ONLINE_USER,
                payload: {
                    data: data
                }
            })
        })
    })
    const handleTyping = (e) => {
        if (!socket?.current) return;
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
            socket?.current?.emit('typing', { chat: selectedChat?.chat?._id, user: auth?.user?.user });
        } if (typing) {
            let lastTypingEpachType = new Date().getTime();
            let timerLength = 6000;
            setTimeout(() => {
                let timeNow = new Date().getTime();
                let timediff = timeNow - lastTypingEpachType;
                if (timediff >= timerLength && typing) {
                    socket?.current?.emit('stop typing', selectedChat?.chat?._id);
                    setTyping(false)
                }
            }, timerLength);
        }
    }
    useEffect(() => {
        if (!socket?.current) return;
        if (groupMessage?.sendMsg?._id) {
            socket?.current?.emit("new message", groupMessage?.sendMsg);
        }
    }, [groupMessage.messageInfoStore?._id, groupMessage?.sendMsg, groupMessage?.sendMsg?._id]);
    // console.log(socket?.current)
    // console.log(socket?.current)

    useEffect(() => {
        if (!socket?.current) return
        socket?.current?.off("message recieved").on("message recieved", (data) => {
            // console.log(data)
            if (data?.newMessageRecieved) {
                dispatch(getGroupChatData(auth?.user?.token, 'recent', page, limit, setPage, setCount))
            }
            const { newMessageRecieved, notificationObj } = data;
            if (selectedChat?.chat?._id === newMessageRecieved?.chat?._id) {
                dispatch(removeNotificationDB(notificationObj?.chat?._id, notificationObj?.message?._id, auth?.user?.token))
            }
            if (selectedChat?.chat?._id !== newMessageRecieved?.chat?._id) {
                if (!notification?.msgNotification?.includes(newMessageRecieved)) {
                    const allMsg = [notificationObj, ...notification?.msgNotification]
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
                if (newMessageRecieved) {
                    dispatch({
                        type: SEND_MESSAGE,
                        payload: {
                            data: { data: newMessageRecieved }
                        }
                    })
                }
            }
        })
    })

    useEffect(() => {
        if (!auth?.user?.token) {
            window.location.replace('/login')
        }
    }, [auth?.user?.token])
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