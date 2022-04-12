import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditRoadIcon from '@mui/icons-material/EditRoad';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  Tab,
  Tabs, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
// import { ThemeSelectContext } from "./../../../App";
import styles from "./../../../Ashikur/AboutPage/AboutPage.module.scss";
import "./../../../components/__Container.css";
// switch Button

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

// const memberData = [
//   {
//     name: "Brala",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Shaun",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Jams",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Wolder",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Messi",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Lewis",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Smith",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "LLook",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Alexandar",
//     status: "At Work",
//     isAdmin: false,
//   },
//   {
//     name: "Dickerson",
//     status: "At Work",
//     isAdmin: false,
//   },
// ];

//   switch button functionality end

const GroupInfo = () => {
  const [value, setValue] = useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { palette } = useContext(ThemeSelectContext);
  // const theme = palette?.mode;
  return (
    <div className="current-user-about">
      <Box className={styles.mainAboutSection}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         ssss <Typography
            sx={{
              color: "#5A078B",
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: `"Poppins", sans-serif`,
            }}
            variant="subtitle2"
            gutterBottom
            component="div"
          >
            Group Details
          </Typography>
          <IconButton sx={{ p: 0 }} aria-label="Example">
            {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
            <CloseIcon
              sx={{
                bgcolor: "#ec407a",
                color: "whiteSmoke",
                borderRadius: 15,
                fontSize: 18,
                p: 0.3,
              }}
            />
          </IconButton>
        </Box>
        <Box className={styles.aboutSection}>
          <img
            className={styles.profileImage}
            src="https://dreamschat-reactjs.dreamguystech.com/template2/c1bef1fe26f16d517d297b0c1b528a87.jpg"
            alt=""
          />
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#5A078B",
              fontFamily: `"Poppins", sans-serif`,
            }}
          >
            #Tech Support
          </Typography>
          <Typography
            sx={{
              marginTop: 1,
              marginLeft: 2,
              fontFamily: `"Poppins", sans-serif`,
              fontSize: "13.5px",
            }}
            variant="caption"
            gutterBottom
            component="div"
          >
            Created on 25/02/2020
          </Typography>
          <Box style={{ cursor: "alias" }}>
            <Typography
              sx={{
                marginTop: 1,
                marginLeft: 2,
                fontFamily: `"Poppins", sans-serif`,
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#6d6d6d",
              }}
              variant="caption"
              gutterBottom
              component="div"
            >
              <EditRoadIcon sx={{ color: "#ee00ab", fontSize: "15px" }} /> Edit
              Group
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab
              sx={{ fontSize: 12, fontWeight: 700 }}
              value="one"
              label="ABOUT"
            />
            <Tab
              sx={{ fontSize: 12, fontWeight: 700 }}
              value="two"
              label="MEDIA"
            />
          </Tabs>
        </Box>
        {value === "one" ? (
          <Box sx={{ mt: 3 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "21px",
                color: "#939393",
                fontFamily: `"Poppins", sans-serif`,
              }}
              variant="subtitle2"
              gutterBottom
              component="div"
            >
              If several languages coalesce, the grammar of the resulting
              language is more simple and regular than that of the individual.
            </Typography>
            
           
          
        
            <Typography
              sx={{ mt: 3 }}
              className={styles.subtitles}
              variant="subtitle2"
              gutterBottom
              component="div"
            >
              Settings
            </Typography>
            <Box sx={{ml: 2}}>
              <FormGroup>
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  label="Block"
                />
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  label="Mute"
                />
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  label="Get notification"
                />
              </FormGroup>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={1}>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
              <Grid sx={{ position: "relative" }} item xs={6}>
                <img
                  style={{ width: "100%", height: "100px" }}
                  src="https://i.ibb.co/cXGVxJP/product-9.jpg"
                  alt=""
                />
                <Box
                  sx={{
                    display: "flex",
                    position: "absolute",
                    right: 2,
                    bottom: 8,
                  }}
                >
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <CloudDownloadIcon
                      sx={{
                        fontSize: 20,
                        zIndex: 5,
                        color: "white",
                        marginRight: 1,
                      }}
                    />
                  </IconButton>
                  <IconButton sx={{ p: 0 }} aria-label="Example">
                    <MoreHorizIcon
                      sx={{ fontSize: 20, zIndex: 5, color: "white" }}
                    />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
            <Link to="">
              <Typography
                sx={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 1,
                  textAlign: "center",
                }}
                variant="subtitle2"
                gutterBottom
                component="div"
              >
                Report Chat{" "}
                <span>
                  <ArrowDropDownIcon />
                </span>
              </Typography>
            </Link>
          </Box>
        )}

       
      </Box>
    </div>
  );
};

export default GroupInfo;
