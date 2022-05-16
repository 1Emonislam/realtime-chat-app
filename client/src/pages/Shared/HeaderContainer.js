import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const HeaderContainer = ({ mode }) => {

  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('userInfoCurrent');
    navigate('/')
  }
  return (
    <Box>
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
            color={mode !== 'dark' ? 'inherit' : '#fff'}
            component="div"
          >
          Profile Info
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
          <button style={{ color: 'white' }} onClick={handleLogOut} className="buttonContact2">SignOut</button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ padding: "6px 0" }}
          color={mode !== 'dark' ? 'inherit' : '#fff'}
        >
          <Box className="search-field-box">
            <SearchIcon />
            <Typography component="input"
              type="text"
              placeholder="Search Contacts"
              color={mode !== 'dark' ? 'inherit' : '#fff'}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderContainer;
