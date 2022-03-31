import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Grid, ToggleButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
const Nav = ({ children }) => {
    const [selected, setSelected] = useState('');
    return (
        <div id="nav-dash">
            <Grid container spacing={0} justifyContent="space-around" alignItems="center" textAlign="center">
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    <Link to='/'>
                        <ToggleButton
                            value="one"
                            onChange={() => {
                                setSelected(selected === 'one' ? '' : 'one')
                            }}
                        >
                            <LocationOnIcon sx={{
                                transform: 'rotate(-55deg)', display: {
                                        lg: 'block',
                                        md: 'block',
                                        sm: 'block',
                                        xs: 'block'
                                }
                            }} />
                        </ToggleButton>
                    </Link>
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
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
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
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
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
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
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    <Link to='/'>
                        <ToggleButton
                            value="five"
                            onChange={() => {
                                setSelected(selected === 'five' ? '' : 'five')
                            }}
                        ><PhoneIcon />
                        </ToggleButton>
                    </Link>
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}>
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
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    <Link to='/'>
                        <ToggleButton
                            value="seven">
                            {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                            <GroupAddIcon />
                        </ToggleButton>
                    </Link>
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    <Link to='/'>
                        <ToggleButton
                            value="eight">
                            {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                            <AddIcon sx={{ bgcolor: '#ec407a', color: 'whiteSmoke', borderRadius: 15, p: 0.3, }} />
                        </ToggleButton>
                    </Link>
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    {children}
                </Grid>
                <Grid item sx={{
                    padding: {
                        lg: '8px',
                        md: '5px',
                        sm: '4px',
                        xs: '0px'
                    }
                }}xs={12}>
                    <Avatar alt="" style={{ display: 'block', margin: '10px auto' }} src="https://mui.com/static/images/avatar/3.jpg" />
                </Grid>
            </Grid>
        </div>
    );
};

export default Nav;