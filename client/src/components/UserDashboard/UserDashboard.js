import { Grid } from '@mui/material';
import React from 'react';
import Nav from '../../Ashikur/Nav/Nav';
import DashBoardHome from '../DashBoardSettings/DashBoardHome';

const UserDashboard = ({ children, mode,handleSingleChat }) => {
    return (
        <>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={0.8}>
                    <Nav>{children}</Nav>
                </Grid>
             <Grid item xs={8}>
                    {/* <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={8.4}>
                                <DashBoardHome mode={mode} />
                            </Grid>
                            <Grid item xs={12} md={3.6}>
                                 <ProfileSetting /> 
                            </Grid>
                        </Grid>
                    </Box>*/}
                <DashBoardHome handleSingleChat={handleSingleChat}mode={mode} />  
                </Grid>
            </Grid>
        </>
    );
};

export default UserDashboard;