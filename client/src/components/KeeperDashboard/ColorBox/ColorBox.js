import React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { IconButton, Popover } from "@mui/material";
import "./ColorBox.css";

const colorArray = [
  "#fff",
  "#ffe3be",
  "#fffccb",
  "#edffcd",
  "#d3fff8",
  "#d5f2ff",
  "#d7ddfd",
  "#e8dbff",
  "#fdd8f4",
];

const ColorBox = () => {
  // color dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleColorClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleColorClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // color select
  const handleColorSelect = (color) => {
    console.log(color);
  };

  return (
    <div>
      <IconButton>
        <ColorLensIcon onClick={handleColorClick} />
      </IconButton>
      {/* Drop down */}
      <Popover
        // id={colorId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleColorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <div className="notes-color-box">
          {colorArray.map((color) => (
            <p
              onClick={() => handleColorSelect(color)}
              key={color}
              className="notes-color"
            ></p>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default ColorBox;
