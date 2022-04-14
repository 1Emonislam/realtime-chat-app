import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import "./general.css"
import { FaUserEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Users = () => {



    const rows = [
        {
            name: "John Lee",
            id: "#0001",
            img: "https://dreamschat-reactjs.dreamguystech.com/template2/e6604b3279586ece5009bf5ceadcb602.jpg",
            RegisteredDate: "01 Oct 2019",
            LoginTime: "01.00 PM",
            LogoutTime: "03.54 PM",
            LastLogin: "11.00 PM",
            Action: <><Button><FaUserEdit style={{ fontSize: "24px" }}></FaUserEdit></Button><Button><AiTwotoneDelete style={{ fontSize: "24px" }}></AiTwotoneDelete></Button></>
        }
    ];

    return (
        <Box sx={{ bgcolor: '#fafbff', height: '100vh', px: 5 }}>
            <Box className='modal-content' sx={{ pt: 4 }}>
                <Typography sx={{ pl: 2, mb: 0, fontFamily: "Mada", fontWeight: 500 }} variant="h4" component="h4">
                    Users
                </Typography>
                <Box sx={{ display: "flex", pl: 2, mb: "20px" }}>
                    <Typography sx={{ fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }} variant="h5" component="h5">
                        Dashboard / </Typography>
                    <Typography variant="h5" component="h5" sx={{ color: '#7a6c7d', fontSize: '16px', fontFamily: "Poppins", fontWeight: "500" }}>Report User</Typography>
                </Box>

            </Box >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold" }} align="center">Name</TableCell>
                            <TableCell style={{ fontWeight: "bold" }} align="center">RegisteredDate</TableCell>
                            <TableCell style={{ fontWeight: "bold" }} align="center">LoginTime</TableCell>
                            <TableCell style={{ fontWeight: "bold" }} align="center">LogoutTime</TableCell>
                            <TableCell style={{ fontWeight: "bold" }} align="center">LastLogin</TableCell>
                            <TableCell style={{ fontWeight: "bold" }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                className="table"
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Box sx={{ mr: "5px" }}>
                                            <img style={{ borderRadius: "20%" }} width="45px" height="45px" src={row.img} alt="user" />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: "Poppins" }}>{row.name}</Typography>
                                            <Typography sx={{ fontFamily: "Poppins" }}>{row.id}</Typography>
                                        </Box>
                                    </Box>


                                </TableCell>
                                <TableCell align="center">{row.RegisteredDate}</TableCell>
                                <TableCell align="center">{row.LoginTime}</TableCell>
                                <TableCell align="center">{row.LogoutTime}</TableCell>
                                <TableCell align="center">{row.LastLogin}</TableCell>
                                <TableCell align="center">{row.Action}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box >
    );
};

export default Users;