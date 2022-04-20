import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../ChatMiddle.css';
import GroupPeople from './GroupPeople';
import HeaderSkeletonMember from './HeaderSkeleton';
import AllModal from './Modal/AllModal';
const Header = () => {
    const { singleGroupMembers } = useSelector(state => state)
    // console.log(singleGroupMembers)
    const [search, setSearch] = useState('')
    const [open, setOpen] = React.useState(false);
    const [video, setVideo] = React.useState(false);
    const [menuOpen, setMenuOpen] = useState(false)
    const threeDot = () => {
        menuOpen === true ? setMenuOpen(false) : setMenuOpen(true)
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }} className='chatHeader_section'>
                <Grid container spacing={2} className='header_row'>
                    <Grid item xs={6} md={6} sx={{ textAlign: 'start' }}>
                        <Box className='profile_image'>
                            <Box sx={{ marginLeft: '15px' }}>
                                {!singleGroupMembers?.members?.length ? <> <HeaderSkeletonMember /></> : <>
                                {console.log(singleGroupMembers)}
                                    <GroupPeople memberInfo={singleGroupMembers} />
                                </>}
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <ul className='chat_Header_icon'>
                            <li onClick={() => setSearch('search')}>
                                <SearchIcon />
                                <span className="tooltip">Search</span>
                            </li>

                            <li onClick={() => setOpen(true)}><LocalPhoneIcon /><span className="tooltip">Voice Call</span>
                            </li>

                            <li onClick={() => setVideo(true)}><VideocamIcon /><span className="tooltip">Video Call</span>
                            </li>

                            <li>
                                <PersonIcon /><span className="tooltip"> Profile</span>
                            </li>
                            <li onClick={threeDot}>
                                <MoreHorizIcon />
                                <ul className={menuOpen ? 'dropdown-menu displeyBlock' : 'dropdown-menu'} padding={'6px'}>
                                    <li><span>Archive</span><InventoryIcon /></li>
                                    <li><span>Muted</span><VolumeOffIcon /></li>
                                    <li><span>Delete</span><DeleteIcon /></li>
                                </ul>
                            </li>
                        </ul>
                    </Grid>

                    {
                        search === 'search' && <div className={search === 'search' ? 'chat-search visible-chat transform' : 'chat-search visible-chat transform'}>
                            <form>
                                <div className="search_form">
                                    <SearchIcon />
                                    <input type="text" name="chat-search" placeholder="Search Chats" className="form-control" />
                                    <button className='close-btn-chat' onClick={() => setSearch('')}>X</button>
                                </div>
                            </form>
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