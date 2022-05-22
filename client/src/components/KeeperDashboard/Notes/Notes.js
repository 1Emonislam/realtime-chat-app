import { Box, IconButton, Paper, Typography } from "@mui/material";
import * as React from "react";
import "./Notes.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArchiveIcon from "@mui/icons-material/Archive";
import LabelIcon from "@mui/icons-material/Label";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PushPinIcon from "@mui/icons-material/PushPin";
import ColorBox from "../ColorBox/ColorBox";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import fakeData from "../fakeData/fakeData";
import NotesInfo from "./NotesInfo";

const Notes = () => {
  const noCIcon = (
    <NoteOutlinedIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );
  const mode = JSON.parse(localStorage.getItem('themeCurrent'));

  return (
    <>
      <Paper
        elevation={4}
        className="notes-container"
        sx={{ height: "100%", borderRadius: 2 }}
      >
        <div style={{ display: "flex" }}>
          <Typography
            component='input'
            color={mode === 'dark' ? '#dcd1d1' : 'black'}
            type="text"
            placeholder="Title"
            className="input1" />
          <IconButton sx={{ width: "30px", height: "30px" }}>
            <PushPinIcon
              sx={{ color: "#bebebe", fontSize: "19px", marginTop: "10px" }}
            />
          </IconButton>
        </div>
        <Typography
          color={mode === 'dark' ? '#dcd1d1' : 'black'}
          sx={{ background: 'none', }}
          component='textarea'
          rows="auto"
          type="text"
          placeholder="Take a note..."
          className=""
        />

        <Box className="notes-icon-container">
          {/* -- Color box component -- */}
          <ColorBox />
          <IconButton>
            <CheckBoxIcon className="notes-icons" />
          </IconButton>
          <IconButton>
            <LabelIcon className="notes-icons" />
          </IconButton>
          <IconButton>
            <ArchiveIcon className="notes-icons" />
          </IconButton>
          <IconButton>
            <CancelIcon className="notes-icons" />
          </IconButton>
          <IconButton>
            <AddCircleIcon className="notes-icons" />
          </IconButton>
        </Box>
      </Paper>

      {/* --- No content icon --- */}
      {!fakeData?.length && (
        <NoContentIcon
          noCIcon={noCIcon}
          content={"Notes you add appear here"}
        />
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {fakeData?.slice(0, 14)?.map((note, index) => (
          <NotesInfo key={index} note={note} mode={mode}></NotesInfo>
        ))}
      </div>
    </>
  );
};

export default Notes;
