/* eslint-disable react-hooks/exhaustive-deps */
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { Avatar, AvatarGroup, Grid, ToggleButton, Tooltip, Typography } from '@mui/material';
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// import Bold from '@tiptap/extension-bold'
import './Chat.css';
// import TypingIndicatior from './Typing/TypingIndicatior';
import moment from 'moment';
import React from 'react';
import SkeletonRecentGroup from '../Editor/SkeletonRecentGroup';
import EditorLatestMessage from '../RakibComponent/ChattingAria/ChatMiddle/ChatBody/EditorLatestMessage';
function RecentChat({ groupData, handleSingleUser }) {
    // console.log(groupData)
    const [dataState, setDataState] = React.useState({
        activeObject: null,
        objects: [...groupData]
    })
    // console.log(dataState)
    React.useEffect(() => {
        setDataState({ activeObject: dataState?.activeObject, objects: [dataState?.objects] })
    }, []);

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
    const [selected, setSelected] = React.useState(false);

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
                    <ToggleButton value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(false);
                        }} style={{ border: 'none', textTransform: 'capitalize' }}>
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
                        }}>
                            RECENT GROUP CHATS
                        </Typography>
                    </ToggleButton>

                </Grid>
                <Grid item xs={4} className="headIcon" sx={{ display: 'flex', justifyContent: 'end', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <ToggleButton value="check"
                        selected={selected}
                        onChange={() => {
                            setSelected(false);
                        }}>
                        <EditRoadIcon sx={{
                            textTransform: 'capitalize',
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
                {!groupData?.length ? <SkeletonRecentGroup /> :
                    <> {groupData?.map((chat, index) => (
                        <Grid key={index} item xs={12} className="user-list" alignItems="center" justifyContent="center">
                            <ToggleButton value="check"
                                selected={selected}
                                onChange={() => {
                                    setSelected(false);
                                }} sx={{ padding: '14px!important', margin: '0 5px', border: 'none', width: '96%', textTransform: 'capitalize' }} className={toggleActiveStyle(index)} onClick={(e) => handleSingleUser(chat._id, toggleActive(index))} >
                                <Grid container spacing={0} alignItems="center" sx={{
                                    justifyContent: {
                                        lg: 'space-betwen',
                                        md: 'space-between',
                                        sm: 'space-between',
                                        xs: 'space-between'
                                    },
                                }}>
                                    <Grid item xs={3}>
                                        <div className="people-img-box2">
                                            <Grid container spacing={0}>
                                                <AvatarGroup total={chat?.members?.length}>
                                                    {chat?.members?.slice(0, 2)?.map((user, index) => (
                                                        <Grid item xs={4} key={index}>
                                                            <Tooltip title={user.firstName + ' ' + user?.lastName} key={index}>
                                                                <Avatar key={index} alt={user.username} src={user?.pic} />
                                                            </Tooltip>
                                                        </Grid>
                                                    ))}
                                                </AvatarGroup>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9.5} sm={10.6} md={9} lg={9}>
                                        <Grid container spacing={0} alignItems="center" justifyContent="center">
                                            <Grid item xs={7}>
                                                <Typography sx={{
                                                    color: "inherit",
                                                    textAlign: 'center',
                                                    marginLeft: '0px',
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
                                                    {chat?.chatName}
                                                </Typography>
                                                {chat?.latestMessage?.content?.text && <>
                                                    {/* <TypingIndicatior />  */}
                                                    <Typography sx={{
                                                        textAlign: 'left',
                                                        color: "inherit",
                                                        marginLeft: '53px',
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
                                                        <EditorLatestMessage data={chat?.latestMessage?.content?.text}></EditorLatestMessage>
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
                                                    {/* {console.log(chat?.seen)} */}
                                                    {chat?.seen?.length && <AvatarGroup max={3}>
                                                        {chat?.seen?.slice(0, 3)?.map((user, i) => (
                                                            <Tooltip title={'seen'} key={i}>
                                                                <Avatar sx={{ height: '18px', width: '18px', marginTop: '3px' }} alt={user.username} src={user?.pic} />
                                                            </Tooltip>
                                                        ))}
                                                    </AvatarGroup>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ToggleButton>
                        </Grid>
                    ))} </>}
            </Grid>
        </div>
    )
}

export default RecentChat