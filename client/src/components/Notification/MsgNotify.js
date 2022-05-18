import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { BsFillFileEarmarkFill } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';
import { SiAudiomack } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { getSingleNotification } from '../../store/actions/messageNotificationAction';
import './MsgNotification.css';
export default function MsgNotify({ handleSingleChat, auth, notify }) {
    const dispatch = useDispatch()
    //console.log(notify?.seen)
    return (
        <ul style={{ margin: '0px !important', paddingLeft: '0px !important', cursor: 'pointer' }} onClick={() => {
            handleSingleChat(notify?.chat?._id, auth.user?.token)
            dispatch(getSingleNotification(notify?.chat?._id, auth.user?.token))
        }}>

            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem alignItems="flex-start" id={notify?.seen ? 'seen-notify' : 'unseen-notify'} >
                    <ListItemAvatar>
                        <Avatar alt={notify?.chat?.chatName} src={notify?.chat?.img} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${notify?.chat?.chatName}`}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {notify?.subject}
                                </Typography>
                                <br />
                                {notify?.message?.content?.text && notify?.message?.content?.text?.slice(0, 30)}{notify?.message?.content?.text ? '...' : ''} <span style={{ fontSize: 'bold', fontWeight: '900', marginRight: '5px' }}>
                                    {notify?.message?.sender?.firstName}
                                </span>
                                {!notify?.message?.audio?.length ? '' : <SiAudiomack style={{ fontSize: '16px', marginRight: '5px' }}></SiAudiomack>}
                                {!notify?.message?.content?.video?.length ? '' : <FaVideo style={{ fontSize: '16px', marginRight: '5px' }}></FaVideo>}
                                {!notify?.message?.content?.images?.length ? '' : <IoIosImages style={{ fontSize: '16px', marginRight: '5px' }}></IoIosImages>}
                                {!notify?.message?.content?.others?.length ? '' : <BsFillFileEarmarkFill style={{ fontSize: '16px', marginRight: '5px' }}></BsFillFileEarmarkFill>}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </ul >
    );
}