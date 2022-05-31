import AppsIcon from '@mui/icons-material/Apps';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MessageIcon from "@mui/icons-material/Message";
import { Grid, ToggleButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeSelectContext } from "../../App";
import AddGroups from "../../components/AddGroups/AddGroups";
import ChatProfile from "../../components/ChatProfile/ChatProfile";
import MessageNotificationBadge from "../../components/Notification/MsgNotificationBadge";
import "./nav.css";

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
  // const dispatch = useDispatch()
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
    <div id="nav-dash" style={{ display: 'flex', alignContent: 'space-between' }}>
      <>
        <Grid
          container
          spacing={0}
          className={themeMode()}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        // sx={{alignContent:'space-around'}}
        >
          <Tooltip followCursor title='Home' arrow>
            <Grid
              item
              sx={{
                padding: {
                  lg: "6px",
                  md: "0px",
                  sm: "0px",
                  xs: "0px",
                }
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
                  <HomeIcon
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
          </Tooltip>
          <Tooltip followCursor title='Dashboard' arrow>
            <Grid
              item
              sx={{
                padding: {
                  lg: "6px",
                  md: "0px",
                  sm: "0px",
                  xs: "0px",
                },
                mt: { md: -4 }
              }}
              xs={1}
              md={12}
            >
              <Link to="/dashboard">
                <ToggleButton
                  value="one"
                  onChange={() => {
                    setSelected(selected === "one" ? "" : "one");
                  }}
                >
                  <AppsIcon
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
          </Tooltip>
          <Grid
            item
            sx={{
              padding: {
                lg: "6px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
              my: { md: -5 }
            }}
            xs={1}
            md={12}
          >
            <Tooltip followCursor title='Chat' arrow>
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
            </Tooltip>
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
              mt: { md: -4 }
            }}
            xs={1}
            md={12}
          >
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
              mt: { md: -3.5 }
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
            <Tooltip followCursor title='Create Group' arrow>
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
            </Tooltip>
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
              mt: { md: -4 }
            }}
            xs={1}
            md={12}
          >
            <AddGroups
              handleSingleChat={handleSingleChat}
              handleGroupOpen={handleGroupOpen}
              handleGroupClose={handleGroupClose}
              groupOpen={groupOpen}
            ></AddGroups>
            {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
            <Tooltip followCursor title='Notes' arrow>
              <span onClick ={() =>{
                window.location.replace('/keeper')
              }}>
                <ToggleButton value="seven">
                  <LibraryAddIcon
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
              </span>
            </Tooltip>
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
              mb: { md: 15 }
            }}
            xs={1}
            md={12}
          >
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
            <Link to="/chat"> <MessageNotificationBadge handleSingleChat={handleSingleChat} /></Link>
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
                lg: "8px",
                md: "0px",
                sm: "0px",
                xs: "0px",
              },
            }}
            xs={1}
            md={12}
          >
            <ChatProfile handleSingleChat={handleSingleChat} mode={theme} />
          </Grid>
        </Grid>
      </>
    </div >
  );
};

export default Nav;
