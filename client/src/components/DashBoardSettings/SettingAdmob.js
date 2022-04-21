
import React from 'react';
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';

const currencies = [
    {
        value: '1',
        label: 'option1',
    },
    {
        value: '2',
        label: 'option2',
    },
    {
        value: '3',
        label: 'option3',
    },
    {
        value: '4',
        label: 'option4',
    },
    {
        value: '5',
        label: '---select---',
    },

];



const SettingAdmob = () => {
    const [currency, setCurrency] = React.useState('5');
    const handleChange = (event) => {
        setCurrency(event.target.value);
    };
    return (
        <Box sx={{ bgcolor: '#fafbff', height: '100vh', px: 5 }}>
            <Box className='modal-content' sx={{ pt: 4 }}>
                <Typography sx={{ pl: 2, mb: 0, fontFamily: "Mada", fontWeight: 500 }} variant="h4" component="h4">
                    Admob Settings
                </Typography>
                <Box sx={{ display: "flex", pl: 2, mb: "20px" }}>
                    <Typography sx={{ fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }} variant="h5" component="h5">
                        Dashboard / </Typography>
                    <Typography variant="h5" component="h5" sx={{ color: '#7a6c7d', fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }}>Admob Settings</Typography>
                </Box>
                <Grid container sx={{ pb: "50px" }}>
                    <Grid item xs={12} md={12}>
                        <Box className="s" sx={{ height: '600px', borderRadius: "10px", px: "24px" }}>
                            <Box sx={{ borderBottom: "1px solid black", height: "61px", display: "flex", alignItems: "center" }}>
                                <Typography sx={{ fontSize: "24px", fontFamily: "Mada" }}>Admob Inputs</Typography>
                            </Box>

                            <form >
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Text Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", mt: "35px" }}
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

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Disabled Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"
                                        disabled

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Readonly Input</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Placeholder</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-password-input"
                                        type="text"
                                        placeholder='placeholder'

                                    />
                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>File Input</Typography>
                                    <Button
                                        sx={{ textAlign: "left !important", width: "80%", height: "40px", mt: "35px" }}
                                        variant="inherit"
                                        component="label">
                                        Upload file
                                        <input
                                            sx={{ width: "80%", height: "40px", mt: "35px" }}
                                            type="file"
                                            hidden
                                        />
                                    </Button>


                                </Box>
                                <Box sx={{ mb: "3px", height: "61px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography sx={{ mt: "50px", fontSize: "15px", fontFamily: "Poppins", mb: "2px", py: "auto" }}>Default Select</Typography>
                                    <TextField
                                        sx={{ width: "80%", height: "40px", mt: "35px" }}
                                        id="outlined-select-currency"
                                        select

                                        value={currency}
                                        onChange={handleChange}

                                    >
                                        {currencies.map((option, i) => (
                                            <MenuItem key={i} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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

export default SettingAdmob;