import React from 'react';
import Box from '@mui/material/Box';
import { BiSearchAlt2 } from "react-icons/bi";
import { TextField, Typography } from '@mui/material';

import "./general.css"

const OnLineAndOffLineStatusBar = () => {
    return (
        <Box sx={{ pt: "30px", pl: "25px" }}>
            <Box sx={{ position: "relative",mb:"8px" }}>
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                />

                <Box sx={{ position: "absolute", top: "20px", left: "196px" }}> <BiSearchAlt2 ></BiSearchAlt2></Box>
            </Box>
            <Box>
                <Typography variant="body2" gutterBottom sx={{ mb: "4px", fontFamily: "Poppins" }}>ONLINE-<span>2</span></Typography>
                <Box sx={{ mb: "30px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>
                            <Box sx={{ p: "3px", backgroundColor: "black", borderRadius: "100%", position: "absolute", top: "152px", left: "62px" }}>
                                <Box sx={{ width: "12px", height: "12px", backgroundColor: "green", borderRadius: "100%" }}></Box>
                            </Box>
                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>
                            <Box sx={{ p: "3px", backgroundColor: "black", borderRadius: "100%", position: "absolute", top: "212px", left: "62px", width: "12px", height: "12px", borderRadius: "100%" }}>

                                <Box sx={{ width: "12px", height: "12px", backgroundColor: "green", borderRadius: "100%" }}></Box>


                            </Box>
                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                </Box>
            </Box>
            <Box>
                <Typography variant="body2" gutterBottom sx={{ mb: "4px", fontFamily: "Poppins" }}>OFFNLINE-<span>4</span></Typography>
                <Box sx={{ mb: "30px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>

                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>

                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>

                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Box sx={{ position: "relative" }}>
                                <img width="54" height="54" style={{ borderRadius: "100%" }} src="https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg" alt="" />
                            </Box>

                        </Box>
                        <Typography variant="body" gutterBottom component="div" sx={{ mb: "4px", fontFamily: "Poppins", ml: "8px" }}>Elin Mirga</Typography>

                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default OnLineAndOffLineStatusBar;