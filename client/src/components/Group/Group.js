import { Grid } from '@mui/material';
import React from 'react';
// import ChatBodyPage from '../../Ashikur/ChatBodyPage/ChatBodyPage';
import Nav from '../../Ashikur/Nav/Nav';
import GroupBodyPage from './GroupBodyPage/GroupBodyPage';

const Group = ({ children }) => {
    return (
        <>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={0.8}>
                    <Nav>{children}</Nav>
                </Grid>
                <Grid item xs={12} md={11.2}>
                    <GroupBodyPage></GroupBodyPage>
                </Grid>
            </Grid>
        </>
    );
};

export default Group;