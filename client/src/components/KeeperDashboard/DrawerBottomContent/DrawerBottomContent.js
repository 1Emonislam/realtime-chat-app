import AppsIcon from '@mui/icons-material/Apps';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const DrawerBottomContent = () => {
  const { theme } = useSelector(state => state);
  const mode = theme?.theme;
  const textColor = `${mode === 'dark' ? 'white' : 'black'}`;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
          height: "70%",
          color: `${mode === 'dark' ? 'gray' : 'black'}`
        }}
      >
        <NavLink
          to="/dashboard"
          className="drawerLink"
          style={{ display: "flex" }}
        >
          <div style={{ color: textColor }} className="linkItem">
            <h5 style={{ marginLeft: "15px" }}>
              <AppsIcon
                sx={{ mt: "5px", mr: 2 }}
                fontSize="medium"
              />
            </h5>
            <h3 style={{ fontWeight: "400" }}>Dashboard</h3>
          </div>
        </NavLink>
        <NavLink
          to="/chat"
          className="drawerLink"
          style={{ display: "flex" }}
        >
          <div style={{ color: textColor }} className="linkItem">
            <h5 style={{ marginLeft: "15px" }}>
              <ChatIcon
                sx={{ mt: "5px", mr: 2 }}
                fontSize="medium"
              />
            </h5>
            <h3 style={{ fontWeight: "400" }}>Chats</h3>
          </div>
        </NavLink>
        <NavLink
          to="/settings"
          className="drawerLink"
          style={{ display: "flex" }}
        >
          <div style={{ color: textColor }} className="linkItem">
            <h5 style={{ marginLeft: "15px" }}>
              <SettingsIcon
                sx={{ mt: "5px", mr: 2 }}
                fontSize="medium"
              />
            </h5>
            <h3 style={{ fontWeight: "400" }}>Settings</h3>
          </div>
        </NavLink>
      </Box>
    </>
  );
};

export default DrawerBottomContent;