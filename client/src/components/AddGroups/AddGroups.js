import CancelIcon from "@mui/icons-material/Cancel";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, ToggleButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import { postGroupChatData } from "../../store/actions/groupActions";
import { GROUP_FAILED_DATA, GROUP_SUCCESS_DATA } from "../../store/type/groupType";
import Loading from "../Spinner/Loading";
const style = {
  position: "absolute",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  outline: 'none',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};
//   {...register("email", { min: 0 })} required
const AddGroups = ({ handleGroupClose, groupOpen }) => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("")
  const [previewSource, setPreviewSource] = useState("")
  const { auth, groupData, theme } = useSelector(state => state);
  const onSubmit = data => {
    if (previewSource) data.img = previewSource;
    dispatch(postGroupChatData(data, auth?.user?.token, reset))
  };
  // console.log(groupData.error)
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
  if (groupData?.message) {
    toast.success(`${groupData?.message}`, {
      position: "bottom-right",
      theme: theme?.theme,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: GROUP_SUCCESS_DATA,
      payload: {
        message: '',
      }
    })
  }
  if (groupData?.error) {
    Object?.values(groupData?.error)?.forEach((err) => {
      toast.error(`${err}`, {
        position: "bottom-right",
        theme: theme?.theme,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: GROUP_FAILED_DATA,
        payload: {
          error: ''
        }
      })
    })
  }
  return (
    <>
      <Modal
        style={{ overflowY: 'scroll' }}
        open={groupOpen}
        onClose={handleGroupClose}
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
              <ToggleButton value="one" style={{ border: 'none', textTransform: 'capitalize' }}>
                <Box>
                  <GroupAddIcon
                    style={{ textAlign: "left" }}
                    sx={{ mt: 0.5, mr: 1 }}
                  />
                </Box>
              </ToggleButton>
              <Box>
                <ToggleButton value="two" style={{ border: 'none', textTransform: 'capitalize' }}>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontWeight: "bold" }}
                    style={{ fontFamily: `"Poppins", sans-serif` }}
                  >
                    Create a New Group
                  </Typography>
                </ToggleButton>
              </Box>
            </Box>

            <Box sx={{ ml: 5 }}>
              <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleGroupClose} />
            </Box>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ my: 2 }} style={{ fontFamily: `"Poppins", sans-serif` }}>

              <Box >
                <ToggleButton value="three" style={{ border: 'none', textTransform: 'capitalize' }}>
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
                </ToggleButton>
                <TextField fullWidth size="small"    {...register("chatName", { min: 0 })} required />
              </Box>

              <Box >
                <ToggleButton value="four" style={{ border: 'none', textTransform: 'capitalize' }}>
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
                </ToggleButton>
                <Box style={{ display: "flex", justifyContent: 'center' }}>
                  {previewSource ? <>
                    <img style={{ width: '100px', height: '100px', position: 'absolute', zIndex: '-1', borderRadius: '100%' }} src={previewSource} alt="chosen" />
                    <label className="browseFile" style={{ opacity: 'none', background: 'transparent', padding: '40px', border: 'none' }}>
                      <input sx={{ opacity: 'none', color: 'white', height: '100px', padding: '30px 30px!important' }} onChange={(e) => setSelected(e)} type="file" />
                      Browse File
                    </label>
                  </> :
                    <>
                      <TextField fullWidth size="small" style={{ width: 280 }} />
                      <label className="browseFile">
                        <input sx={{ background: "blue", color: 'white', padding: '5px 30px!important' }} onChange={(e) => setSelected(e)} type="file" />
                        Browse File
                      </label></>}
                </Box>
                <Box >
                  <>
                    <ToggleButton value="five" style={{ border: 'none', textTransform: 'capitalize' }}>
                      <Typography
                        sx={{
                          paddingTop: '16px',
                          fontWeight: "bold",
                          mb: 1,
                          fontSize: 14,
                          color: "#464646",
                        }}
                        style={{ fontFamily: `"Poppins", sans-serif` }}
                      >
                        Topic (Optional)
                      </Typography>
                    </ToggleButton>
                    <TextField fullWidth size="small"{...register("topic", { min: 0 })} />
                  </>
                </Box>
                <Box >
                  <ToggleButton value="six" style={{ border: 'none', textTransform: 'capitalize' }}>
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
                  </ToggleButton>
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
                  <ToggleButton value="seven" style={{ border: 'none' }}>
                    <FormControlLabel
                      value="private"
                      {...register("status", { min: 1 })} required
                      control={<Radio color="secondary" />}
                      label="Private Group"
                      style={{ fontFamily: `"Poppins", sans-serif` }}
                    />
                  </ToggleButton>

                  <ToggleButton value="eight" style={{ border: 'none' }}>
                    <FormControlLabel
                      value="public"
                      {...register("status", { min: 0 })}
                      control={<Radio color="secondary" />}
                      label="Public Group"
                      style={{ fontFamily: `"Poppins", sans-serif` }}
                    />
                  </ToggleButton>
                </RadioGroup>
              </Box>
              <Box className="but" style={{ textAlign: "right" }}>
                <ToggleButton value="nine" style={{ cursor: 'pointer', marginRight: '50px', border: 'none', textTransform: 'capitalize' }} className="buttonContact1" onClick={handleGroupClose}>
                  Cancel
                </ToggleButton>
                {/* {console.log(groupData?.loading )} */}
                {groupData?.loading ? <div>
                  <Loading />
                </div> :
                  <ToggleButton value="teen" style={{ cursor: 'pointer', border: 'none', marginLeft: '15px', textTransform: 'capitalize', background: 'blue', color: 'white', padding: '5px 30px!important' }} className="buttonContact1" type="submit" variant="contained">
                    Add Participants
                  </ToggleButton>
                }
              </Box>
            </Box>
          </form>
        </Box >
      </Modal >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddGroups;
