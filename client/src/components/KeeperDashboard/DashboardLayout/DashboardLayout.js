import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Drawer, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import logo from '../../../assets/logo/white_large.png';
import { getActinByNotes } from "../../../store/actions/noteAction";
import ChatProfile from "../../ChatProfile/ChatProfile";
import DrawerContent from "../DrawerContent/DrawerContent";
import useMediaQuery from "../useMediaQuery/useMediaQuery";
import "./DashboardLayout.css";

const drawerWidth = 220;
function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width: 780px)");
  const [sideBarOpen, setSideBarOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { auth, theme } = useSelector(state => state)
  const mode = theme?.theme;
  const [search, setSearch] = React.useState('')
  const handleDrawerOpen = () => {
    setSideBarOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
  };

  React.useEffect(() => {
    if (isDesktop) {
      handleDrawerOpen();
    } else {
      handleDrawerClose();
    }
  }, [isDesktop]);
  React.useEffect(() => {
    dispatch(getActinByNotes(1, 10, auth?.user?.token, search))
  }, [auth?.user?.token, dispatch, search])
  console.log(search)
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#79a3b1",
          py: 1
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {!isDesktop && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={sideBarOpen ? handleDrawerClose : handleDrawerOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          )}

          {isDesktop && (
            <Box sx={{ mr: 2 }}>
              <Link to='/'>
                <Typography sx={{ width: '120px', height: '30px' }} component='img' src={logo} />
              </Link>
            </Box>
          )}
          <form>
            <div className="searchBg">
              <SearchIcon
                className="searchIconStyle"
                sx={{ color: "#6d6d6d", fontSize: "25px" }}
              />
              <input
                type="text"
                className="NavSearchInput"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* -- Color box component -- */}
                <div
                  style={{
                    color: "#6d6d6d",
                    fontSize: "25px",
                    marginBottom: "-10px",
                  }}
                >

                </div>

                <CloseIcon
                  type="reset"
                  className="searchIconStyle"
                  sx={{ color: "#6d6d6d", fontSize: "25px" }}
                />
              </div>
            </div>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              width: "20%",
              marginLeft: "auto",
            }}
          >
          </div>
          <ChatProfile mode={mode} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            height: "100vh",
            mt: 10,
            border: 0,
            boxShadow: "0px 5px 8px gray",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideBarOpen}
      >
        <Box onClick={isDesktop ? "" : handleDrawerClose}>
          <DrawerContent mode={mode} />
        </Box>
      </Drawer>

      <Box
        className={isDesktop && "drawerOpen"}
        component="main"
        sx={{ minHeight: "100vh", position: "relative" }}
        onClick={isDesktop ? "" : handleDrawerClose}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
}

export default DashboardLayout;
