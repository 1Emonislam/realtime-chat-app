import { Grid, Typography } from '@mui/material';
import React from 'react';
import './../../components/__Container.css';
import PeopleOffline from './PeopleOffline';
import PeopleOnline from './PeopleOnline';
// switch Button

const OnlineOfline = () => {
    return (
        <div className='current-user-about'>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography style={{ margin: '10px 0' }}> Online</Typography>
                    <PeopleOnline />
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{ marginTop: '20px', marginBottom: '10px' }}> Offline</Typography>
                    <PeopleOffline />
                </Grid>
            </Grid>
        </div>
    );
};

export default OnlineOfline;