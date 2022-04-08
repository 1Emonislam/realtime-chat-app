import { Box, Typography } from '@mui/material';
import React from 'react';
import MapIcon from "@mui/icons-material/Map";

const ExpandStatus = () => {
    return (
      <Box sx={{ p: 5 }}>
        <Box
          style={{
            textAlign: "center",
            justifyContent: "center",
            marginTop: "20%",
          }}
        >
          <Box>
            <MapIcon sx={{ fontSize: "150px", color: "#5A078B" }} />
          </Box>
          <Box>
            <Typography style={{fontFamily: `"Poppins", sans-serif`, fontWeight: "500", color: "#444444"}}>
              Click on a contact to view their status updates
            </Typography>
          </Box>
        </Box>
      </Box>
    );
};

export default ExpandStatus;