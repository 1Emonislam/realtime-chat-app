import CallIcon from '@mui/icons-material/Call';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import { Box, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

const Dhome = () => {
    return (
        <Box sx={{ py: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 4,
                        background: '#fff',
                        boxShadow: '0 0 10px rgb(0 0 0 / 10%)',
                        borderRadius: '10px'
                    }}>
                        <Box sx={{ height: '50px', width: '50px', borderRadius: '50%', background: '#420BA1', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <GroupIcon />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', color: '#76838f', textAlign: 'end', display: 'block', fontWeight: 500, textTransform: 'uppercase' }} variant='p'>Users Count</Typography>
                            <Typography sx={{ fontSize: '32px', color: '#76838f', textAlign: 'end', fontWeight: 600, mt: '5px' }} variant='h3'>10000</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 4,
                        background: '#fff',
                        boxShadow: '0 0 10px rgb(0 0 0 / 10%)',
                        borderRadius: '10px'
                    }}>
                        <Box sx={{ height: '50px', width: '50px', borderRadius: '50%', background: '#ffbc34 ', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CallIcon />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', color: '#76838f', textAlign: 'end', display: 'block', fontWeight: 500, textTransform: 'uppercase' }} variant='p'>Call Duration</Typography>
                            <Typography sx={{ fontSize: '32px', color: '#76838f', textAlign: 'end', fontWeight: 600, mt: '5px' }} variant='h3'>14000</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 4,
                        background: '#fff',
                        boxShadow: '0 0 10px rgb(0 0 0 / 10%)',
                        borderRadius: '10px'
                    }}>
                        <Box sx={{ height: '50px', width: '50px', borderRadius: '50%', background: '#e84646', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ForumIcon />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', color: '#76838f', textAlign: 'end', display: 'block', fontWeight: 500, textTransform: 'uppercase' }} variant='p'>Chat Count</Typography>
                            <Typography sx={{ fontSize: '32px', color: '#76838f', textAlign: 'end', fontWeight: 600, mt: '5px' }} variant='h3'>17000</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            
        </Box>
    );
};

export default Dhome;