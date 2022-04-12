import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, TextField, Typography } from '@mui/material';

const SettingSinch = () => {
    return (
        <Box sx={{ bgcolor: '#fafbff', height: '100vh', px: 5 }}>
            <Box className='modal-content' sx={{ pt: 4 }}>
                <Typography sx={{ pl: 2, mb: 0, fontFamily: "Mada", fontWeight: 500 }} variant="h4" component="h4">
                    Sinch Settings
                </Typography>
                <Box sx={{ display: "flex", pl: 2, mb: "20px" }}>
                    <Typography sx={{ fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }} variant="h5" component="h5">
                        Dashboard / </Typography>
                    <Typography variant="h5" component="h5" sx={{ color: '#7a6c7d', fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }}>Sinch Settings</Typography>
                </Box>
                <Grid container sx={{ pb: "50px" }}>
                    <Grid item xs={12} md={12}>
                        <Box className="s" sx={{ height: '600px', borderRadius: "10px", px: "24px" }}>
                            <Box sx={{ borderBottom: "1px solid black", height: "61px", display: "flex", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "24px", fontFamily: "Mada" }}>Basic Inputs</Typography>
                            </Box>

                            <form >
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Large Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"
                                        placeholder='.form-control-lg'

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Default Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Small Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"
                                       

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Text Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Password</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="password"
                                        placeholder=''

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Placeholder</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"
                                        placeholder='Placeholder'

                                    />
                                </Box>
                               
                               
                                <Box sx={{ my: "50px", textAlign: "end", px: '40px' }}>
                                    <Button className="subbmitButton" sx={{ px: '40px' }} type="Submit" variant="contained">Submit</Button>
                                </Box>

                            </form>

                        </Box>

                    </Grid>

                </Grid >
            </Box >

        </Box >
    );
};

export default SettingSinch;