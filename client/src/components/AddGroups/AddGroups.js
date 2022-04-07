import { Button, FormControlLabel, Grid, Input, Modal, Radio, RadioGroup, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box, width } from "@mui/system";
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddGroups = ({ handleGroupOpen, handleGroupClose, groupOpen }) => {
  return (
    <Modal
      open={groupOpen}
      onClose={handleGroupClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box style={{ display: "flex" }}>
              <Box>
                <GroupAddIcon
                  style={{ textAlign: "left" }}
                  sx={{ mt: 0.5, mr: 1 }}
                />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontWeight: "bold" }}
                  style={{ fontFamily: `"Poppins", sans-serif` }}
                >
                  Create a New Group
                </Typography>
              </Box>
            </Box>

            <Box sx={{ ml: 5 }}>
              <CancelIcon sx={{ color: "#ee00ab" }} />
            </Box>
          </div>
          <Box sx={{ my: 2 }} style={{ fontFamily: `"Poppins", sans-serif` }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: 14,
                  color: "#464646",
                }}
                style={{ fontFamily: `"Poppins", sans-serif` }}
              >
                Group Name
              </Typography>
              <TextField fullWidth size="small" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: 14,
                  color: "#464646",
                }}
                style={{ fontFamily: `"Poppins", sans-serif` }}
              >
                Choose Profile Picture
              </Typography>
              <Box style={{ display: "flex" }}>
                <TextField fullWidth size="small" style={{ width: 280 }} />
                <label className="browseFile">
                  <input type="file" />
                  Browse File
                </label>
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: 14,
                  color: "#464646",
                }}
                style={{ fontFamily: `"Poppins", sans-serif` }}
              >
                Topic (Optional)
              </Typography>
              <TextField fullWidth size="small" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: 14,
                  color: "#464646",
                }}
                style={{ fontFamily: `"Poppins", sans-serif` }}
              >
                Description
              </Typography>
              <TextField fullWidth size="large" />
              <Button
                containerElement="label" // <-- Just add me!
                label="My Label"
              >
                <Input type="file" />
              </Button>
            </Box>
          </Box>
          <Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="private-group"
                control={<Radio color="secondary" />}
                label="Private Group"
                style={{ fontFamily: `"Poppins", sans-serif` }}
              />
              <FormControlLabel
                value="public-group"
                control={<Radio color="secondary" />}
                label="Public Group"
                style={{ fontFamily: `"Poppins", sans-serif` }}
              />
            </RadioGroup>
          </Box>
          <Box className="but" style={{ textAlign: "right" }} sx={{ mt: 5 }}>
            <button className="buttonContact1" onClick={handleGroupClose}>
              Cancel
            </button>
            <button className="buttonContact2">Add Participants</button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default AddGroups;
