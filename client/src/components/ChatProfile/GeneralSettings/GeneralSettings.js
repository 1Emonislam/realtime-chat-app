import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import General from "./General/General";

const GeneralSettings = ({ mode }) => {
  const [toggleButton] = useState("settings");

  return (
    <>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography
          sx={{ mb: -0.5 }}
          fontWeight={800}
          variant="h6"
          gutterBottom
          component="div"
        >
          Settings
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize={14}
          gutterBottom
          component="div"
        >
          Last Update your profile: 29 Aug 2020
        </Typography>
      </Paper>
      {toggleButton === "settings" && <General mode={mode} />}
    </>
  );
};

export default GeneralSettings;
