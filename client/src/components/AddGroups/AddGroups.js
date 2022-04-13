import CancelIcon from "@mui/icons-material/Cancel";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postGroupData } from "../../store/actions/groupActions";

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
//   {...register("email", { min: 0 })} required
const AddGroups = ({ handleGroupOpen, handleGroupClose, groupOpen }) => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("")
  const [previewSource, setPreviewSource] = useState("")
  const auth = useSelector(state => state?.auth)
  // console.log(auth?.user)
  const onSubmit = data => {
    if (previewSource) data.img = previewSource;
    dispatch(postGroupData(data, auth?.user?.token, reset))
  };
  const fileReader = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader?.result)
    }
  }
  if (selected) {
    const file = selected.target?.files[0];
    fileReader(file)
  }

  return (
    <Modal
      open={groupOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >

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
            <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleGroupClose} />
          </Box>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <TextField fullWidth size="small"    {...register("chatName", { min: 0 })} required />
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
              <Box style={{ display: "flex", justifyContent: 'center' }}>
                {previewSource ? <>
                  <img style={{ width: '100px', height: '100px', borderRadius: '100%' }} src={previewSource} alt="chosen" />
                </> :
                  <>
                    <TextField fullWidth size="small" style={{ width: 280 }} />
                    <label className="browseFile">
                      <input onChange={(e) => setSelected(e)} type="file" />
                      Browse File
                    </label></>}
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
                <TextField fullWidth size="small"{...register("topic", { min: 0 })} />
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
                <TextField fullWidth size="large"{...register("description", { min: 0 })} required />
                <Button
                  variant="inherit" // <-- Just add me!
                  label="My Label">
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
                  value="private"
                  {...register("status", { min: 1 })} required
                  control={<Radio color="secondary" />}
                  label="Private Group"
                  style={{ fontFamily: `"Poppins", sans-serif` }}
                />
                <FormControlLabel
                  value="public"
                  {...register("status", { min: 0 })}
                  control={<Radio color="secondary" />}
                  label="Public Group"
                  style={{ fontFamily: `"Poppins", sans-serif` }}
                />
              </RadioGroup>
            </Box>
            <Box className="but" style={{ textAlign: "right" }} sx={{ mt: 5 }}>
              <button style={{ cursor: 'pointer' }} className="buttonContact1" onClick={handleGroupClose}>
                Cancel
              </button>
              <button type="submit" className="buttonContact2">Add Participants</button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddGroups;
