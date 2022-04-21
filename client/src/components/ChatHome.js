// import PeopleIcon from '@mui/icons-material/People';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import SearchIcon from '@mui/icons-material/Search';
// import { Grid, ToggleButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupChatData } from '../store/actions/groupActions';
import { getMessage } from '../store/actions/messageAction';
import { getGroupMember } from '../store/actions/singleChatMemberAction';
import './Group/Group.css';
import './Group/__Groupcontainer.css';
import RecentChat from './RecentChat';
function ChatHome() {
    const dispatch = useDispatch();
    const { auth,groupMessage, groupData } = useSelector(state => state);
    // console.log(groupMessage)
    useEffect(() => {
        dispatch(getGroupChatData(auth?.user?.token))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, groupData?.data?.length,groupMessage?.msg]);
    const handleSingleUser = (id) => {
        if (id) {
            dispatch(getGroupMember(id, auth?.user?.token))
            dispatch(getMessage(id, auth?.user?.token))
        }
    }
    return (
        <div className="chat-box-container">
            {groupData?.data?.length && <RecentChat handleSingleUser={handleSingleUser} groupData={groupData?.data} />}
        </div>
    )
}

export default ChatHome