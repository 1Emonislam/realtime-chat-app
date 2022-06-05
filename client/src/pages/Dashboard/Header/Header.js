import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dreams_sm from '../../../assets/images/dream-sm.png';
import toggler from '../../../assets/images/toggle.png';
import logo from '../../../assets/logo/footer-logo.png';
import ChatProfile from '../../../components/ChatProfile/ChatProfile';


const Header = ({ selected, setSelected }) => {

    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/')
    }

    const mode = JSON.parse(localStorage.getItem("themeCurrent"))

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff',
            px: 4,
            py: 2,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box onClick={handleHome}>
                    {
                        selected && <Typography sx={{ height: '30px', cursor: 'pointer' }} component='img' src={logo} />
                    }
                    {
                        !selected && <Typography sx={{ height: '50px', cursor: 'pointer' }} component='img' src={dreams_sm} />
                    }
                </Box>
                <Box sx={{ px: 2 }}>
                    <Typography onClick={() => setSelected(!selected)} sx={{ width: '30px', height: '30px', cursor: 'pointer' }} component='img' src={toggler} />
                </Box>
                {/* <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '20px', background: '#f1f3f8', boxShadow: 'none' }}
                >
                    <IconButton type="submit" sx={{ p: '10px', }} aria-label="search">
                        <SearchIcon style={{ color: 'rgb(0 0 0 / 54%)' }} />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, color: 'rgb(0 0 0 / 54%)' }}
                        placeholder="Search Here"
                        inputProps={{ 'aria-label': 'search here' }}
                    />

                </Paper> */}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* notification  */}
                {/* <Notification /> */}

                {/* profile  */}
                {/* <Profile /> */}
                <Box style={{ paddingLeft: '20px' }}>
                    <ChatProfile mode={mode} />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;