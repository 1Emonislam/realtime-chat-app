import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallIcon from "@mui/icons-material/Call";

const RecentCallList = (props) => {
    const { name, pic, called, status, videoCall, callMissed} = props.p;

    console.log(props.p);
    return (
      <div className="callListItem">
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} md={2}>
              <img
                src={pic}
                alt=""
                height="45px"
                width="45px"
                style={{ borderRadius: "50px" }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  color: "#5A078B",
                  fontWeight: "bolder",
                  fontSize: "15px",
                  mb: 0.5,
                }}
                style={{ fontFamily: `"Poppins", sans-serif` }}
              >
                {name}
              </Typography>
              {called < 3 ? (
                <Typography
                  sx={{ fontSize: "13px" }}
                  style={{
                    fontFamily: `"Poppins", sans-serif`,
                    color: "green",
                  }}
                >
                  {called} min ago
                </Typography>
              ) : (
                <Typography
                  sx={{ fontSize: "13px" }}
                  style={{ fontFamily: `"Poppins", sans-serif` }}
                >
                  {called} min ago
                </Typography>
              )}
              {/* <Typography
              sx={{ fontSize: "13px" }}
              style={{ fontFamily: `"Poppins", sans-serif` }}
            >
              {called} min ago
            </Typography> */}
            </Grid>
            <Grid item xs={6} md={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  {callMissed === true ? (
                    <CallMissedIcon style={{ color: "red" }} />
                  ) : status === "Outgoing" ? (
                    <CallMadeIcon style={{ color: "green" }} />
                  ) : (
                    <CallReceivedIcon style={{ color: "green" }} />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {videoCall === true ? (
                    <VideoCallIcon style={{ color: "#8345A8" }} />
                  ) : (
                    <CallIcon style={{ color: "#FD6286" }} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
};

export default RecentCallList;