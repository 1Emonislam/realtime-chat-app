import React from 'react';
import CallIcon from "@mui/icons-material/Call";
import { ToggleButton } from "@mui/material";

const CallBar = () => {
  return (
    <div className="callbar">
      <div className="upbar">
        <div>
          <h4 style={{ marginTop: "0", color: "#4B0973" }}>RECENT CALLS</h4>
        </div>
        <div>
          <ToggleButton
            style={{
              backgroundColor: "#EE00AB",
              border: "none",
              marginTop: "-10px",
              color: "#fff",
              borderRadius: "20px"
            }}

          >
            <CallIcon />
          </ToggleButton>
        </div>
      </div>
      <div className='downbar'>
        <button className='barButton'>All Calls</button>
        <button className='barButton'>All Calls</button>
        <button className='barButton'>All Calls</button>
        <button className='barButton'>All Calls</button>
        <button className='barButton'>Calls</button>
        <button className='barButton'>Calls</button>
      </div>
    </div>
  );
};

export default CallBar;