import { Box, Grid, Typography, IconButton, InputBase, Paper, } from '@mui/material';
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CallIcon from '@mui/icons-material/Call';
import ForumIcon from '@mui/icons-material/Forum';

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

            <Box sx={{ pt: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', p: '15px' }}>
                    <Box>
                        <Typography sx={{ fontSize: '24px' }} variant='h4'>Users List</Typography>
                    </Box>
                    <Paper
                        component="form"
                        sx={{ p: '1px 2px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '5px', border: '1px solid #f1f3f8', boxShadow: 'none' }}
                    >
                        <IconButton type="submit" sx={{ p: '10px', }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Here"
                            inputProps={{ 'aria-label': 'search here' }}
                        />

                    </Paper>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ background: '#eef0f6' }}>
                            <TableRow>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }}>User Id</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">User Name</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">Joined Date</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">Last Seen</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    background: '#f8f9fa',
                                }
                            }}>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, color: '#333' }} align="left">001</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">Scott Albright</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">20 Jan 2019</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">15 mins ago</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, color: 'red' }} align="right">Inactive</TableCell>
                            </TableRow>
                            <TableRow sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    background: '#f8f9fa',
                                }
                            }}>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, color: '#333' }} align="left">001</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">Scott Albright</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">20 Jan 2019</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">Just Now</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, color: 'blue' }} align="right">Active</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Dhome;