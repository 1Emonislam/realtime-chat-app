/* eslint-disable react-hooks/exhaustive-deps */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";
import BlockedUser from "./components/DashBoardSettings/BlockedUser";
import OnLineAndOffLineStatusBar from "./components/DashBoardSettings/OnLineAndOffLineStatusBar";
import ReportUser from "./components/DashBoardSettings/ReportUser";
import SettingAdmob from "./components/DashBoardSettings/SettingAdmob";
import SettingsFirebase from "./components/DashBoardSettings/SettingsFirebase";
import SettingsGeneral from "./components/DashBoardSettings/SettingsGeneral";
import SettingSinch from "./components/DashBoardSettings/SettingSinch";
import Users from "./components/DashBoardSettings/Users";
import GroupInviteAccept from "./components/GroupInviteAccept";
import Archive from "./components/KeeperDashboard/Archive/Archive";
import DashboardLayout from "./components/KeeperDashboard/DashboardLayout/DashboardLayout";
import Notes from "./components/KeeperDashboard/Notes/Notes";
import Pin from "./components/KeeperDashboard/Pin/Pin";
import Trash from "./components/KeeperDashboard/Trash/Trash";
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
import BlockUsers from './pages/Dashboard/BlockUsers/BlockUsers';
import Dashboard from './pages/Dashboard/Dashboard';
import DHome from './pages/Dashboard/DHome/DHome';
import ReportUsers from "./pages/Dashboard/ReportUsers/ReportUsrs";
import AdminDashboardUsers from './pages/Dashboard/Users/Users';
import Home from "./pages/Home/Home";
import { getGroupChatData } from "./store/actions/groupActions";
import { getMessage } from "./store/actions/messageAction";
import { getNotification } from "./store/actions/messageNotificationAction";
import { getMembersPagination, getSelectedChat } from "./store/actions/selectedChatAction";
import { SOCKET_GLOBAL } from "./store/type/socketType";
export const ThemeSelectContext = React.createContext();
export const PaginationContext = React.createContext();
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export default function ToggleColorMode() {
  // const themeColor = document.getElementsByTagName('body')
  // console.log(themeColor)
  const { auth, selectedChat } = useSelector(state => state);
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
    document.body.style.background = "#36393f";
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
  // console.log(groupMessage)
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const [pageUser, setPageUser] = React.useState(1)
  const [countMember, setCountMember] = React.useState(0)
  const [countAdmin, setCountAdmin] = React.useState(0)
  const limitUser = 5;
  const [count, setCount] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const limit = 10;
  const dispatch = useDispatch()
  const [chatActive, setChatActive] = useState(false)
  React.useEffect(() => {
    if (!auth?.user?.user?.email) {
      <Navigate to="/login" replace></Navigate>
    }
  }, [auth?.user?.user?.email])
  const socket = React.useRef();
  const ENDPOINT = "https://chalechat.herokuapp.com/";

  React.useEffect(() => {
    socket.current = io(ENDPOINT, {
      auth: {
        data: auth?.user
      },
      query: auth?.user?.user?._id
    });
    dispatch({
      type: SOCKET_GLOBAL,
      payload: { socket },
    })
    if (auth?.user?.user?._id) {
      socket?.current?.emit("setup", auth?.user?.user);
    }
    return () => { socket.current?.disconnect() };
  }, [auth?.user?.user?.email, dispatch])
  const contextObj = {
    page,
    setPage,
    count,
    setCount,
    limit,
    pageUser,
    setPageUser,
    countMember,
    setCountMember,
    countAdmin,
    setCountAdmin,
    limitUser
  }

  React.useEffect(() => {
    if (selectedChat?.chat?._id) {
      dispatch(getMembersPagination(selectedChat?.chat?._id, auth?.user?.token, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser))
    }
  }, [pageUser, dispatch])
  React.useMemo(() => {
    dispatch(getGroupChatData(auth?.user?.token, 'recent', page, limit, setPage, setCount));
    dispatch(getNotification(auth.user?.token))
  }, [auth.user?.token, page, dispatch])

  const handleSingleChat = (id, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser) => {
    if (id) {
      dispatch(getSelectedChat(id, auth?.user?.token, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser))
      dispatch(getMessage(id, auth?.user?.token))
      dispatch(getNotification(auth.user?.token))
    }
    if (id === selectedChat?.chat?._id) {
      setChatActive(true)
    } else {
      setChatActive(false)
    }
  }
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
                    <Chat handleSingleChat={handleSingleChat} chatActive={chatActive}>
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Chat>
                  }
                ></Route>
                {/* <Route
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
                ></Route> */}
                <Route
                  path="/dashboard"
                  element={
                    <UserDashboard mode={mode} handleSingleChat={handleSingleChat}>
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
                {/* Admin Dashboard */}
                <Route path="admin-dashboard" element={<Dashboard />}>
                  <Route path="" element={<DHome />} />
                  <Route path="users" element={<AdminDashboardUsers />} />
                  <Route path="block-users" element={<BlockUsers />} />
                  <Route path="report-users" element={<ReportUsers />} />
                </Route>
                {/* Keeper Dashboard Start */}
                <Route path="notes" element={<DashboardLayout />}>
                  <Route path="" element={<Notes />} />
                  <Route path="notes" element={<Notes />} />
                  <Route path="archive" element={<Archive />} />
                  <Route path="pin" element={<Pin />} />
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