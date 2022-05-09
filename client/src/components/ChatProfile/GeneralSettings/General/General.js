import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import React from 'react';
import { useForm } from 'react-hook-form';


const General = ({ mode }) => {
    const { register, handleSubmit, reset, } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <>
            <Box>
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography sx={{ mb: -0.5 }} fontWeight={600} variant="h6" gutterBottom component="div">
                        Account Settings
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: grey[500] }} fontSize={14} gutterBottom component="div">
                        Update your account details
                    </Typography>
                </Paper>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800] }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    First Name
                                </Typography>
                                <TextField sx={{ mb: 3 }} {...register("firstName")} fullWidth id="fullWidth" />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800] }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Last Name
                                </Typography>
                                <TextField sx={{ mb: 3 }} {...register("lastName")} fullWidth id="fullWidth" />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800] }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Nickname (optional)
                                </Typography>
                                <TextField sx={{ mb: 3 }} {...register("nickname")} fullWidth id="fullWidth" />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800] }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Choose Profile Picture
                                </Typography>
                                {/* <  type='file' sx={{mb:3}} {...register("profilePicture")} fullWidth id="fullWidth" /> */}
                                <Button
                                    component="label"
                                    fullWidth
                                    sx={{
                                        py: 1.8,
                                        textTransform: 'none',
                                        border: `${mode !== 'dark' ? '1px solid #cbcbcb' : '1px solid #424242'}`,
                                        color: `${mode !== 'dark' ? 'black' : '#726f6f'}`
                                    }}
                                >
                                    Upload File
                                    <input
                                        {...register("profilePicture")}
                                        type="file"
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography sx={{ color: grey[800] }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Bio
                                </Typography>
                                <TextField type='text' sx={{ mb: 3 }} {...register("bio")} fullWidth id="fullWidth" />

                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button type='submit' sx={{ bgcolor: deepPurple[700], borderRadius: 2, textTransform: 'none', px: '20px !important', py: '10px !important', color: 'white', fontSize: 15, fontWeight: 500, '&:hover': { bgcolor: deepPurple[700] } }} size="small">
                                Update Details
                            </Button>
                            <Button onClick={() => reset()} disabled={true} sx={{ bgcolor: 'none', textTransform: 'none', px: 2, ml: 1, py: 1, color: grey[800], fontSize: 15, fontWeight: 500 }} size="small">
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default General;