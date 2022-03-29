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
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useThemes } from '../../hooks/useThemes';

const Nav = () => {
    const [selected, setSelected] = useState('');
    // const [theme] = useThemes();
    // console.log(theme)
    return (
        <div className={styles.nav}>
            <Box className={styles.singleMenu}>
                <Link to='/'>
                    <ToggleButton
                        style={{backgroundColor:`${selected === 'one' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected === 'one' && 'whiteSmoke'}`, borderRadius:'10px 10px 0px 25px'}}
                        value="one"
                        onChange={()=>{
                            setSelected(selected === 'one' ? '' : 'one')
                        }}
                        >
                        <LocationOnIcon sx={{transform: 'rotate(-55deg)'}} />
                    </ToggleButton>
                </Link>
            </Box>
            <Box className={styles.middleMenus}>
                <Link to='/'>
                    <ToggleButton
                        style={{backgroundColor:`${selected === 'two' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected === 'two' && 'whiteSmoke'}`}}
                        value="two"
                        onChange={()=>{
                            setSelected(selected === 'two' ? '' : 'two')
                        }}
                        >
                        <MessageIcon/>
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        style={{backgroundColor:`${selected === 'three' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected === 'three' && 'whiteSmoke'}`}}
                        value="three"
                        onChange={()=>{
                            setSelected(selected === 'three' ? '' : 'three')
                        }}
                        >
                        <PeopleIcon/>
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        variant='inherit'
                        style={{backgroundColor:`${selected === 'four' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected ==='four' ? 'whiteSmoke' : '#000000'}`}}
                        value="four"
                        onChange={()=>{
                            setSelected(selected === 'four' ? '' : 'four')
                        }}
                        >
                        <ArticleIcon/>
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        style={{backgroundColor:`${selected === 'five' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected === 'five' && 'whiteSmoke'}`}}
                        value="five"
                        onChange={()=>{
                            setSelected(selected === 'five' ? '' : 'five')
                        }}
                        >
                        <PhoneIcon />
                    </ToggleButton>
                </Link>
                <Link to='/'>
                    <ToggleButton
                        style={{backgroundColor:`${selected === 'six' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected ==='six' && 'whiteSmoke'}`}}
                        value="six"
                        onChange={()=>{
                            setSelected(selected === 'six' ? '' : 'six')
                        }}
                        >
                        <SettingsIcon/>
                    </ToggleButton>
                </Link>
            </Box>

            <Box className={styles.bottomMenus}>
                <Link to='/'>
                    <IconButton className={styles.singleMenu} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <GroupAddIcon sx={{fontSize:20}} />
                    </IconButton>
                </Link>
                <Link to='/'>
                    <IconButton className={styles.singleMenu} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <AddIcon sx={{bgcolor:'#ec407a', color:'whiteSmoke', borderRadius:15, fontSize:20, p:0.3,}} />
                    </IconButton>
                </Link>
                <Link to='/'>
                    <IconButton className={styles.singleMenu} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <DarkModeOutlinedIcon sx={{bgcolor:'#304ffe', color:'whiteSmoke', borderRadius:1, fontSize:20, p:0.8,}} />
                    </IconButton>
                </Link>
                <Avatar className={styles.profileAvatar} alt="" src="https://mui.com/static/images/avatar/3.jpg" />
            </Box>
            {/* <Link to='/'>
                <ToggleButton
                     style={{backgroundColor:`${selected === '' ? '#5A078B' : 'rgba(255, 255, 255, 0.26)'}`, color:`${selected && 'whiteSmoke'}`}}
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