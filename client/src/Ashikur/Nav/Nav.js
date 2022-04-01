import AddIcon from '@mui/icons-material/Add';
import ArticleIcon from '@mui/icons-material/Article';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Grid, ToggleButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSelectContext } from '../../App';
import './nav.css';
const Nav = ({ children }) => {
    const [selected, setSelected] = useState('');
    const { palette } = useContext(ThemeSelectContext);
    const theme = palette?.mode;
    const themeMode = () => {
        if (theme === 'light') {
            return 'mobile-menu light"'
        } if (theme === 'dark') {
            return 'mobile-menu dark '
        }
    }
    return (
        <div id="nav-dash">
            <>
                <Grid container spacing={0} className={themeMode()} justifyContent="center" alignItems="center" textAlign="center">
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="one"
                                onChange={() => {
                                    setSelected(selected === 'one' ? '' : 'one')
                                }}
                            >
                                <LocationOnIcon sx={{
                                    transform: 'rotate(-55deg)', fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="two"
                                onChange={() => {
                                    setSelected(selected === 'two' ? '' : 'two')
                                }}
                            >
                                <MessageIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="three"
                                onChange={() => {
                                    setSelected(selected === 'three' ? '' : 'three')
                                }}
                            >
                                <PeopleIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="four"
                                onChange={() => {
                                    setSelected(selected === 'four' ? '' : 'four')
                                }}
                            >
                                <ArticleIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="five"
                                onChange={() => {
                                    setSelected(selected === 'five' ? '' : 'five')
                                }}
                            ><PhoneIcon sx={{
                                fontSize: {
                                    lg: '25px',
                                    md: '15px',
                                    sm: '10px',
                                    xs: '10px'
                                }
                            }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
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
                                <SettingsIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="seven">
                                {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                                <GroupAddIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Link to='/'>
                            <ToggleButton
                                value="eight">
                                {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                                <AddIcon sx={{
                                    fontSize: {
                                        lg: '25px',
                                        md: '15px',
                                        sm: '10px',
                                        xs: '10px'
                                    }
                                }} />
                            </ToggleButton>
                        </Link>
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        <Avatar alt="" style={{ display: 'block', margin: '0 auto' }} src="https://mui.com/static/images/avatar/3.jpg" />
                    </Grid>
                    <Grid item sx={{
                        padding: {
                            lg: '8px',
                            md: '0px',
                            sm: '0px',
                            xs: '0px'
                        }
                    }} xs={1} md={12}>
                        {children}
                    </Grid>
                </Grid>
            </>
        </div>
    );
};

export default Nav;