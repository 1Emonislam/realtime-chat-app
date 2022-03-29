import React, { useState } from 'react';
import styles from './nav.module.scss';
import { Avatar, Box, IconButton, ToggleButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import './nav.css'
const Nav = ({ children }) => {
    const [selected, setSelected] = useState('');
    return (
        <div className={styles.nav} id="nav-dash">
            <Box className={styles.singleMenu}>
                <Link to='/'>
                    <ToggleButton
                        value="one"
                        onChange={() => {
                            setSelected(selected === 'one' ? '' : 'one')
                        }}
                    >
                        <LocationOnIcon sx={{ transform: 'rotate(-55deg)' }} />
                    </ToggleButton>
                </Link>
            </Box>
            <Box className={styles.middleMenus}>
                <Link to='/'>
                    <ToggleButton
                        value="two"
                        onChange={() => {
                            setSelected(selected === 'two' ? '' : 'two')
                        }}
                    >
                        <MessageIcon />
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        value="three"
                        onChange={() => {
                            setSelected(selected === 'three' ? '' : 'three')
                        }}
                    >
                        <PeopleIcon />
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        value="four"
                        onChange={() => {
                            setSelected(selected === 'four' ? '' : 'four')
                        }}
                    >
                        <ArticleIcon />
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        value="five"
                        onChange={() => {
                            setSelected(selected === 'five' ? '' : 'five')
                        }}
                    ><PhoneIcon />
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        value="six"
                        onChange={() => {
                            setSelected(selected === 'six' ? '' : 'six')
                        }}
                    >
                        <SettingsIcon />
                    </ToggleButton>
                </Link>
            </Box>

            <Box className={styles.bottomMenus}>
                <Link to='/'>
                    <IconButton className={styles.singleMenu} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <GroupAddIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Link>
                <Link to='/'>
                    <IconButton className={styles.singleMenu} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <AddIcon sx={{ bgcolor: '#ec407a', color: 'whiteSmoke', borderRadius: 15, fontSize: 20, p: 0.3, }} />
                    </IconButton>
                </Link>

                <Link to='/'>
                    {children}
                </Link>
                <Avatar className={styles.profileAvatar} alt="" src="https://mui.com/static/images/avatar/3.jpg" />
            </Box>
            {/* <Link to='/'>
                <ToggleButton
                     style={{backgroundColor:`${selected === '' ? '#5A078B' : ''}`, color:`${selected && 'whiteSmoke'}`}}
                    value="one"
                    onChange={()=>{
                        setSelected(selected === '' ? '' : '')
                    }}
                    >
                    
                </ToggleButton>
            </Link> */}
        </div>
    );
};

export default Nav;