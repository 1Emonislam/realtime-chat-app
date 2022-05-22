import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { deepPurple, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyProfile } from '../../../../store/actions/profileAction';
import { AUTH_SUCCESS } from '../../../../store/type/authType';
import { PROFILE_FAILED, PROFILE_REQUEST, PROFILE_SUCCESS } from '../../../../store/type/profileType';
import Loading from '../../../Spinner/Loading';

const General = ({ mode, handleCloseBox }) => {
    const { register, handleSubmit, reset, } = useForm();
    const [selected, setSelected] = useState("")
    const [previewSource, setPreviewSource] = useState("")
    const dispatch = useDispatch();
    const { auth, profile } = useSelector(state => state);
    // console.log(profile)
    const { firstName, lastName, nickName, pic, userInfo } = auth?.user?.user;
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
    if (selected.target?.files?.length) {
        const file = selected.target?.files[0];
        fileReader(file)
    }
    const onSubmit = data => {
        if (previewSource) data.pic = previewSource;
        dispatch({
            type: PROFILE_REQUEST,
            payload: {
                loading: true,
            }
        })
        fetch(`https://collaballapp.herokuapp.com/api/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${auth?.user?.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                reset()
                window?.localStorage?.setItem("userInfoCurrent", JSON.stringify(data?.data))
                dispatch({
                    type: PROFILE_REQUEST,
                    payload: {
                        loading: false,
                    }
                })
                if (data?.data) {
                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: {
                            data: data?.data
                        }
                    })
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: {
                            data: data
                        }
                    })
                }
                if (data?.error) {
                    dispatch({
                        type: PROFILE_FAILED,
                        payload: {
                            error: data.error,
                        }
                    })
                }
            })
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
                                <TextField sx={{ mb: 3, px: '10px' }} {...register("nickName")} fullWidth id="fullWidth" defaultValue={nickName} />

                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <>
                                    <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                        Choose Profile Picture
                                    </Typography>

                                    {previewSource ? <>
                                        <img style={{ width: '90px', height: '90px', marginLeft: '50px', position: 'absolute', zIndex: '-1', borderRadius: '100%' }} src={previewSource} alt="chosen" />
                                        <label style={{ opacity: 'none', background: 'transparent', padding: '0px 100px', paddingBottom: '70px', border: 'none', cursor: 'pointer' }}>
                                            <input sx={{ opacity: '0', color: 'white', height: '100px', padding: '30px 30px!important' }} onChange={(e) => setSelected(e)} type="file" />
                                        </label>
                                    </> :
                                        <>
                                            <img style={{ width: '90px', height: '90px', marginLeft: '50px', position: 'absolute', zIndex: '-1', borderRadius: '100%' }} src={pic} alt="chosen" />
                                            <label style={{ opacity: 'none', background: 'transparent', padding: '0px 100px', paddingBottom: '70px', border: 'none', cursor: 'pointer' }}>
                                                <input onChange={(e) => setSelected(e)} type="file" />
                                            </label></>}

                                </>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography sx={{ color: grey[800], px: '10px' }} fontWeight={600} fontSize={14} gutterBottom component="div">
                                    Bio
                                </Typography>
                                <TextField type='text' sx={{ mb: 3, px: '10px' }} {...register("userInfo")} fullWidth id="fullWidth" defaultValue={userInfo} />

                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '50px' }}>
                            {profile?.loading ? <>Uploading <Loading style={{ margin: '0 15px ' }} /> </> : <>
                                <Button type='submit' sx={{ bgcolor: deepPurple[700], borderRadius: 2, textTransform: 'none', px: '20px !important', py: '10px !important', color: 'white', fontSize: 15, fontWeight: 500, '&:hover': { bgcolor: deepPurple[700] } }} size="small">
                                    Update Details
                                </Button>
                            </>}
                            {handleCloseBox ? <Button onClick={() => handleCloseBox()} style={{ bgcolor: 'none', marginLeft: '10px', textTransform: 'none', px: 2, ml: 1, py: 1, color: grey[800], fontSize: 15, fontWeight: 500 }} size="small">
                                Cancel
                            </Button> : <Link to="/chat" style={{ bgcolor: 'none', marginLeft: '10px', textTransform: 'none', px: 2, ml: 1, py: 1, color: grey[800], fontSize: 15, fontWeight: 500 }} size="small">
                                Cancel
                            </Link>}
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default General;