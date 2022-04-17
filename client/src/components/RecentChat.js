import EditRoadIcon from '@mui/icons-material/EditRoad';
import { Avatar, AvatarGroup, Grid, ToggleButton, Typography } from '@mui/material';
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Bold from '@tiptap/extension-bold'
// import './Chat.css';
// import TypingIndicatior from './Typing/TypingIndicatior';
import moment from 'moment'
import { getSeenUser } from '../RakibComponent/ChattingAria/ChatMiddle/ChatBody/chatLogic';
import { useSelector } from 'react-redux';
import { generateHTML } from '@tiptap/react';
import React from 'react';
import Link from '@tiptap/extension-link';
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import htmlParser from 'html-react-parser'
function RecentChat({ groupData, handleSingleUser }) {
    const { auth } = useSelector(state => state)
    const [dataState, setDataState] = React.useState({
        activeObject: null,
        objects: [...groupData]
    })
    React.useEffect(() => {
        setDataState({ activeObject: dataState?.activeObject, objects: [...groupData] })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function toggleActive(index) {
        setDataState({ ...dataState, activeObject: dataState.objects[index] })
    }
    function toggleActiveStyle(index) {
        if (dataState.objects[index] === dataState.activeObject) {
            return 'active'
        } else {
            return 'inactive'
        }
    }

    return (
        <div>
            <Grid container spacing={0} sx={{
                padding: {
                    lg: '10px 20px',
                    md: '10px 15px',
                    sm: '10px 40px',
                    xs: '5px 40px'
                },
                marginTop: {
                    xs: '20px',
                },
            }} alignItems="center" justifyContent="space-around">
                <Grid item xs={8}>
                    <Typography sx={{
                        color: "inherit",
                        fontSize: {
                            lg: 16,
                            md: 16,
                            sm: 15,
                            xs: 10
                        },

                        fontWeight: {
                            lg: 700,
                            md: 600,
                            sm: 500,
                            xs: 500
                        },
                    }} gutterBottom component="div">
                        RECENT GROUP CHATS
                    </Typography>
                </Grid>
                <Grid item xs={4} className="headIcon" sx={{ display: 'flex', justifyContent: 'end', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <ToggleButton value="one">
                        <EditRoadIcon sx={{
                            fontSize: {
                                lg: 20,
                                md: 20,
                                sm: 15,
                                xs: 15
                            },
                            fontWeight: {
                                lg: 700,
                                md: 600,
                                sm: 500,
                                xs: 400
                            },
                            borderRadius: {
                                lg: '5px',
                                md: '4px',
                                sm: '3px',
                                xs: '2px'
                            }
                        }} />
                    </ToggleButton>
                </Grid>
            </Grid>
            <Grid container spacing={0} padding={'10px 0px'} justifyContent="center">
                {groupData?.map((chat, index) => (
                    <Grid key={index} item xs={12} className="user-list" alignItems="center" justifyContent="center">
                        <div style={{ padding: '10px 20px', margin: '0 20px' }} className={toggleActiveStyle(index)} onClick={(e) => handleSingleUser(chat._id, toggleActive(index))} >
                            <Grid container spacing={0} alignItems="center" sx={{
                                justifyContent: {
                                    lg: 'space-betwen',
                                    md: 'space-between',
                                    sm: 'space-between',
                                    xs: 'space-between'
                                },
                            }}>
                                <Grid item xs={1.5} sm={1} md={2.5} lg={2.5}>
                                    <div className="people-img-box2">
                                        <Grid container spacing={0}>
                                            {chat?.members?.map((user, index) => (
                                                <Grid item xs={4} key={index}>
                                                    <img src={user?.pic} alt={user?.username} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={9.5} sm={10.6} md={9} lg={9}>
                                    <Grid container spacing={0} alignItems="center" justifyContent="center">
                                        <Grid item xs={7}>
                                            <Typography sx={{
                                                color: "inherit",
                                                fontSize: {
                                                    lg: 14,
                                                    md: 14,
                                                    sm: 14,
                                                    xs: 14
                                                },
                                                fontWeight: {
                                                    lg: 600,
                                                    md: 600,
                                                    sm: 500,
                                                    xs: 400
                                                },
                                            }}>
                                                {chat.chatName} {chat?.chatName}
                                            </Typography>
                                            {chat?.latestMessage?.content?.text && <>
                                                {/* <TypingIndicatior />  */}
                                                <Typography sx={{
                                                    color: "inherit",
                                                    fontSize: {
                                                        lg: 13,
                                                        md: 11,
                                                        sm: 11,
                                                        xs: 11
                                                    },
                                                    fontWeight: {
                                                        lg: 400,
                                                        md: 400,
                                                        sm: 300,
                                                        xs: 300
                                                    },
                                                }} gutterBottom component="div">
                                                    {htmlParser(generateHTML(chat?.latestMessage?.content?.text, [
                                                        Document,
                                                        StarterKit, Underline, Link,
                                                    ])) || chat.latestMessage?.content?.audio || chat.latestMessage?.content?.video || chat.latestMessage?.content?.others}
                                                </Typography>
                                            </>}
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Grid item textAlign="right">
                                                {/*  xs={2}  */}
                                                <Typography sx={{
                                                    color: "inherit",
                                                    fontSize: {
                                                        lg: 12,
                                                        md: 10,
                                                        sm: 10,
                                                        xs: 10
                                                    },
                                                    fontWeight: {
                                                        lg: 200,
                                                        md: 200,
                                                        sm: 200,
                                                        xs: 200
                                                    },
                                                }}>
                                                    {moment(chat?.latestMessage?.updatedAt).fromNow()}
                                                </Typography>
                                                {chat?.seen?.length !== 0 && !getSeenUser(chat?.seen, auth?.user?.user)?.length && <AvatarGroup max={4} total={getSeenUser(chat?.seen, auth?.user?.user)?.length}>
                                                    {getSeenUser(chat?.seen, auth?.user?.user).map((user, i) => (
                                                        <Avatar key={i} sx={{ height: '18px', width: '18px', marginTop: '3px' }} alt={user.firstName} src={user?.pic} />
                                                    ))}
                                                </AvatarGroup>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default RecentChat