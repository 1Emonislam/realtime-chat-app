import { Box, Button, InputBase, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [count, setCount] = useState(0)
    const limit = 10;
    const { auth } = useSelector(state => state)
    console.log(users);
    useEffect(() => {
        fetch(`https://chalechat.herokuapp.com/api/dashboard/users?search=${search || ''}&page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.user?.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data?.data)
                setCount(data?.count)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page])

    const handlerBlockUsers = (userId) => {
        fetch(`https://chalechat.herokuapp.com/api/dashboard/users/action?search=${search || ''}&page=${page}&limit=${limit}`, {
            method: "POST",
            body: JSON.stringify({ userId, status: 'block' }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.user?.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.message) {
                    toast.success(data?.message, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (data?.error?.admin) {
                    toast.error(data?.error?.admin, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                setUsers(data?.data)
                setCount(data?.count)
            })
    }
    const handlerMakeAdmin = (userId) => {
        fetch(`https://chalechat.herokuapp.com/api/dashboard/make/admin?search=${search || ''}&page=${page}&limit=${limit}`, {
            method: "PUT",
            body: JSON.stringify({ userId, role: 'admin', sort: 'active' }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.user?.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.message) {
                    toast.success(data?.message, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (data?.error?.admin) {
                    toast.error(data?.error?.admin, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                setUsers(data?.data)
                setCount(data?.count)
            })
    }
    const handlerRemoveAdmin = (userId) => {
        fetch(`https://chalechat.herokuapp.com/api/dashboard/make/admin?search=${search || ''}&page=${page}&limit=${limit}`, {
            method: "PUT",
            body: JSON.stringify({ userId, role: 'user', sort: 'active' }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.user?.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.message) {
                    toast.success(data?.message, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                if (data?.error?.admin) {
                    toast.error(data?.error?.admin, {
                        position: "top-center",
                        theme: 'light',
                        fontWeight: '500',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                setUsers(data?.data)
                setCount(data?.count)
            })
    }
    return (
        <Box sx={{ pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', p: '15px' }}>
                <Box>
                    <Typography sx={{ fontSize: '24px' }} variant='h4'>Users List: {count}</Typography>
                </Box>
                <Paper
                    component="form"
                    sx={{ background: 'white', p: '1px 2px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '5px', border: '1px solid #f1f3f8', boxShadow: 'none' }}
                >
                    {/* <IconButton type="submit" sx={{ p: '10px', }} aria-label="search">
                        <SearchIcon style={{ color: 'rgb(0 0 0 / 54%)' }} />
                    </IconButton> */}
                    <InputBase
                        onChange={(e) => setSearch(e.target.value)}
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
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="right">Role</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="right">Status</TableCell>
                            <TableCell sx={{ fontFamily: 'Poppines', fontSize: '16px', fontWeight: 600, color: '#333' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ background: 'white' }}>
                        {
                            users?.map(user => <TableRow key={user?._id} sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    background: '#f8f9fa',
                                }
                            }}>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, color: '#333' }} align="left">{user?._id}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">{`${user?.firstName} ${user?.lastName}`}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">{moment(user?.createdAt)?.format('ll')}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="center">{moment(user?.lastOneline)?.fromNow()}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 400, color: '#333' }} align="right">{user?.role}</TableCell>
                                <TableCell sx={{
                                    fontFamily: 'Poppines',
                                    fontSize: '15px',
                                    fontWeight: 400,
                                    color: 'green'
                                }}
                                    align="right"
                                >{user?.status}</TableCell>
                                <TableCell sx={{ fontFamily: 'Poppines', fontSize: '15px', fontWeight: 600, }} align="right">
                                    <Button
                                        onClick={() => handlerBlockUsers(user?._id)}
                                        sx={{
                                            textTransform: 'capitalize',
                                            background: '#e32ab2',
                                            color: '#fff',
                                            mr: 1,
                                            '&:hover': {
                                                background: '#e32ab2',
                                                color: '#fff',
                                            }
                                        }}>
                                        Block
                                    </Button>
                                    {
                                        user?.role === 'admin' ?
                                            <Button
                                                onClick={() => handlerRemoveAdmin(user?._id)}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    background: '#3e74a0',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        background: '#3e74a0',
                                                        color: '#fff',
                                                    }
                                                }}>
                                                Remove Admin
                                            </Button> :
                                            <Button
                                                onClick={() => handlerMakeAdmin(user?._id)}
                                                sx={{
                                                    textTransform: 'capitalize',
                                                    background: '#2a90e3',
                                                    color: '#fff',
                                                    '&:hover': {
                                                        background: '#2a90e3',
                                                        color: '#fff',
                                                    }
                                                }}>
                                                Make Admin
                                            </Button>
                                    }
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper>
                <Pagination
                    sx={{ py: 5, }}
                    count={Math.ceil(count / limit)}
                    color="secondary"
                    variant="outlined"
                    onChange={(e, value) => setPage(value)}
                />
            </Paper>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Box>
    );
};

export default Users;