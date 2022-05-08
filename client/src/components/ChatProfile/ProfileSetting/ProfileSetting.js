import { Box, Typography } from '@mui/material';
import React from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
// import "./general.css"

const ProfileSetting = ({ mode }) => {
    return (
        <Box sx={{
            display: 'block',
            padding: {
                lg: "0 20px",
                me: "0 15px",
                sm: "0 40px",
                xs: "0 40px"
            },
        }} >
            <Box style={{
                padding: "20px",
                borderRadius: "5px",
                textAlign: "center",
                marginBottom: "20px"
            }}
                border={mode !== 'dark' ? '1px solid #F3F3F3' : '1px solid #1c1b1b'}
            >
                <Box sx={{ mb: "15px" }}>
                    <img style={{ width: "112px", height: "112px", borderRadius: "100px", marginBottom: "16px" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />

                    <Typography variant="h5" component="h5" sx={{ font: "20px", fontFamily: "Poppins", fontWeight: "600", color: "#5A078B", marginBottom: "2px" }}>
                        Michelle Green
                    </Typography>
                    <Typography variant="body" component="body" style={{ fontSize: "13px", fontFamily: "Poppins", color: "#9B9B9B", marginBottom: "2px" }}>
                        michelle.green@gmail.com
                    </Typography>
                    <Typography variant="body" component="body" style={{ fontSize: "16px", fontFamily: "Poppins", color: "#EE00AB", fontWeight: "600", marginBottom: "2px" }}>
                        USA
                    </Typography>
                </Box>

                <Box
                    sx={{ py: 4, }}
                    backgroundColor={mode !== 'dark' ? '#fcfcfc' : '#0d0d0d'}
                >
                    <Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                Phone
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                555-555-21541
                            </Typography>
                        </Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                Nick Name
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                Alberywo
                            </Typography>
                        </Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                Email
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                alberywo@gmail.com
                            </Typography>
                        </Box>
                        <Box>
                            <FaFacebookF style={{ fontSize: "16px", color: "#5A078B", marginRight: "13px" }}></FaFacebookF>
                            <FaLinkedinIn style={{ fontSize: "16px", color: "#5A078B", marginRight: "13px" }}></FaLinkedinIn>
                            <FaInstagram style={{ fontSize: "16px", color: "#5A078B", marginRight: "13px" }}></FaInstagram>
                            <FaTwitter style={{ fontSize: "16px", color: "#5A078B", marginRight: "13px" }}></FaTwitter>
                            <FaYoutube style={{ fontSize: "16px", color: "#5A078B" }}></FaYoutube>
                        </Box>
                    </Box>
                </Box>



            </Box>

        </Box>
    );
};

export default ProfileSetting;