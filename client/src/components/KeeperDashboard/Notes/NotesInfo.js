import { Box, IconButton } from "@mui/material";
import "./Notes.css";
import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import LabelIcon from "@mui/icons-material/Label";
import PushPinIcon from "@mui/icons-material/PushPin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NotesInfo = ({ note, mode }) => {
  return (
    <div className="notes-card-style">
      <div style={{ display: "flex" }}>
        <div style={{ color: `${mode === 'dark' ? '#dcd1d1' : 'black'}` }}>
          <p
            style={{
              fontSize: "1em",
              fontWeight: "500",
              marginBottom: "6px",
            }}
          >
            {note?.title}
          </p>
          <p
            style={{
              fontSize: "14px",
              wordWrap: "break-word",
              marginBottom: "10px",
              fontWeight: "400",
            }}
          >
            {note?.description}
          </p>
        </div>
        <IconButton sx={{ width: "30px", height: "30px" }}>
          <PushPinIcon sx={{ color: "#bebebe", fontSize: "19px" }} />
        </IconButton>
      </div>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {/* -- Color box component -- */}


        <IconButton>
          <LabelIcon />
        </IconButton>
        <IconButton>
          <ArchiveIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default NotesInfo;
