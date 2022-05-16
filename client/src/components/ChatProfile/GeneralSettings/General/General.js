import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, updateProfile } from '../../../../store/actions/profileAction';


const General = ({ mode }) => {
    const { register, handleSubmit, reset, } = useForm();
    const [selected, setSelected] = useState("")
    const [previewSource, setPreviewSource] = useState("")
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    const { firstName, lastName, nickname,pic, bio } = auth?.user?.user;
    useEffect(() => {
        dispatch(getMyProfile(auth?.user?.token))
    }, [auth?.user?.token, dispatch])
    const fileReader = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader?.result)
        }
    }
    if (selected) {
        const file = selected.target?.files[0];
        fileReader(file)
    }
    const onSubmit = data => {
        if(previewSource)data.pic = previewSource;
        updateProfile(auth?.user?.token,data)
    };
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
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    First Name
                                </Typography>
                                <TextField sx={{ mb: 3, px: '10px' }} {...register("firstName")} fullWidth id="fullWidth" defaultValue={firstName} />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Last Name
                                </Typography>
                                <TextField sx={{ mb: 3, px: '10px' }} {...register("lastName")} fullWidth id="fullWidth" defaultValue={lastName} />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Nickname (optional)
                                </Typography>
                                <TextField sx={{ mb: 3, px: '10px' }} {...register("nickname")} fullWidth id="fullWidth" defaultValue={nickname} />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Choose Profile Picture
                                </Typography>
                                {/* <  type='file' sx={{mb:3}} {...register("profilePicture")} fullWidth id="fullWidth" /> */}
                                <Typography sx={{ px: '10px' }}>
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
                                        {previewSource ? <>
                                            <img style={{ width: '90px', height: '90px', position: 'absolute', zIndex: '-1', borderRadius: '100%' }} src={previewSource} alt="chosen" />
                                            <label className="browseFile" style={{ opacity: 'none', background: 'transparent', padding: '40px', border: 'none' }}>
                                                <input sx={{ opacity: '0', color: 'white', height: '100px', padding: '30px 30px!important' }} onChange={(e) => setSelected(e)} type="file" />
                                            </label>
                                        </> :
                                            <>
                                               <img style={{ width: '90px', height: '90px', position: 'absolute', zIndex: '-1', borderRadius: '100%' }} src={pic} alt="chosen" />
                                                <label className="browseFile">
                                                    <input sx={{ opacity: '0', padding: '5px 30px!important' }} onChange={(e) => setSelected(e)} type="file" />
                                                </label></>}
                                    </Button>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Bio
                                </Typography>
                                <TextField type='text' sx={{ mb: 3, px: '10px' }} {...register("bio")} fullWidth id="fullWidth" defaultValue={bio} />

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