import React from "react";
import { Box, Grid, ToggleButton, Typography } from "@mui/material";

const ViewedStatuses = (props) => {
  const { name, pic, status } = props.p;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2.5}>
          <img
            src={pic}
            alt=""
            height="45px"
            width="45px"
            style={{ borderRadius: "50px" }}
          />
        </Grid>
        <Grid item xs={12} md={8.5}>
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
          <Typography
            sx={{ fontSize: "13px" }}
            style={{ fontFamily: `"Poppins", sans-serif` }}
          >
            {status}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewedStatuses;
