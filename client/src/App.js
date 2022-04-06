import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatHome from './components/ChatHome';
import { ThemeSwitch } from './hooks/useThemes';
import Chat from './pages/Auth/Chat/Chat';
import ForgetPassword from './pages/Auth/ForgetPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import Home from './pages/Home/Home';
export const ThemeSelectContext = React.createContext();
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState(JSON.parse(window.localStorage.getItem("theme")));
  if (!mode) {
    window.localStorage.setItem("theme", JSON.stringify(mode === 'light' ? 'dark' : 'light'))
  }
  if (mode === 'light') {
    document.body.style.background = '#fefefe';

  } if (mode === 'dark') {
    document.body.style.background = ' #111';
  }
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        window.localStorage.setItem("theme", JSON.stringify(mode === 'light' ? 'dark' : 'light'))
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeSelectContext.Provider value={theme}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRadius: 1,
              width: "100%",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Chat>
                  {/* <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}
                  <ThemeSwitch onClick={colorMode.toggleColorMode} style={{ fontSize: '20px' }} checked={!(theme.palette.mode === 'light')} />
                </Chat>}></Route>
                <Route path="/home" element={<Home />}> </Route>
                <Route path="/login" element={<Login />}> </Route>
                <Route path="/chat-child" element={<ChatHome />}> </Route>
                <Route path="/forget-password" element={<ForgetPassword />}> </Route>
                <Route path="/reset-password" element={<ResetPassword />}> </Route>
                <Route path="/register" element={< Register />}> </Route>
                <Route path="*" element={<><h2> Not Founds</h2> </>}> </Route>
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </ThemeSelectContext.Provider>
    </ColorModeContext.Provider>
  );
}