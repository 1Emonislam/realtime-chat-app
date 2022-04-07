import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const AddContact = ({handleOpen, handleClose, open}) => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
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
                  <PersonAddIcon
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
                    Add Friends
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ ml: 5 }}>
                <CancelIcon sx={{color: "#ee00ab"}} />
              </Box>
            </div>
            <Box sx={{ my: 6 }} style={{ fontFamily: `"Poppins", sans-serif` }}>
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
                  Name
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
                  Nickname
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
                  Phone Number
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
                  Email
                </Typography>
                <TextField fullWidth size="small" />
              </Box>
            </Box>
            <Box className="but" style={{ textAlign: "right" }} sx={{ mt: 2 }}>
              <button className="buttonContact1" onClick={handleClose}>
                Cancel
              </button>
              <button className="buttonContact2">Add to Contacts</button>
            </Box>
          </Box>
        </>
      </Modal>
    );
};

export default AddContact;