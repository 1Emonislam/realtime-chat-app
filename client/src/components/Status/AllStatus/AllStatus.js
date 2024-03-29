import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import React from 'react';
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/actions/authAction";
import RecentStatus from "./RecentStatus";
import ViewedStatus from "./ViewedStatus";

const AllStatus = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut)
  }
    return (
      <div className="chat-box-container">
        <Grid
          container
          spacing={0}
          sx={{
            padding: {
              lg: "25px 20px",
              md: "25px 15px",
              sm: "25px 40px",
              xs: "25px 40px",
            },
          }}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Grid item xs={6}>
            <Typography
              sx={{
                color: "#5A078B",
                fontSize: {
                  lg: 18,
                  md: 18,
                  sm: 16,
                  xs: 14,
                },
                fontWeight: {
                  lg: 700,
                  md: 600,
                  sm: 500,
                  xs: 400,
                },
              }}
              style={{ fontFamily: `"Poppins", sans-serif` }}
              
              component="div"
            >
              STATUS
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            className="headIcon"
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          >
            <button onClick={handleLogOut}className="buttonContact2">SignOut</button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ padding: "6px 0", backgroundColor: "transparent" }}
          >
            <div className="search-field-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Contacts"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </Grid>
        </Grid>
        <Box style={{ paddingLeft: "35px" }}>
          <RecentStatus />
          <ViewedStatus />
        </Box>
      </div>
    );
};

export default AllStatus;