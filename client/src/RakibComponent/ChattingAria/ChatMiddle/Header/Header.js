import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Grid, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../ChatMiddle.css';
import GroupPeople from './GroupPeople';
import HeaderSkeletonMember from './HeaderSkeleton';
import AudioCall from './Modal/AudioCall';
import VideoCall from './Modal/VideoCall';
const Header = () => {
    const { singleGroupMembers } = useSelector(state => state)
    //console.log(singleGroupMembers)
    const [search, setSearch] = useState('')
    const [audioOpen, setAudioOpen] = React.useState(false);
    const [videoOpen, setVideoOpen] = React.useState(false);
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='chatHeader_section'>
                <Grid container spacing={2} className='header_row'>
                    <Grid item xs={6} md={6} sx={{ textAlign: 'start' }}>
                        <Box className='profile_image'>
                            <Box sx={{ marginLeft: '15px' }}>
                                {!singleGroupMembers?.members?.length ? <> <HeaderSkeletonMember /></> : <>
                                    {/* {console.log(singleGroupMembers)} */}
                                    <GroupPeople memberInfo={singleGroupMembers} />
                                </>}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ul className='chat_Header_icon'>
                            <Tooltip title="Search" arrow>
                                <li onClick={() => setSearch('search')}>
                                    <SearchIcon />
                                </li>
                            </Tooltip>
                            <Tooltip title="Audio Call" arrow>
                                <li onClick={() => setAudioOpen(true)}><LocalPhoneIcon />
                                </li>
                            </Tooltip>
                            <Tooltip title="Video Call" arrow>
                                <li onClick={() => setVideoOpen(true)}><VideocamIcon />
                                </li>
                            </Tooltip>
                            <Tooltip title="More Action" arrow>
                                <MoreHorizIcon />
                            </Tooltip>
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
            </Box>
        </>
    );
};

export default Header;