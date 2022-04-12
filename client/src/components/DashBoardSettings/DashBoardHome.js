import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import { FcDoughnutChart } from "react-icons/fc";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { BsFillChatLeftFill } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
import pic from "../../images/increase.png"

import React from 'react';

const DashBoardHome = () => {
    return (
        <Container sx={{ py: "50px" }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
                        <Box>
                            <Paper sx={{ p: "15px", }} elevation={3}>
                                <bOX SX={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <FcDoughnutChart ></FcDoughnutChart>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold" }}>Charts</Typography>
                                </bOX>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Average</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>0</Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}>0.0%</span>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">History</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>0</Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}>0.0%</span>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowUp style={{ color: "green" }}></AiOutlineArrowUp> <span>0</span>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowDown style={{ color: "red" }}></AiOutlineArrowDown> <span>0</span>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
                        <Box>
                            <Paper sx={{ p: "15px", }} elevation={3}>
                                <bOX SX={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <BsFillPeopleFill ></BsFillPeopleFill>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold" }}>Visitors</Typography>
                                </bOX>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>0</Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}>0.0%</span>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowUp style={{ color: "green" }}></AiOutlineArrowUp> <span>0</span>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowDown style={{ color: "red" }}></AiOutlineArrowDown> <span>0</span>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
                        <Box>
                            <Paper sx={{ p: "15px", }} elevation={3}>
                                <bOX SX={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <MdGroupAdd ></MdGroupAdd>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold" }}>Create Group</Typography>
                                </bOX>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>0</Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}>0.0%</span>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowUp style={{ color: "green" }}></AiOutlineArrowUp> <span>0</span>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowDown style={{ color: "red" }}></AiOutlineArrowDown> <span>0</span>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
                        <Box sx={{ p: "15px", backgroundColor: "white", mb: "4px" }}>
                            <Typography sx={{ textAlign: "center" }} variant="h4" component="h4">Meeting Group</Typography>

                        </Box>
                        <Box sx={{ p: "10px", backgroundColor: "whitesmoke", }}>
                            <Box sx={{ textAlign: "center", mb: "4px" }}>
                                <IoIosChatboxes></IoIosChatboxes>
                                <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom component="div">Chat</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: "30px" }}>
                                <Box sx={{ textAlign: "center", mb: "4px" }}>
                                    <BsFillChatLeftFill></BsFillChatLeftFill>
                                    <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom component="div">Chat</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center", mb: "4px" }}>
                                    <IoIosNotifications></IoIosNotifications>
                                    <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom component="div">Notification</Typography>
                                </Box>

                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: "30px" }}>
                                <Box sx={{ textAlign: "center", mb: "4px" }}>
                                    <MdGroup></MdGroup>
                                    <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom component="div">messages</Typography>
                                </Box>
                                <Box sx={{ textAlign: "center", mb: "4px" }}>
                                    <IoIosNotifications></IoIosNotifications>
                                    <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom component="div">Notification</Typography>
                                </Box>

                            </Box>
                        </Box>

                    </Box>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Box sx={{ p: "10px", backgroundColor: "lightgray" }}>
                        <Box>
                            <Paper sx={{ p: "15px", }} elevation={3}>
                                <bOX SX={{ display: "flex", alignItems: "center", mb: "15px" }}>
                                    <HiUserGroup ></HiUserGroup>
                                    <Typography variant="subtitle2" component="div" sx={{ display: "inline-block", ml: "5px", fontWeight: "bold" }}>Join Group</Typography>
                                </bOX>
                                <Box sx={{ display: "flex", alignItems: "center", my: "30px" }}>
                                    <Box sx={{ mr: "30px" }}>
                                        <Typography sx={{ mb: "13px" }} variant="subtitle2" component="div">Today</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center" }} >
                                            <Box sx={{ display: "inline-block", fontWeight: "bold" }}>0</Box>
                                            <Box sx={{ ml: "12px", display: "flex", alignItems: "center" }}>
                                                <img width="20" height="20" src={pic} alt="" /> <span style={{ color: "green", fontWeight: "bold" }}>0.0%</span>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ mr: "3px" }}>Last <span>7</span> days </Typography>
                                    <Box sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowUp style={{ color: "green" }}></AiOutlineArrowUp> <span>0</span>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AiOutlineArrowDown style={{ color: "red" }}></AiOutlineArrowDown> <span>0</span>
                                        </Box>
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