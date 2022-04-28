import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { getSingleNotification } from '../../store/actions/messageNotificationAction';

export default function MsgNotify({ handleSingleChat, auth, notify }) {
    const dispatch = useDispatch()
    // console.log(notify?.seen)
    return (
        <ul style={{ margin: '0px !important', paddingLeft: '0px !important', cursor: 'pointer' }} className={notify?.seen ? 'seen-notify' : 'unseen-notify'} onClick={() => {
            handleSingleChat(notify?.chat?._id, auth.user?.token)
            dispatch(getSingleNotification(notify?.chat?._id, auth.user?.token))
        }}>

            <List sx={{ width: '100%', maxWidth: 360 }} className={notify?.seen ? 'unseen-notify' : 'seen-notify'}>
                <ListItem alignItems="flex-start">
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
                                {`${notify?.message?.content?.text?.slice(0, 30)}`}...
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </ul >
    );
}