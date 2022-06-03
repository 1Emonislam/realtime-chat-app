/* eslint-disable react-hooks/exhaustive-deps */
// import EditRoadIcon from '@mui/icons-material/EditRoad';
import { Avatar, AvatarGroup, Grid, Pagination, ToggleButton, Tooltip, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
// import TypingIndicatior from './Typing/TypingIndicatior';
import LockIcon from '@mui/icons-material/Lock';
import moment from 'moment';
import React, { useContext } from 'react';
import { BsFillCheckCircleFill, BsFillFileEarmarkFill } from 'react-icons/bs';
import { FaVideo } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { IoIosImages } from 'react-icons/io';
import { SiAudiomack } from 'react-icons/si';
import { useSelector } from 'react-redux';
import { PaginationContext } from '../App';
import SkeletonRecentGroup from '../Editor/SkeletonRecentGroup';
import PublicIcon from '@mui/icons-material/Public';
import { chatExists } from '../RakibComponent/ChattingAria/ChatMiddle/ChatBody/chatLogic';
import './Chat.css';
import GroupSort from './GroupSort';
import TypingIndicatior from './Typing/TypingIndicatior';
function RecentChat({ isTyping, chatActive, handleTyping, groupMessage, handleSingleChat }) {
    const { notification, groupData } = useSelector(state => state)
    const [dataState, setDataState] = React.useState({
        activeObject: null,
        objects: groupData?.data,
    })
    // console.log(groupData?.data)
    React.useEffect(() => {
        if (groupData?.data?.length) {
            setDataState({ activeObject: dataState?.activeObject, objects: [...groupData?.data] })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupData?.data])

    function toggleActive(index) {
        setDataState({ ...dataState, activeObject: dataState.objects[index] })
    }
    function toggleActiveStyle(index) {

        console.log(dataState.activeObject)
        if (dataState.objects[index] === dataState.activeObject) {
            return 'user-list active'
        } else {
            return 'user-list inactive'
        }
    }
    //console.log(dataState?.activeObject?._id)
    const [selected, setSelected] = React.useState(false);

    // const [anchorEl, setAnchorEl] = React.useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    const [sortAncorEl, setSortAncorEl] = React.useState(null);
    const handleSortClick = (event) => {
        setSortAncorEl(event.currentTarget);
    };
    const paginationContext = useContext(PaginationContext)
    const {
        setPage,
        limit,
        count,
        pageUser,
        setPageUser,
        countMember,
        setCountMember,
        countAdmin,
        setCountAdmin,
        limitUser
    } = paginationContext;

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
                            RECENTS
                        </Typography>
                    </ToggleButton>

                </Grid>
                <Grid item xs={4} className="headIcon" sx={{ display: 'flex', justifyContent: 'end', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <Tooltip title="Edit" arrow>
                        <ToggleButton value="check"
                            selected={selected}
                            onChange={() => {
                                setSelected(false);

                            }} onClick={handleSortClick}>

                            {/* <EditRoadIcon sx={{}} onClick={handleSortClick}> */}

                            <FiEdit sx={{

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
                    </Tooltip>

                    {/* <GroupSort setSortAncorEl={setSortAncorEl} sortAncorEl={sortAncorEl} handleSortClick/> */}

                    <GroupSort setSortAncorEl={setSortAncorEl} sortAncorEl={sortAncorEl} handleSortClick />

                </Grid>
            </Grid>
            <Grid container spacing={0} padding={'10px 0px'} justifyContent="center">
                {groupData?.loading && <SkeletonRecentGroup />}
                {!groupData?.loading &&
                    <> {groupData?.data?.map((chat, index) => (
                        <Grid key={index} item xs={12} className={() => toggleActiveStyle(index)} alignItems="center" justifyContent="center">
                            {/* { toggleActiveStyle(index) } */}
                            <Grid container spacing={0} alignItems="center" >
                                <Grid item xs={11}>
                                    <ToggleButton value="check"
                                        selected={selected}
                                        onChange={() => {
                                            setSelected(false);
                                        }} className={() => toggleActiveStyle(index)} sx={{ padding: '14px!important', margin: '0 5px', border: 'none', width: '96%', textTransform: 'capitalize' }} onClick={() => {
                                            toggleActive(index)
                                            handleSingleChat(chat._id, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser)
                                        }
                                        } >
                                        <Grid container spacing={0} alignItems="center" sx={{
                                            justifyContent: {
                                                lg: 'space-between',
                                                md: 'space-between',
                                                sm: 'space-between',
                                                xs: 'space-between'
                                            },
                                        }}>
                                            <Grid item xs={2}>

                                                <Tooltip style={{ cursor: "pointer" }} title={chat?.chatName} key={index}>
                                                    <Avatar key={index} alt={chat?.chatName} src={chat?.img} />
                                                </Tooltip>

                                            </Grid>
                                            <Grid item xs={10}>
                                                <Grid container spacing={0} alignItems="center" style={{ textAlign: 'left' }} justifyContent="center">
                                                    <Grid item xs={8}>
                                                        <Typography sx={{
                                                            color: "inherit",
                                                            textAlign: 'left',
                                                            marginLeft: '0px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontSize: {
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
                                                            <span >
                                                                {chat?.chatName} </span>
                                                            {chat.status === 'private' ? < LockIcon style={{ marginLeft: '5px', fontSize: '17px' }} /> : <PublicIcon style={{ marginLeft: '5px', fontSize: '17px' }} />}
                                                        </Typography>
                                                        <span style={{ fontSize: 'bold', fontWeight: '900', marginRight: '5px' }}>
                                                            {chat?.latestMessage?.sender?.firstName}
                                                        </span>
                                                        <span style={{ fontSize: '10px', }}>sent {chat?.latestMessage?.content?.text?.slice(0, 10)}{chat?.latestMessage?.content?.text ? '...' : ''}</span>
                                                        {!chat?.latestMessage?.content?.audio?.length ? '' : <SiAudiomack style={{ fontSize: '16px', marginRight: '5px' }}></SiAudiomack>}
                                                        {!chat?.latestMessage?.content?.video?.length ? '' : <FaVideo style={{ fontSize: '16px', marginRight: '5px' }}></FaVideo>}
                                                        {!chat?.latestMessage?.content?.images?.length ? '' : <IoIosImages style={{ fontSize: '16px', marginRight: '5px' }}></IoIosImages>}
                                                        {!chat?.latestMessage?.content?.others?.length ? '' : <BsFillFileEarmarkFill style={{ fontSize: '16px', marginRight: '5px' }}></BsFillFileEarmarkFill>}
                                                    </Grid>
                                                    {/* {console.log(groupData)} */}

                                                    <Grid item xs={4}>
                                                        <Grid item textAlign="right">
                                                            {/*  xs={2}  */}
                                                            <Typography sx={{
                                                                color: "inherit",
                                                                fontSize: {
                                                                    lg: 10,
                                                                    md: 10,
                                                                    sm: 10,
                                                                    xs: 10
                                                                },
                                                                fontWeight: {
                                                                    lg: 400,
                                                                    md: 400,
                                                                    sm: 400,
                                                                    xs: 400
                                                                },
                                                            }}>

                                                                {moment(chat?.latestMessage?.updatedAt).fromNow(true)}
                                                            </Typography>
                                                            {/* {console.log(chat)} */}
                                                            {/* {console.log(chat?.seen)} */}
                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <div sx={{
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
                                                                }} component="div">
                                                                    {isTyping?.typing && chatExists(chat?._id, isTyping?.user?.chat) ? <>
                                                                        <TypingIndicatior />
                                                                        <div style={{ display: "flex", alignItems: 'center' }}>
                                                                            <Tooltip style={{ cursor: "pointer" }} title={isTyping?.user?.user?.firstName + ' ' + isTyping?.user?.user?.lastName} arrow>
                                                                                <Avatar sx={{ height: '15px', width: '15px' }} alt={isTyping?.user?.user?.username} src={isTyping?.user?.user?.pic} />
                                                                            </Tooltip>
                                                                        </div>
                                                                    </> : <> </>}
                                                                    {groupMessage?.latestMessage?.sent && <BsFillCheckCircleFill />}
                                                                </div>
                                                                {chat?.seen?.length !== 0 && <AvatarGroup max={3}>
                                                                    {chat?.seen?.slice(0, 4)?.map((user, i) => (
                                                                        <Tooltip style={{ cursor: "pointer" }}
                                                                            arrow title={user?.firstName + ' ' + user?.lastName} key={i}>
                                                                            <Avatar sx={{ height: '12px', width: '12px', marginTop: '3px' }} alt={user.username} src={user?.pic} />
                                                                        </Tooltip>
                                                                    ))}
                                                                </AvatarGroup>}
                                                            </div>

                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ToggleButton>
                                </Grid>
                                <Grid item xs={1}>
                                    {(notification?.msgNotification?.filter(push => push?.chat?._id === chat?._id && push?.seen === false)?.length) !== 0 && <Badge badgeContent={(notification?.msgNotification?.filter(push => push?.chat?._id === chat?._id && push?.seen === false)?.length)} color="primary">
                                    </Badge>}
                                    {/* {<GroupInfo anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleClick={handleClick} />} */}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))} </>}
                <Pagination
                    count={Math.ceil(count / limit)}
                    color="primary"
                    variant="outlined"
                    onChange={(e, value) => setPage(value)}
                />
            </Grid >
        </div >
    )
}

export default RecentChat