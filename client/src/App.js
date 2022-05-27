/* eslint-disable react-hooks/exhaustive-deps */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '././socket';
import "./App.css";
import Call from "./components/Call/Call";
import BlockedUser from "./components/DashBoardSettings/BlockedUser";
import Media from "./components/DashBoardSettings/Media";
import OnLineAndOffLineStatusBar from "./components/DashBoardSettings/OnLineAndOffLineStatusBar";
import ReportUser from "./components/DashBoardSettings/ReportUser";
import SettingAdmob from "./components/DashBoardSettings/SettingAdmob";
import SettingsFirebase from "./components/DashBoardSettings/SettingsFirebase";
import SettingsGeneral from "./components/DashBoardSettings/SettingsGeneral";
import SettingSinch from "./components/DashBoardSettings/SettingSinch";
import Users from "./components/DashBoardSettings/Users";
import Group from "./components/Group/Group";
import GroupInviteAccept from "./components/GroupInviteAccept";
import Archive from "./components/KeeperDashboard/Archive/Archive";
import DashboardLayout from "./components/KeeperDashboard/DashboardLayout/DashboardLayout";
import Notes from "./components/KeeperDashboard/Notes/Notes";
import Trash from "./components/KeeperDashboard/Trash/Trash";
import Main from "./components/Main/Main";
import AudioRoom from "./components/Room/AudioRoom";
import Room from "./components/Room/Room";
import Settings from "./components/Settings/Settings/Settings";
import Status from "./components/Status/Status/Status";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { ThemeSwitch } from "./hooks/useThemes";
import ChangePassword from "./pages/Auth/ChangePassword";
import Chat from "./pages/Auth/Chat/Chat";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from './pages/Dashboard/Dashboard';
import DHome from './pages/Dashboard/DHome/DHome';
import Home from "./pages/Home/Home";
import { getGroupChatData } from "./store/actions/groupActions";
import { getNotification } from "./store/actions/messageNotificationAction";
import { VIDEO_CALL_MY_INFO } from "./store/reducers/callReducer";

