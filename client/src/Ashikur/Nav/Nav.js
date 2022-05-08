import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from '@mui/icons-material/Logout';
import MessageIcon from "@mui/icons-material/Message";
import {  Grid, ToggleButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeSelectContext } from "../../App";
import AddGroups from "../../components/AddGroups/AddGroups";
import MessageNotificationBadge from "../../components/Notification/MsgNotificationBadge";
import { AUTH_SUCCESS } from "../../store/type/authType";
import "./nav.css";
import ChatProfile from "../../components/ChatProfile/ChatProfile";

const Nav = ({ handleSingleChat, children }) => {
  const [selected, setSelected] = useState("");
  // const [contactOpen, setContactOpen] = React.useState(false);
  const [groupOpen, setGroupOpen] = React.useState(false);

  // const handleContactOpen = () => setContactOpen(true);
  const handleGroupOpen = () => { setGroupOpen(true) };
  // console.log(groupOpen)
  // const handleContactClose = () => setContactOpen(false);
  const handleGroupClose = () => setGroupOpen(false);

  const { palette } = useContext(ThemeSelectContext);
  const dispatch = useDispatch()
  const theme = palette?.mode;
  const themeMode = () => {
    if (theme === "light") {
      return 'mobile-menu light"';
    }
    if (theme === "dark") {
      return "mobile-menu dark ";
    }
  };
  return (
    <div id="nav-dash">
      <>
        <Grid
          container
          spacing={0}
          className={themeMode()}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <Link to="/">
              <ToggleButton
                value="one"
                onChange={() => {
                  setSelected(selected === "one" ? "" : "one");
                }}
              >
                <LocationOnIcon
                  sx={{
                    transform: "rotate(-55deg)",
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <Link to="/chat">
              <ToggleButton
                value="two"
                onChange={() => {
                  setSelected(selected === "two" ? "" : "two");
                }}
              >
                <MessageIcon
                  sx={{
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            {/* <Link to="/group">
              <ToggleButton
                value="three"
                onChange={() => {
                  setSelected(selected === "three" ? "" : "three");
                }}
              >
                <PeopleIcon
                  sx={{
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link> */}
          </Grid>
          {/* <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          > 
            <Link to="/status">
              <ToggleButton
                value="four"
                onChange={() => {
                  setSelected(selected === "four" ? "" : "four");
                }}
              >
                <ArticleIcon
                  sx={{
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <Link to="/call">
              <ToggleButton
                value="five"
                onChange={() => {
                  setSelected(selected === "five" ? "" : "five");
                }}
              >
                <PhoneIcon
                  sx={{
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link>
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
          > 
            <Link to="/settings">
              <ToggleButton
                value="six"
                onChange={() => {
                  setSelected(selected === "six" ? "" : "six");
                }}
              >
                <SettingsIcon
                  sx={{
                    fontSize: {
                      lg: "25px",
                      md: "15px",
                      sm: "10px",
                      xs: "10px",
                    },
                  }}
                />
              </ToggleButton>
            </Link>
    </Grid>  */}
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <AddGroups
              handleGroupOpen={handleGroupOpen}
              handleGroupClose={handleGroupClose}
              groupOpen={groupOpen}
            ></AddGroups>
            {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
            <ToggleButton value="seven">
              <GroupAddIcon
                onClick={handleGroupOpen}
                sx={{
                  fontSize: {
                    lg: "25px",
                    md: "15px",
                    sm: "10px",
                    xs: "10px",
                  },
                }}
              />
            </ToggleButton>
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            {/* <ToggleButton value="nine">
            <AddContact
              handleContactOpen={handleContactOpen}
              handleContactClose={handleContactClose}
              contactOpen={contactOpen}
            ></AddContact>
            <AddIcon
              onClick={handleContactOpen}
              sx={{
                fontSize: {
                  lg: "25px",
                  md: "15px",
                  sm: "10px",
                  xs: "10px",
                },
              }}
            />
         </ToggleButton> */}
          </Grid>
          {/* <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <Avatar
              alt=""
              style={{ display: "block", margin: "0 auto" }}
              src="https://mui.com/static/images/avatar/3.jpg"
            />
          </Grid> */}
          <Grid
            item
            sx={{
              padding: {
                lg: "8px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <ChatProfile mode={theme} />
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <MessageNotificationBadge handleSingleChat={handleSingleChat} />
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            {children}
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <Tooltip title="Log Out" arrow onClick={() => {
              dispatch({
                type: AUTH_SUCCESS,
                payload: {
                  message: 'Log Out Successfully ',
                  data: ''
                }
              })
              window.localStorage.removeItem('userInfoCurrent')
            }} >
              <LogoutIcon />
            </Tooltip>
          </Grid>
        </Grid>
      </>
    </div>
  );
};

export default Nav;
