import { Box } from '@mui/system';
import '../GroupChatMiddle.css'
import React, { useState } from 'react';
import chatImg from '../../../../../assets/images/avatar-8.jpg'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AllModal from './Modal/AllModal';
import InventoryIcon from '@mui/icons-material/Inventory';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';

const Header = () => {
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
                            <Box className='image_div'>
                                <img src={chatImg} alt="profile" />
                            </Box>
                            <Box sx={{ marginLeft: '15px' }}>
                                <h4 className="hedding_4">Doris Brown</h4>
                                <span className='online'>Online</span>
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