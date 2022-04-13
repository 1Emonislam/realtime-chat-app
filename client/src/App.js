import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Call from "./components/Call/Call";
import ChatHome from "./components/ChatHome";
import DashBoardHome from "./components/DashBoardSettings/DashBoardHome";
import OnLineAndOffLineStatusBar from "./components/DashBoardSettings/OnLineAndOffLineStatusBar";
import SettingAdmob from "./components/DashBoardSettings/SettingAdmob";
import SettingsFirebase from "./components/DashBoardSettings/SettingsFirebase";
import SettingsGeneral from "./components/DashBoardSettings/SettingsGeneral";
import SettingSinch from "./components/DashBoardSettings/SettingSinch";
import Group from "./components/Group/Group";
import Settings from "./components/Settings/Settings/Settings";
import Status from "./components/Status/Status/Status";
import { ThemeSwitch } from "./hooks/useThemes";
import ChangePassword from "./pages/Auth/ChangePassword";
import Chat from "./pages/Auth/Chat/Chat";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home/Home";
export const ThemeSelectContext = React.createContext();
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState(
    JSON.parse(window.localStorage.getItem("theme"))
  );
  if (!mode) {
    window.localStorage.setItem(
      "theme",
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
          "theme",
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeSelectContext.Provider value={theme}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
              width: "100%",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route
                  path="/chat"
                  element={
                    <Chat>
                      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
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
                      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Group>
                  }
                ></Route>
                <Route
                  path="/call"
                  element={
                    <Call>
                      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Call>
                  }
                ></Route>
                <Route
                  path="/settings"
                  element={
                    <Settings>
                      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
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
                      {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
                      <ThemeSwitch
                        onClick={colorMode.toggleColorMode}
                        style={{ fontSize: "20px" }}
                        checked={!(theme.palette.mode === "light")}
                      />
                    </Status>
                  }
                ></Route>
                <Route path="/home" element={<Home />}>
                  {" "}
                </Route>
                <Route path="/login" element={<Login />}>
                  {" "}
                </Route>
                <Route path="/chat-child" element={<ChatHome />}>
                  {" "}
                </Route>
                <Route path="/forget-password" element={<ForgetPassword />}>
                  {" "}
                </Route>
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                >
                  {" "}
                </Route>
                <Route path="/change-password" element={<ChangePassword />}>
                  {" "}
                </Route>
                <Route path="/register" element={<Register />}>
                  {" "}
                </Route>
                {/* Dashboard  start*/}
                <Route path="/general-setting" element={< SettingsGeneral/>}> </Route>
                <Route path="/admob-setting" element={< SettingAdmob />}> </Route>
                <Route path="/snich-setting" element={< SettingSinch />}> </Route>
                <Route path="/firebase-setting" element={< SettingsFirebase />}> </Route>
                <Route path="/dashboard" element={< DashBoardHome />}> </Route>
                <Route path="/online" element={< OnLineAndOffLineStatusBar />}> </Route>
                {/* dashboard end */}
                <Route
                  path="*"
                  element={
                    <>
                      <h2> Not Founds</h2>{" "}
                    </>
                  }
                >
                  {" "}
                </Route>
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </ThemeSelectContext.Provider>
    </ColorModeContext.Provider>
  );
}
