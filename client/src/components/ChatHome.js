import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, ToggleButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import './Group/Group.css';
import RecentChat from './RecentChat';
import './Group/__Groupcontainer.css'
import { useDispatch, useSelector } from 'react-redux';
import { getGroupChatData } from '../store/actions/groupActions';
function ChatHome() {
    const dispatch = useDispatch();
    const { auth, groupData } = useSelector(state => state);
    // console.log(groupData?.data?.length)
    useEffect(() => {
        dispatch(getGroupChatData(auth?.user?.token))
    }, [dispatch, auth?.user?.token])
    return (
        <div className="chat-box-container">
            <Grid container spacing={0} sx={{
                padding: {
                    lg: '25px 20px',
                    md: '25px 15px',
                    sm: '25px 40px',
                    xs: '25px 40px'
                }
            }} alignItems="center" justifyContent="space-evenly">
                <Grid item xs={6}>
                    <Typography sx={{
                        color: "inherit",
                        fontSize: {
                            lg: 20,
                            md: 20,
                            sm: 16,
                            xs: 14
                        },
                        fontWeight: {
                            lg: 700,
                            md: 600,
                            sm: 500,
                            xs: 400
                        },
                    }} gutterBottom component="div">
                        Group Chats
                    </Typography>
                </Grid>
                <Grid item xs={6} className="headIcon" sx={{ display: 'flex', justifyContent: 'end', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <ToggleButton value="one">
                        <PeopleIcon sx={{
                            fontSize: {
                                lg: 20,
                                md: 20,
                                sm: 12,
                                xs: 11
                            },
                            fontWeight: {
                                lg: 700,
                                md: 600,
                                sm: 500,
                                xs: 400
                            },
                            borderRadius: {
                                lg: '5px',
                                md: '4px',
                                sm: '3px',
                                xs: '2px'
                            }
                        }} />
                    </ToggleButton>
                    <ToggleButton value="two" sx={{ marginLeft: '12px' }}>
                        <PersonAddIcon color="inherit" sx={{
                            borderRadius: {
                                lg: '5px',
                                md: '4px',
                                sm: '3px',
                                xs: '2px'
                            },
                            fontSize: {
                                lg: 20,
                                md: 20,
                                sm: 12,
                                xs: 11
                            },
                            fontWeight: {
                                lg: 700,
                                md: 600,
                                sm: 500,
                                xs: 400
                            }
                        }} />
                    </ToggleButton>
                </Grid>
                <Grid item xs={12} style={{ padding: '6px 0', }}>
                    <div className='search-field-box'>
                        <SearchIcon />
                        <input type="text" placeholder='Search Contacts' style={{ color: 'inherit' }} />
                    </div>
                </Grid>
            </Grid>
            {
                console.log(groupData?.data)
            }
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                {groupData?.data?.length && groupData?.data.map((people, index) => (<Grid item key={index} xs={2.6}>
                    <div className="user-box-latest">
                        <div className="people-img-box">
                            <img src={people?.pic} alt={people?.username} />
                        </div>
                        <div className="name">
                            <Typography sx={{
                                color: "inherit",
                                fontSize: {
                                    lg: 11,
                                    md: 11,
                                    sm: 15,
                                    xs: 15
                                },
                                fontWeight: {
                                    lg: 700,
                                    md: 600,
                                    sm: 500,
                                    xs: 400
                                },
                            }} gutterBottom component="div">
                                {people?.name}
                            </Typography>
                        </div>
                    </div>
                </Grid>))}
            </Grid>
            {groupData?.data?.length && <RecentChat groupData={groupData?.data} />}
        </div>
    )
}

export default ChatHome