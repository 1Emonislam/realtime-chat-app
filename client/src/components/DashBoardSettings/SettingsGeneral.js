import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { BsChatDots } from "react-icons/bs";
import { BiBlock } from "react-icons/bi";
import { AiOutlinePhone } from "react-icons/ai";
import TextField from '@mui/material/TextField';
import { BiCamera } from "react-icons/bi";
import "./general.css"

const SettingsGeneral = () => {
    return (
        <Box sx={{ bgcolor: '#fafbff', height: '100vh', px: 5, }}>

            <Box className='modal-content' sx={{ pt: 4 }}>
                <Typography sx={{ pl: 2, mb: 0, fontFamily: "Mada", fontWeight: 500 }} variant="h4" component="h4">
                    General Settings
                </Typography>
                <Box sx={{ display: "flex", pl: 2, mb: "20px" }}>
                    <Typography sx={{ fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }} variant="h5" component="h5">
                        Dashboard / </Typography>
                    <Typography variant="h5" component="h5" sx={{ color: '#7a6c7d', fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }}>General Settings</Typography>
                </Box>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={4}>
                        <Box className="s" sx={{ height: 'auto', borderRadius: "10px" }}>

                            <Box sx={{ width: "104px", pt: "26px", height: "104px", mx: "auto", mb: '2px', position: "relative" }} >
                                <Typography sx={{ width: "100%", display: "block", height: "100%", borderRadius: '30%' }} component="img" src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg">

                                </Typography>
                                <Box sx={{ p: "8px" }}>
                                    <BiCamera className='camera' ></BiCamera>
                                </Box>

                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <Typography sx={{ fontSize: "18px", fontFamily: "Mada", color: "#333333", mt: "1px" }} variant="h5" component="h5" >Seema Sisty</Typography>
                                <Typography sx={{ fontSize: "14px", fontFamily: "Poppins", color: "#bfaec3", mt: "1px", mb: '3px' }} variant="h5" component="h5" >Administrator</Typography>
                            </Box>
                            <hr />
                            <Box sx={{ height: "55px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "50px" }}>
                                <Box>
                                    <BsChatDots sx={{ fontSize: "16px" }}></BsChatDots>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>Chat</Typography>

                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>
                                        10, 203</Typography>
                                </Box>

                            </Box>
                            <hr />
                            <Box sx={{ height: "55px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "50px" }}>
                                <Box>
                                    <AiOutlinePhone sx={{ fontSize: "16px" }}></AiOutlinePhone>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>Call</Typography>

                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>

                                        403</Typography>
                                </Box>

                            </Box>
                            <hr />
                            <Box sx={{ height: "55px", display: "flex", justifyContent: "space-between", alignItems: "center", px: "50px" }}>
                                <Box>
                                    <BiBlock sx={{ fontSize: "16px" }}></BiBlock>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>Blocked User</Typography>

                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "18px", fontFamily: "Poppins", display: "inline-block", ml: "10px" }}>

                                        103</Typography>
                                </Box>

                            </Box>
                            <hr />
                            <Box sx={{ height: "55px", textAlign: "center" }}>
                                <Button className='viewButton' sx={{ my: "auto", display: "inline-block", }} variant="outlined">View History</Button>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ mb: "30px" }}>
                        <Box>
                            <Box className="s" sx={{ height: 'auto', borderRadius: "10px", px: "24px" }}>
                                <Box sx={{ borderBottom: "1px solid black", height: "61px", display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ fontSize: "24px", fontFamily: "Mada" }}> General Settings</Typography>
                                </Box>
                                <form>
                                    <Box sx={{ height: "61px", }}>
                                        <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px" }}>Name</Typography>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="outlined-password-input"
                                            type="text"

                                        />
                                    </Box>
                                    <Box sx={{ height: "61px", }}>
                                        <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px" }}>Email Address</Typography>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="outlined-password-input"
                                            type="email"

                                        />
                                    </Box>
                                    <Box sx={{ height: "61px", }}>
                                        <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px" }}>User Name</Typography>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="outlined-password-input"
                                            type="text"

                                        />
                                    </Box>
                                    <Box sx={{ height: "61px", }}>
                                        <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px" }}>Password</Typography>
                                        <TextField
                                            sx={{ width: "100%" }}
                                            id="outlined-password-input"
                                            type="password"

                                        />
                                    </Box>
                                    <Box sx={{ my: "50px", textAlign: "end", px: '40px' }}>
                                        <Button className="subbmitButton" sx={{ px: '40px' }} type="Submit" variant="contained">Submit</Button>
                                    </Box>


                                </form>



                            </Box>

                        </Box>



                    </Grid>
                </Grid>

            </Box>




        </Box>
    );
};

export default SettingsGeneral;