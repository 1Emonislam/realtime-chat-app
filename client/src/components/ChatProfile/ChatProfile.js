import React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { Avatar, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import EditProfile from './EditProfile/EditProfile';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';

const ChatProfile = ({ mode }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('userInfoCurrent');
    navigate('/')
  }

  return (
    <Box>
      <Tooltip followCursor title='Profile'>
        <Button aria-describedby={id} onClick={handleClick}>
          <Avatar
            alt=""
            style={{ display: "block", margin: "0 auto" }}
            src="https://mui.com/static/images/avatar/3.jpg"
          />
        </Button>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '150px', p: 2 }}>
          <EditProfile mode={mode} />
          <Profile mode={mode} />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pb: 1,
          }}
            color={mode !== 'dark' ? '#000' : '#fff'}
          >
            <Typography sx={{ fontFamily: 'Poppins' }}>Settings</Typography>
            <Link to='/settings'>
              <SettingsIcon sx={{ fontSize: '20px', color: `${mode !== 'dark' ? '#000' : '#fff'}` }} />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
            <Typography sx={{ fontFamily: 'Poppins' }}>Log Out</Typography>
            <LogoutIcon onClick={handleLogOut} sx={{ fontSize: '20px' }} />
          </Box>
        </Box>
      </Popover >
    </Box >
  );
};

export default ChatProfile;