export const ThemeSelectContext = React.createContext();
export const PaginationContext = React.createContext();
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export default function ToggleColorMode() {
  const { auth,groupMessage } = useSelector(state => state);
  const [mode, setMode] = React.useState(
    window.localStorage.getItem("themeCurrent") ? JSON.parse(window.localStorage.getItem("themeCurrent")) : 'light');
  if (!mode) {
    window.localStorage.setItem(
      "themeCurrent",
      JSON.stringify(mode === "light" ? "dark" : "light")
    );
  }
  if (mode === "light") {
    document.body.style.background = "#fefefe";
  }
  if (mode === "dark") {
    document.body.style.background = " #111";
  }
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem(
          "themeCurrent",
          JSON.stringify(mode === "light" ? "dark" : "light")
        );
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const [count, setCount] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const limit = 10;
  const dispatch = useDispatch()
  const contextObj = {
    page,
    setPage,
    count,
    setCount,
    limit
  }

  React.useMemo(() => {
    dispatch(getGroupChatData(auth?.user?.token, 'recent', page, limit, setPage, setCount));
    dispatch(getNotification(auth.user?.token))
  }, [auth.user?.token, page, dispatch, groupMessage?.sendMsg?._id])
  useEffect(() => {
    if (!socket) return
    if (auth?.user?.user?._id) {
      socket?.emit("setup", auth?.user?.user);
    }
  }, [auth?.user?.user?._id])
  useEffect(() => {
    const handleClose = () => {
      toast.dismiss()
    }
    socket?.off('group calling recieved').on('group calling recieved', (singnal) => {
      dispatch({
        type: VIDEO_CALL_MY_INFO,
        payload: {
          userName: auth?.user?.user?.username,
          roomName: singnal?.chat,
          profile: auth?.user?.user,
          callType: singnal.callType
        }
      })
      toast(<div style={{ padding: '40px 5px' }}>
        <img className="videoCall" style={{ width: '50px', height: '50px', borderRadius: '50px', margin: 'auto', display: 'block' }} src={singnal.img} alt={singnal.chatName} /> <br />
        <h4> {singnal?.chatName}</h4>
        <span>{singnal.callType} Calling...</span>
        <br />
        <br />
        <Link to="/group/calling" style={{ padding: '7px', marginRight: '5px', borderRadius: '5px', background: 'green', color: 'white' }}> Answer </Link> <span onClick={handleClose} style={{ padding: '7px 10px', border: 'none', borderRadius: '5px', background: 'red', color: 'white' }} > Declined</span>
      </div>, {
        position: "top-right",
        theme: theme?.theme,
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  })
  return (
    <ColorModeContext.Provider value={colorMode} sx={{
      bgcolor: "background.default",
      color: "text.default",
      borderRadius: 1,
      width: "100%",
    }}>
      <ThemeSelectContext.Provider value={theme}>
        <PaginationContext.Provider value={contextObj}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login mode={mode} />}>
                </Route>
                <Route path="/forget-password" element={<ForgetPassword />}>
                </Route>
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                > </Route>
                <Route path="/change-password" element={<ChangePassword />}>
                </Route>
                <Route path="/register" element={<Register mode={mode} />}>
                </Route>
                {/* private page start */}
                <Route
                  path="/chat"
                  element={
                    <Chat>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Chat>
                  }
                ></Route>
                <Route
                  path="/group"
                  element={
                    <Group>

                    </Group>
                  }
                ></Route>
                <Route
                  path="/call"
                  element={
                    <Call>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Call>
                  }
                ></Route>
                <Route
                  path="/dashboard"
                  element={
                    <UserDashboard mode={mode}>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </UserDashboard>
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={
                    <Settings mode={mode}>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Settings>
                  }
                ></Route>
                <Route
                  path="/status"
                  element={
                    <Status>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Status>
                  }
                ></Route>
                {/* Dashboard  start*/}
                <Route path="/group/calling" element={<Main></Main>} />
                <Route path="/videoCall/:roomId" element={<Room></Room>} />
                <Route path="/audioCall/:roomId" element={<AudioRoom></AudioRoom>} />
                <Route path="/group/invite/:token" element={<GroupInviteAccept />}> </Route>
                <Route path="/general-setting" element={< SettingsGeneral />}> </Route>
                <Route path="/admob-setting" element={< SettingAdmob />}> </Route>
                <Route path="/snich-setting" element={< SettingSinch />}> </Route>
                <Route path="/firebase-setting" element={< SettingsFirebase />}> </Route>
                {/* <Route path="/dashboard" element={< DashBoardHome />}> </Route> */}
                <Route path="/online" element={< OnLineAndOffLineStatusBar />}> </Route>
                <Route path="/users" element={< Users />}> </Route>
                <Route path="/blockusers" element={< BlockedUser />}> </Route>
                <Route path="/report" element={< ReportUser />}> </Route>
                <Route path="/media" element={< Media />}> </Route>
                {/* Admin Dashboard */}
                <Route path="admin-dashboard" element={<Dashboard />}>
                  <Route path="" element={<DHome />} />
                </Route>
                {/* Keeper Dashboard Start */}
                <Route path="keeper" element={<DashboardLayout />}>
                  <Route path="" element={<Notes />} />
                  <Route path="notes" element={<Notes />} />
                  <Route path="archive" element={<Archive />} />
                  <Route path="trash" element={<Trash />} />
                </Route>
                {/* Keeper Dashboard End */}
                <Route
                  path="*"
                  element={
                    <> <h2> Not Found</h2></>
                  }>
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider >
        </PaginationContext.Provider>
      </ThemeSelectContext.Provider >
    </ColorModeContext.Provider >
  );
}
