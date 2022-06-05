import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import MenuBar from './MenuBar/MenuBar';

const Dashboard = () => {

    const [selected, setSelected] = useState(true);
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Box sx={{ background: 'white', height: '100vh'}}>
            <Header selected={selected} setSelected={setSelected} />
            <Box
                sx={
                    selected || mouseOver ?
                        {
                            display: 'grid',
                            gridTemplateColumns: {
                                lg: '240px auto',
                                md: '130px auto',
                                xs: `${mouseOver ? '130px auto' : '50px auto'}`
                            }
                        } :
                        {
                            display: 'grid',
                            gridTemplateColumns: '70px auto'
                        }
                }
            >
                <Box
                    onMouseOver={() => setMouseOver(true)}
                    onMouseLeave={() => setMouseOver(false)}
                >
                    <MenuBar selected={selected} mouseOver={mouseOver} />
                </Box>

                <Box sx={{ background: '#f1f4f5', p: 3, height: '90vh' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;