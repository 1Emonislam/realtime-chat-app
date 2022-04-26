import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Grid, Popover, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { FAILED_MESSAGE, SUCCESS_MESSAGE_CLEAR } from '../../../../store/type/messageTypes';
import '../ChatMiddle.css';
import AlertShow from './AlertShow';
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
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = () => setAlertOpen(false);
    // console.log(groupMessage?.success,groupMessage?.error)
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
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='chatHeader_section'>
                <Grid container spacing={2} className='header_row'>
                    <Grid item xs={6} md={6} sx={{ textAlign: 'start' }}>
                        <Box className='profile_image'>
                            <Box sx={{ marginLeft: '15px' }}>
                                {!selectedChat?.chat?.members?.length ? <> <HeaderSkeletonMember /></> : <>
                                    {/* {console.log(selectedChat)} */}
                                    <GroupPeople memberInfo={selectedChat} />
                                </>}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ul className='chat_Header_icon'>
                            <Tooltip style={{cursor:"pointer"}} title="Search" arrow>
                                <li onClick={() => setSearch('search')}>
                                    <SearchIcon />
                                </li>
                            </Tooltip>
                            <Tooltip style={{cursor:"pointer"}} title="Audio Call" arrow>
                                <li onClick={() => setAudioOpen(true)}><LocalPhoneIcon />
                                </li>
                            </Tooltip>
                            <Tooltip style={{cursor:"pointer"}} title="Video Call" arrow>
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
                                    <Typography sx={{ py: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                        <span>Delete</span>
                                        <AlertShow setAlertOpen={setAlertOpen} chatId={selectedChat?.chat?._id} token={auth?.user?.token} handleAlertOpen={handleAlertOpen} handleAlertClose={handleAlertClose} alertOpen={alertOpen} />
                                        <MdDelete onClick={handleAlertOpen} />
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
                                <input type="text" name="chat-search" placeholder="Search Chats" className="form-control" />
                                <button className='close-btn-chat' onClick={() => setSearch('')}>X</button>
                            </div>
                        </div>
                    }
                    <AudioCall audioOpen={audioOpen} setAudioOpen={setAudioOpen} />
                    <VideoCall videoOpen={videoOpen} setVideoOpen={setVideoOpen} />
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
            </Box>
        </>
    );
};

export default Header;