import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, ToggleButton, Typography } from '@mui/material';
import React from 'react';
import './Group/Group.css';
import RecentChat from './RecentChat';
import './Group/__Groupcontainer.css'
function ChatHome() {
    const data = [
        {
            name: 'Helen',
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
        },
        {
            name: 'Alen',
            img: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: 'Samira',
            img: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
        {
            name: 'Fario',
            img: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        },
    ]
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
                        Chats
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
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                {data?.map((people, index) => (<Grid item key={index} xs={2.6}>
                    <div className="user-box-latest">
                        <div className="people-img-box">
                            <img src={people?.img} alt={people?.name} />
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
            <RecentChat />
        </div>
    )
}

export default ChatHome