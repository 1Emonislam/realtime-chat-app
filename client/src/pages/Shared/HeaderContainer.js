import { Grid, ToggleButton, Typography } from "@mui/material";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

const HeaderContainer = () => {
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
              color: "inherit",
              fontSize: {
                lg: 20,
                md: 20,
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
            gutterBottom
            component="div"
          >
            Chats
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
          <button className="buttonContact2">SignOut</button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ padding: "6px 0", backgroundColor: "#fff" }}
        >
          <div className="search-field-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Contacts"
              style={{ backgroundColor: "#fff" }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeaderContainer;
