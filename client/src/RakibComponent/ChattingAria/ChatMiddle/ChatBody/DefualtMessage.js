import { Avatar, Grid, Tooltip } from '@mui/material'
import React from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'

import './DefualtMessage.css'
function DefualtMessage() {
    const { selectedChat } = useSelector(state => state)
    return (
        <div>
            <div className="general">
                <span className='green-box'> #</span>
                <span style={{ fontWeight: '700', color: 'green' }}>General</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ border: '1px solid rgba(0, 255, 179, 0.151)', height: '1px', width: '40%' }}></div>
                <p style={{ width: "18%", borderRadius: '50px', padding: "3px 0", textAlign: 'right', display: "flex", alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 255, 179, 0.151)', paddingLeft: '5px', color: '#978888' }}>Today <RiArrowDropDownLine style={{ marginLeft: '5px' }} /></p>
                <div style={{ border: '1px solid rgba(0, 255, 179, 0.151)', height: '1px', width: '40%' }}></div>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={1}>
                    <Tooltip title={selectedChat?.chat?.chatName} arrow style={{ marginTop: '20px' }}>
                        <Avatar src={selectedChat?.chat?.img} alt={selectedChat?.chat?.chatName}>

                        </Avatar>
                    </Tooltip>
                </Grid>
                <Grid item xs={11} style={{ display: 'flex', alignItems: 'center' }}>

                    <div>
                        <Tooltip title="" arrow>
                            <span style={{ color: 'gray', fontWeight: '800' }}>
                                Chale
                            </span>
                        </Tooltip>
                        <div>

                            <p style={{ fontSize: '14px', width: '80%', color: 'gray', }}>
                                greetings and welcome to  chale it is your space to connect with and share ideas with peers like you.
                            </p>
                        </div>

                        <br />
                        <p style={{ fontSize: '14px', width: '80%', color: 'gray', }}>
                            You are now is General public discussion, which is the default place for anybody who joins your chat.
                        </p>
                    </div>

                </Grid>
            </Grid>
        </div>
    )
}

export default DefualtMessage