import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const ReportUsers = () => {
    return (
        <Box sx={{ pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', p: '15px' }}>
                <Box>
                    <Typography sx={{ fontSize: '24px' }} variant='h4'>Report Users</Typography>
                </Box>
                <Paper
                    component="form"
                    sx={{ background: 'white', p: '1px 2px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '5px', border: '1px solid #f1f3f8', boxShadow: 'none' }}
                >
                    <IconButton type="submit" sx={{ p: '10px', }} aria-label="search">
                        <SearchIcon style={{ color: 'rgb(0 0 0 / 54%)' }} />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, color: 'rgb(0 0 0 / 54%)' }}
                        placeholder="Search Here"
                        inputProps={{ 'aria-label': 'search here' }}
                    />

                </Paper>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: '#eef0f6' }}>
                        <TableRow sx={{ borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }}>User Id</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">User Name</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">Joined Date</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">Last Seen</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ background: 'white' }}>
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
    );
};

export default ReportUsers;