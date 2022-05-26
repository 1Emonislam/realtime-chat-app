import * as React from "react";
import "./DrawerContent.css";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  borderRadius: 3,
  pt: 1,
  paddingX: 2,
  border: 0,
  pb: 4,
};

const DrawerContent = ({ mode }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const textColor = `${mode === 'dark' ? 'white' : 'black'}`;

  return (
    <>
      {/* -------- Sidebar Link -------- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          color: "white",
          mt: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, fontSize: "14px" }}>
          <NavLink
            to="/keeper/notes"
            className="drawerLink"
            style={{ display: "flex", padding: "4px", marginLeft: "6px" }}
          >
            <div style={{ color: textColor }} className="linkItem">
              <h5 style={{ marginLeft: "15px" }}>
                <NoteOutlinedIcon sx={{ mt: "5px", mr: 2 }} fontSize="medium" />
              </h5>
              <h3 style={{ fontWeight: "400", }}>Notes</h3>
            </div>
          </NavLink>

          <div
            className="drawerLink"
            style={{ display: "flex", cursor: "pointer", color: textColor }}
          >
            <div className="linkItem" onClick={handleOpen}>
              <h5 style={{ marginLeft: "15px" }}>
                <ModeEditOutlinedIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400" }}>
                Edit Labels
              </h3>
            </div>
          </div>

          <NavLink
            to="/keeper/archive"
            className="drawerLink"
            style={{ display: "flex" }}
          >
            <div style={{ color: textColor }} className="linkItem">
              <h5 style={{ marginLeft: "15px" }}>
                <ArchiveOutlinedIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400" }}>Archive</h3>
            </div>
          </NavLink>

          <NavLink
            to="/keeper/trash"
            className="drawerLink"
            style={{ display: "flex" }}
          >
            <div style={{ color: textColor }} className="linkItem">
              <h5 style={{ marginLeft: "15px" }}>
                <DeleteOutlineIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400" }}>Trash</h3>
            </div>
          </NavLink>
        </Box>
      </Box>

      {/* ---------- Modal --------- */}

      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modalInputContainer">
            <h2 style={{
              margin: "0",
              padding: "0",
              fontSize: "15px",
              color: `${mode === 'dark' ? '#dcd1d1' : 'black'}`
            }}>
              Edit Labels
            </h2>

            <Typography
              component='input'
              color={mode === 'dark' ? 'white' : 'black'}
              type="text"
              placeholder="Add label..." />
            <AddIcon
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: 5,
                bottom: 0,
              }}
            />

            <h5 onClick={handleClose}>Close</h5>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default DrawerContent;