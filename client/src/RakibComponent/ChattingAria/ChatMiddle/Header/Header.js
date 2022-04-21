import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../ChatMiddle.css';
import GroupPeople from './GroupPeople';
import HeaderSkeletonMember from './HeaderSkeleton';
import AllModal from './Modal/AllModal';
import { Tooltip } from '@mui/material'
const Header = () => {
    const { singleGroupMembers } = useSelector(state => state)
    //console.log(singleGroupMembers)
    const [search, setSearch] = useState('')
    const [open, setOpen] = React.useState(false);
    const [video, setVideo] = React.useState(false);
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
                                <li onClick={() => setOpen(true)}><LocalPhoneIcon />
                                </li>
                            </Tooltip>
                            <Tooltip title="Video Call" arrow>
                                <li onClick={() => setVideo(true)}><VideocamIcon />
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
                    {
                        open && <AllModal open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
                    }
                    {
                        video && <AllModal open={open} setOpen={setOpen} video={video} setVideo={setVideo} />
                    }
                </Grid>
            </Box>
        </>
    );
};

export default Header;