import * as React from "react";
import "./DrawerContent.css";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box } from "@mui/material";
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

const DrawerContent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            activeClassName="active"
            style={{ display: "flex", padding: "4px", marginLeft: "6px" }}
          >
            <div className="linkItem">
              <h5 style={{ color: "#464646", marginLeft: "15px" }}>
                <NoteOutlinedIcon sx={{ mt: "5px", mr: 2 }} fontSize="medium" />
              </h5>
              <h3 style={{ fontWeight: "400", color: "#595959" }}>Notes</h3>
            </div>
          </NavLink>

          <div
            className="drawerLink"
            style={{ display: "flex", cursor: "pointer" }}
          >
            <div className="linkItem" onClick={handleOpen}>
              <h5 style={{ color: "#464646", marginLeft: "15px" }}>
                <ModeEditOutlinedIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400", color: "#595959" }}>
                Edit Labels
              </h3>
            </div>
          </div>

          <NavLink
            to="/keeper/archive"
            className="drawerLink"
            activeClassName="active"
            style={{ display: "flex" }}
          >
            <div className="linkItem">
              <h5 style={{ color: "#464646", marginLeft: "15px" }}>
                <ArchiveOutlinedIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400", color: "#595959" }}>Archive</h3>
            </div>
          </NavLink>

          <NavLink
            to="/keeper/trash"
            className="drawerLink"
            activeClassName="active"
            style={{ display: "flex" }}
          >
            <div className="linkItem">
              <h5 style={{ color: "#464646", marginLeft: "15px" }}>
                <DeleteOutlineIcon
                  sx={{ mt: "5px", mr: 2 }}
                  fontSize="medium"
                />
              </h5>
              <h3 style={{ fontWeight: "400", color: "#595959" }}>Trash</h3>
            </div>
          </NavLink>
        </Box>
      </Box>

      {/* ---------- Modal --------- */}

      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modalInputContainer">
            <h2 style={{ margin: "0", padding: "0", fontSize: "15px" }}>
              Edit Labels
            </h2>

            <input type="text" placeholder="Add label..." />
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
