import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import MenuBar from './MenuBar/MenuBar';

const Dashboard = () => {

    const [selected, setSelected] = useState(true);
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Box>
            <Header selected={selected} setSelected={setSelected} />
            <Box
                sx={
                    selected || mouseOver ?
                        {
                            display: 'grid',
                            gridTemplateColumns: '240px auto'
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

                <Box sx={{ background: '#f1f4f5', p: 3 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;