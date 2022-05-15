import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../../store/actions/profileAction';

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

  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const { pic } = auth?.user?.user
  useEffect(() => {
    dispatch(getMyProfile(auth.user?.token))
  }, [auth.user?.token, dispatch])

  return (
    <Box>
      <Tooltip followCursor title='Profile'>
        <Button aria-describedby={id} onClick={handleClick}>
          <Avatar
            alt=""
            style={{ display: "block", margin: "0 auto" }}
            // src="https://mui.com/static/images/avatar/3.jpg"
            src={pic}
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

          <Link to='/settings'>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              pb: 1,
            }}
              color={mode !== 'dark' ? '#000' : '#fff'}
            >
              <Typography sx={{ fontFamily: 'Poppins' }}>Settings</Typography>
                <SettingsIcon sx={{ fontSize: '20px', color: `${mode !== 'dark' ? '#000' : '#fff'}` }} />
            </Box>
          </Link>
          <Box onClick={handleLogOut} sx={{cursor:'pointer', display: 'flex', justifyContent: 'space-between', pb: 1 }}>
            <Typography sx={{ fontFamily: 'Poppins' }}>Log Out</Typography>
            <LogoutIcon sx={{ fontSize: '20px' }} />
          </Box>
        </Box>
      </Popover >
    </Box >
  );
};

export default ChatProfile;