import Cancel from '@mui/icons-material/Cancel';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
// import "./general.css"

const ProfileSetting = ({ mode, handleClose ,caneclBtn}) => {
    const { auth } = useSelector(state => state)
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
                    <img style={{ width: "112px", height: "112px", borderRadius: "100px", marginBottom: "16px" }} src={auth?.user?.user?.pic} alt="" />
                    {caneclBtn&&<Cancel style={{ position: 'relative', top: '-60px', left: '80px', color: "#ee00ab" }} onClick={handleClose} />}
                    <Typography variant="h5" component="h5" sx={{ font: "20px", fontFamily: "Poppins", fontWeight: "600", color: "#5A078B", marginBottom: "2px" }}>
                        {`${auth?.user?.user?.firstName} ${auth?.user?.user?.lastName}`}
                    </Typography>
                    <Typography variant="body" component="body" style={{ fontSize: "13px", fontFamily: "Poppins", color: "#9B9B9B", marginBottom: "2px" }}>
                        {auth?.user?.user?.email}
                    </Typography>
                </Box>

                <Box
                    sx={{ py: 4, }}
                    backgroundColor={mode !== 'dark' ? 'transparent' : '#0d0d0d'}
                >
                    <Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                User Info
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
                                {auth?.user?.user?.userInfo}
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
                                {auth?.user?.user?.nickName || 'N/A'} 
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
                                {auth?.user?.user?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Box>
    );
};

export default ProfileSetting;