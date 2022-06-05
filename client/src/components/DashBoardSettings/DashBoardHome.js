import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Container, Grid, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
// import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import {
    BsFillChatDotsFill,
    BsFillChatLeftFill,
    BsFillPeopleFill
} from "react-icons/bs";
import {
    HiUserGroup
} from "react-icons/hi";
import { FcDoughnutChart } from "react-icons/fc";
import { MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import { MdGroupAdd } from "react-icons/md";
import pic from "../../images/increase.png";
import MessageNotificationBadge from '../Notification/MsgNotificationBadge';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGraphDahboardData } from '../../store/actions/graphActions';
const DashBoardHome = ({ mode, handleSingleChat }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { auth, graphDash } = useSelector(state => state)
    const { today, totalMsg, week } = graphDash;
    // console.log(today)
    useEffect(() => {
        dispatch(getGraphDahboardData(auth.user?.token))
    }, [dispatch, auth.user?.token])
    return (
        <Container sx={{ py: "50px" }}>
            <Box>
                <Typography
                    color={mode !== 'dark' ? 'black' : 'white'}
                    sx={{ fontSize: '24px', pb: 3 }}
                    variant='h4'
                >Dashboard</Typography>
            </Box>
            <Grid container spacing={6} justifyContent="space-between">
                <Grid item xs={12} md={4}>
                    <Box sx={{ boxShadow: '1px 1px 10px #dacdcd' }}>
                        <Box>
                            <Paper
                                sx={{ p: "25px", backgroundColor: `${mode === 'dark' ? 'black' : 'white'}` }}
                                elevation={3}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <Box sx={{ fontSize: '24px', color: '#5ab267' }}>
                                        <HiUserGroup ></HiUserGroup>
                                    </Box>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold", fontSize: '16px' }}>Join Group</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}> <Tooltip placement="top" title={today?.joinGroupCount} arrow>
                                                <span style={{ color: "green", fontWeight: "bold" }}>{today?.joinGroupCount}</span>
                                            </Tooltip></Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" />
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>

                                            <img width="20" height="20" src={pic} style={{ marginLeft: '5px' }} alt="" />   <Tooltip placement="top" title={today?.joinGroupCount} arrow>
                                                <span style={{ color: "green", fontWeight: "bold", marginLeft: '10px' }}> {week?.joinGroupCount}</span>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ boxShadow: '1px 1px 10px #dacdcd' }}>
                        <Box sx={{ p: "25px", backgroundColor: `${mode === 'dark' ? '#141414' : 'white'}`, mb: "4px", borderBottom: '1px solid #ddd' }}>
                            <Typography color={mode !== 'dark' ? 'black' : 'white'} sx={{ textAlign: "center", fontSize: '16px', fontWeight: 'bold' }} variant="h4" component="h4">Meeting Group</Typography>
                        </Box>
                        <Box
                            color={mode !== 'dark' ? '#141414' : 'white'}
                            sx={{ p: "10px", backgroundColor: `${mode === 'dark' ? '#141414' : 'white'}` }}>
                            <Box sx={{ textAlign: "center", mb: "4px", fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                navigate('/settings')
                            }}>
                                <SettingsIcon />
                                <Typography sx={{ textAlign: "center", fontSize: '14px' }} variant="h6" gutterBottom component="div">Settings</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: "30px" }}>
                                <Box sx={{ textAlign: "center", mb: "4px", fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                    navigate('/chat')
                                }}>
                                    <BsFillChatLeftFill></BsFillChatLeftFill>
                                    <Typography sx={{ textAlign: "center", fontSize: '14px' }} variant="h6" gutterBottom component="div">Chat</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center", mb: "4px", fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                    navigate('/chat')
                                }}>
                                    {/* <IoIosNotifications style={{ fontSize: '28px' }}></IoIosNotifications>
                                    <Typography sx={{ textAlign: "center", fontSize: '14px' }} variant="h6" gutterBottom component="div">Notification</Typography> */}
                                    <MessageNotificationBadge handleSingleChat={handleSingleChat} />
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: "30px" }}>
                                <Box sx={{ textAlign: "center", mb: "4px", fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                    window?.location?.replace('/notes')
                                }}>
                                    <BsFillChatDotsFill style={{ transform: 'scaleX(-1)' }} />
                                    <Typography sx={{ textAlign: "center", fontSize: '14px' }} variant="h6" gutterBottom component="div">Notes</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center", mb: "4px", fontSize: '20px', cursor: 'pointer' }} onClick={() => {
                                    navigate('/chat')
                                }}>
                                    <GroupsIcon style={{ fontSize: '30px' }} />
                                    <Typography sx={{ textAlign: "center", fontSize: '14px' }} variant="h6" gutterBottom component="div">Groups</Typography>
                                </Box>

                            </Box>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ boxShadow: '1px 1px 10px #dacdcd' }}>
                        <Box>
                            <Paper
                                sx={{ p: "25px", backgroundColor: `${mode === 'dark' ? 'black' : 'white'}` }}
                                elevation={3}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <Box sx={{ fontSize: '24px' }}>
                                        <FcDoughnutChart />
                                    </Box>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold", fontSize: '16px' }}>Chale</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>
                                                <Tooltip title={today?.msgCount} placement="top" arrow>
                                                    <span style={{ color: "green", fontWeight: "bold" }}>{today?.msgCount}</span>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}></span>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">History</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>
                                                <Tooltip title={totalMsg} placement="top" arrow>
                                                    <span style={{ color: "green", fontWeight: "bold", marginLeft: '10px' }}>{totalMsg?.toString()?.slice(0, 15)}</span>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} style={{ marginLeft: '5px' }} alt="" />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <img width="20" height="20" src={pic} style={{ marginLeft: '5px' }} alt="" />
                                        <Tooltip title={week?.msgCount || ''} placement="top" arrow>
                                            <span style={{ color: "green", fontWeight: "bold", marginLeft: '10px' }}>{week?.msgCount}</span>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ boxShadow: '1px 1px 10px #dacdcd' }}>
                        <Box>
                            <Paper
                                sx={{ p: "25px", backgroundColor: `${mode === 'dark' ? 'black' : 'white'}` }}
                                elevation={3}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <Box sx={{ fontSize: '24px', color: '#5ab267' }}>
                                        <BsFillPeopleFill />
                                    </Box>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold", fontSize: '16px' }}>Visitors</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>
                                                <Tooltip title={today?.visitorCount} placement="top" arrow>
                                                    <span style={{ color: "green", fontWeight: "bold" }}>{today?.visitorCount}</span>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}> </span>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <img width="20" height="20" src={pic} style={{ marginLeft: '5px' }} alt="" />
                                    <Tooltip title={week?.visitorCount} placement="top" arrow >
                                        <span style={{ color: "green", fontWeight: "bold", marginLeft: '10px' }}>{week?.visitorCount}</span>
                                    </Tooltip>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ boxShadow: '1px 1px 10px #dacdcd' }}>
                        <Box>
                            <Paper
                                sx={{ p: "25px", backgroundColor: `${mode === 'dark' ? 'black' : 'white'}` }}
                                elevation={3}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <Box sx={{ fontSize: '24px', color: '#5ab267' }}>
                                        <MdGroupAdd ></MdGroupAdd>
                                    </Box>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold", fontSize: '16px' }}>Created Group</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>
                                                <Tooltip title={today?.createGroupCount} placement="top" arrow>
                                                    <span style={{ color: "green", fontWeight: "bold" }}>{today?.createGroupCount}</span>
                                                </Tooltip>
                                            </Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}></span>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <img width="20" height="20" src={pic} style={{ marginLeft: '5px' }} alt="" />
                                        <Tooltip title={week?.createGroupCount} placement="top" arrow>
                                            <span style={{ color: "green", fontWeight: "bold", marginLeft: '10px' }}>{week?.createGroupCount}</span>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </Container>


    );
};

export default DashBoardHome;