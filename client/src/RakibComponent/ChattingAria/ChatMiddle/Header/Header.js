import Cancel from '@mui/icons-material/Cancel';
import Delete from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Divider, Grid, Popover, ToggleButton, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { FcDataBackup, FcDeleteDatabase, FcInvite } from 'react-icons/fc';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UpdateGroup from '../../../../components/AddGroups/UpdateGroup';
import socket from '../../../../socket';
import { getMessage } from '../../../../store/actions/messageAction';
import { VIDEO_CALL_MY_INFO } from '../../../../store/reducers/callReducer';
import { FAILED_MESSAGE, SUCCESS_MESSAGE_CLEAR } from '../../../../store/type/messageTypes';
import { MESSAGE_SEARCH_SELECTED } from '../../../../store/type/selectedChatTypes';
import '../ChatMiddle.css';
import AlertShow from './AlertShow';
import GroupAllMemberSearch from './AllMembersSearch';
import GroupAlertShow from './GroupAlertShow';
import GroupInfo from './GroupInfo';
import GroupInvite from './GroupInvite';
import GroupPeople from './GroupPeople';
import HeaderSkeletonMember from './HeaderSkeleton';
import AudioCall from './Modal/AudioCall';
import VideoCall from './Modal/VideoCall';

const Header = () => {
    const dispatch = useDispatch()
    const { selectedChat, groupMessage, theme, auth } = useSelector(state => state)
    const [search, setSearch] = useState('')
    const [audioOpen, setAudioOpen] = React.useState(false);
    const [videoOpen, setVideoOpen] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertOpenGroup, setAlertOpenGroup] = React.useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = () => setAlertOpen(false);
    const handleAlertOpenGroup = () => setAlertOpenGroup(true);
    const handleAlertCloseGroup = () => setAlertOpenGroup(false);
    const [groupInviteOpen, setGroupInviteOpen] = React.useState(false);
    const handleGroupInvite = () => setGroupInviteOpen(true);
    const handleGroupInviteClose = () => setGroupInviteOpen(false);
    const [addMemberOpen, setAddMemberOpen] = React.useState(false);
    const handleAddMemberOpen = () => setAddMemberOpen(true);
    const handleAddMemberClose = () => setAddMemberOpen(false);
    //group update 
    const [groupOpen, setGroupOpen] = React.useState(false);
    const handleGroupOpen = () => setGroupOpen(true);
    const handleGroupClose = () => setGroupOpen(false);
    const [groupInfoOpen, setGroupInfoOpen] = React.useState(false);
    const handleGroupInfoOpen = () => setGroupInfoOpen(true);
    const handleGroupInfoClose = () => setGroupInfoOpen(false);
    const navigate = useNavigate()
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (selectedChat?.chat?._id && selectedChat?.search && auth?.user?.token) {
                dispatch(getMessage(selectedChat?.chat?._id, auth?.user?.token, selectedChat?.search))
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, selectedChat?.chat?._id, selectedChat?.search])
    const handleMessageSearch = (e) => {
        dispatch({
            type: MESSAGE_SEARCH_SELECTED,
            payload: {
                search: e.target?.value
            }
        })
    }
    const handleCancelSearch = () => {
        setSearch('')
        if (selectedChat?.chat?._id && selectedChat?.search && auth?.user?.token) {
            dispatch(getMessage(selectedChat?.chat?._id, auth?.user?.token))
        }
        dispatch({
            type: MESSAGE_SEARCH_SELECTED,
            payload: {
                search: ''
            }
        })
    }
    if (groupMessage?.success) {
        toast.success(`${groupMessage?.success}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: SUCCESS_MESSAGE_CLEAR
        })
    }
    if (groupMessage?.error) {
        Object.values(groupMessage?.error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: FAILED_MESSAGE,
                payload: {
                    error: ''
                }
            })
        })
    }
    const handleGroupVideoCall = () => {
        if (!selectedChat?.chat?._id) {
            toast.error(`Invalid Group Video Call try again!`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch({
            type: VIDEO_CALL_MY_INFO,
            payload: {
                userName: auth?.user?.user?.username,
                roomName: selectedChat?.chat?._id,
                profile: auth?.user?.user,
                callType: 'video'
            }
        })
        socket.emit('group calling',{ chat: selectedChat?.chat, callType: 'video' });
        navigate('/group/calling')
    }
    const handleGroupAudioCall = () => {
        if (!selectedChat?.chat?._id) {
            toast.error(`Invalid Group Audio Call try again!`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        dispatch({
            type: VIDEO_CALL_MY_INFO,
            payload: {
                userName: auth?.user?.user?.username,
                roomName: selectedChat?.chat?._id,
                profile: auth?.user?.user,
                callType: 'audio'
            }
        })
        socket.emit('group calling', { chat: selectedChat?.chat, callType: 'audio' });
        navigate('/group/calling')
    }
    return (
        <>
            {selectedChat?.chat?._id && <Box className='chatHeader_section' style={{ paddingBottom: '10px', marginBottom: '5px' }}>
                <Grid container spacing={2} className='header_row'>
                    <Grid item xs={8.5} sx={{ textAlign: 'start' }}>
                        <Grid container spacing={0} alignItems="center">
                            <Grid item xs={6}>
                                <Box className='profile_image'>
                                    <Box sx={{ marginLeft: '15px' }}>
                                        {selectedChat?.loading ? <> <HeaderSkeletonMember /></> : <>
                                            <GroupPeople memberInfo={selectedChat} />
                                        </>}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Tooltip title={'#' + selectedChat?.chat?.chatName} arrow  >
                                    <ToggleButton value="two" style={{ border: 'none' }} onClick={handleGroupInfoOpen}>
                                        {selectedChat?.chat?.chatName}
                                    </ToggleButton>
                                </Tooltip>
                                <GroupInfo groupInfo={selectedChat} groupInfoOpen={groupInfoOpen} setGroupInfoOpen={setGroupInfoOpen} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleGroupInfoClose={handleGroupInfoClose} handleGroupInfoOpen={handleGroupInfoOpen} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3.5}>
                        <ul className='chat_Header_icon'>
                            <Tooltip style={{ cursor: "pointer" }} title="Search" arrow>
                                <li onClick={() => setSearch('search')}>
                                    <SearchIcon />
                                </li>
                            </Tooltip>
                            <Tooltip style={{ cursor: "pointer" }} title="Audio Call" arrow>
                                <li onClick={() => setAudioOpen(true)}><LocalPhoneIcon />
                                </li>
                            </Tooltip>
                            <Tooltip style={{ cursor: "pointer" }} title="Video Call" arrow>
                                <li onClick={() => setVideoOpen(true)}><VideocamIcon />
                                </li>
                            </Tooltip>
                            <div className='ancor'>
                                {selectedChat?.chat?._id ? <MoreHorizIcon id={id} onClick={handleClick} /> : <MoreHorizIcon></MoreHorizIcon>}
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Typography sx={{ pb: 1, pt: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

                                        <span style={{ paddingRight: '8px' }}>Group Invite</span>
                                        <GroupInvite groupInviteOpen={groupInviteOpen} setGroupInviteOpen={setGroupInviteOpen} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleGroupInvite={handleGroupInvite} handleGroupInviteClose={handleGroupInviteClose} />
                                        <FcInvite onClick={handleGroupInvite} />
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ pb: 1, pt: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <span style={{ paddingRight: '8px' }}>Add Member</span>
                                        <GroupAllMemberSearch addMemberOpen={addMemberOpen} setAddMemberOpen={setAddMemberOpen} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleAddMemberOpen={handleAddMemberOpen} handleAddMemberClose={handleAddMemberClose} />
                                        <MdPersonAddAlt1 onClick={handleAddMemberOpen} style={{ color: '#d1c4e6' }} />
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ pb: 1, pt: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <span style={{ paddingRight: '8px' }}>Group Update</span>
                                        <UpdateGroup groupInfo={selectedChat} groupOpen={groupOpen} handleGroupClose={handleGroupClose} />
                                        <FcDataBackup onClick={handleGroupOpen} style={{ color: '#d1c4e6' }} />
                                    </Typography>
                                    <Divider />
                                    <Typography sx={{ pb: 1, pt: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <span style={{ paddingRight: '8px' }}> Group Delete</span>
                                        <GroupAlertShow setAlertOpenGroup={setAlertOpenGroup} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleAlertOpenGroup={handleAlertOpenGroup} handleAlertCloseGroup={handleAlertCloseGroup} alertOpenGroup={alertOpenGroup} />
                                        <Delete style={{ color: '#d1c4e9' }} onClick={handleAlertOpenGroup} />
                                    </Typography>
                                    <Divider />

                                    <Typography sx={{ pb: 1, pt: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <span style={{ paddingRight: '8px' }}> All Conversion</span>
                                        <AlertShow setAlertOpen={setAlertOpen} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleAlertOpen={handleAlertOpen} handleAlertClose={handleAlertClose} alertOpen={alertOpen} />
                                        <FcDeleteDatabase onClick={handleAlertOpen} />
                                    </Typography>
                                </Popover>
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
                            </div>
                        </ul>
                    </Grid>
                    {
                        search === 'search' && <div className={search === 'search' ? 'chat-search visible-chat transform' : 'chat-search visible-chat transform'}>
                            <div className="search_form">
                                <SearchIcon />
                                <input onChange={(e) => handleMessageSearch(e)} type="text" style={{ color: 'darkcyan', border: 'none' }} name="chat-search" placeholder="Conversations Search.." className="form-control" />
                                <Cancel style={{ position: "relative", left: '-10px' }} onClick={handleCancelSearch} />
                            </div>
                        </div>
                    }
                    <AudioCall audioOpen={audioOpen} handleGroupAudioCall={handleGroupAudioCall} setAudioOpen={setAudioOpen} />
                    <VideoCall chatName={selectedChat} handleGroupVideoCall={handleGroupVideoCall} videoOpen={videoOpen} setVideoOpen={setVideoOpen} />
                </Grid>
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
            </Box>}
        </>
    );
};

export default Header;