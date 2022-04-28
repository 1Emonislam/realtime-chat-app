import LockIcon from "@mui/icons-material/Lock";
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const GroupListMap = (props) => {

    const { name, pic, lastMsg, lastMsgBy, isPrivateGroup, time, unreadMsg} = props.p;

    // const handleSingleChat = () => {};
    return (
      <Grid
        item
        xs={12}
        className="user-list"
        alignItems="center"
        justifyContent="center"
      >
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
                {isPrivateGroup === true ? (
                  <Typography
                    sx={{
                      color: "#5A078B",
                      fontWeight: "bolder",
                      fontSize: "16px",
                      mb: 0.5,
                    }}
                    style={{ fontFamily: `"Poppins", sans-serif` }}
                  >
                    #{name} <LockIcon sx={{ fontSize: "14px" }} />
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "#5A078B",
                      fontWeight: "bolder",
                      fontSize: "16px",
                      mb: 0.5,
                    }}
                    style={{ fontFamily: `"Poppins", sans-serif` }}
                  >
                    #{name}
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    {lastMsgBy}:
                  </span>{" "}
                  <span style={{ fontSize: "13px" }}>{lastMsg}</span>
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ mt: 0 }}>
                  <Box item xs={12} md={6}>
                    <Typography style={{ fontSize: "12px", color: "#9f9f9f" }}>
                      {time} min
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "12px",
                        color: "transparent",
                        marginTop: "5px",
                        marginLeft: "10px",
                        backgroundColor: "#5A078B",
                        padding: "6px",
                        width: "15px",
                        borderRadius: "40%"
                      }}
                    >
                      {unreadMsg}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Grid>
    );
};

export default GroupListMap;



// Don't Delete this Comment. I will need this for further work.

// <div
//         style={{ padding: "10px 20px", margin: "0 20px" }}
//         className={toggleActiveStyle(index)}
//         onClick={(e) => handleSingleChat(index, toggleActive(index))}
//       ></div>
//  onClick={(e) => handleSingleChat(id)}