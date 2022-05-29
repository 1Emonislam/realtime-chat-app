import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatBodyPage from '../../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../../Ashikur/Nav/Nav';
import { getMessage } from '../../../store/actions/messageAction';
import { getSelectedChat } from '../../../store/actions/selectedChatAction';
function Chat({ children }) {
  const { auth, selectedChat } = useSelector(state => state)
  const dispatch = useDispatch();
  const [chatActive, setChatActive] = useState(false)
  useEffect(() => {
    if (!auth?.user?.token) {
      window.location.replace('/login')
    }
  }, [auth?.user?.token])
  const handleSingleChat = (id,pageUser, limitUser, setCountMember,setCountAdmin, countMember,countAdmin, setPageUser) => {
    if (id) {
      dispatch(getSelectedChat(id, auth?.user?.token,  pageUser, limitUser, setCountMember,setCountAdmin, countMember,countAdmin, setPageUser))
      dispatch(getMessage(id, auth?.user?.token))
    }
    if (id === selectedChat?.chat?._id) {
      setChatActive(true)
    } else {
      setChatActive(false)
    }
  }
  // console.log(onlineUser)
  return (
    <>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={0.8}>
          <Nav handleSingleChat={handleSingleChat}>{children}</Nav>
        </Grid>
        <Grid item xs={12} md={11.2}>
          <ChatBodyPage chatActive={chatActive} handleSingleChat={handleSingleChat}></ChatBodyPage>
        </Grid>
      </Grid>
    </>
  )
}

export default Chat