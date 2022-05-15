import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, ToggleButton, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Popover from "@mui/material/Popover";
import * as React from "react";
import { FaFileAudio, FaFileVideo } from 'react-icons/fa';
import { MdOutlineAttachFile } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { sendAllUploadMessage } from '../store/actions/messageAction';
import { UPLOAD_SUCCESS, VALUE } from '../store/reducers/uploadReducer';

const FileUploadPopup = ({ groupMessage, selectedChat, auth }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const { groupMessage, selectedChat, auth } = useState(state => state)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const dispatch = useDispatch()
    const handleUploadFileSelectAudio = (e) => {
        if (!e.target.files[0]) return
        const data = new FormData()
        data.append("file", e.target.files[0])
        data.append("upload_preset", "allFiles")
        data.append("cloud_name", "wesoftin")
        if (selectedChat?.chat?._id && auth?.user?.token) {
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                }
            })
            dispatch({
                type: VALUE,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                    value: 50,
                }
            })
            fetch("  https://api.cloudinary.com/v1_1/wesoftin/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: false,
                            loading: true,
                            value: 100,
                        }
                    })
                    data.audioFile = 'audio'
                    dispatch(sendAllUploadMessage(data, selectedChat?.chat?._id, auth?.user?.token))
                })
                .catch(err => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: true,
                            loading: false,
                            value: 1,
                        }
                    })
                })
        }
    }
    const handleUploadFileSelectImaage = (e) => {
        if (!e.target.files[0]) return
        const data = new FormData()
        data.append("file", e.target.files[0])
        data.append("upload_preset", "allFiles")
        data.append("cloud_name", "wesoftin")
        if (selectedChat?.chat?._id && auth?.user?.token) {
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                }
            })
            dispatch({
                type: VALUE,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                    value: 50,
                }
            })
            fetch("  https://api.cloudinary.com/v1_1/wesoftin/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: false,
                            loading: true,
                            value: 100,
                        }
                    })
                    data.imagesFile = 'images'
                    dispatch(sendAllUploadMessage(data, selectedChat?.chat?._id, auth?.user?.token))
                })
                .catch(err => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: true,
                            loading: false,
                            value: 1,
                        }
                    })
                })
        }
    }
    const handleUploadFileSelectVideo = (e) => {
        if (!e.target.files[0]) return
        const data = new FormData()
        data.append("file", e.target.files[0])
        data.append("upload_preset", "allFiles")
        data.append("cloud_name", "wesoftin")
        if (selectedChat?.chat?._id && auth?.user?.token) {
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                }
            })
            dispatch({
                type: VALUE,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                    value: 50,
                }
            })
            fetch("  https://api.cloudinary.com/v1_1/wesoftin/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: false,
                            loading: true,
                            value: 100,
                        }
                    })
                    data.videoFile = 'video'
                    dispatch(sendAllUploadMessage(data, selectedChat?.chat?._id, auth?.user?.token))
                })
                .catch(err => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: true,
                            loading: false,
                            value: 1,
                        }
                    })
                })
        }
    }
    const handleUploadFileSelectOthers = (e) => {
        if (!e.target.files[0]) return
        const data = new FormData()
        data.append("file", e.target.files[0])
        data.append("upload_preset", "allFiles")
        data.append("cloud_name", "wesoftin")
        if (selectedChat?.chat?._id && auth?.user?.token) {
            dispatch({
                type: UPLOAD_SUCCESS,
                payload: {
                    success: false,
                    error: false,
                    loading: true,
                }
            })
            fetch("  https://api.cloudinary.com/v1_1/wesoftin/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    data.othersFile = 'others'
                    dispatch(sendAllUploadMessage(data, selectedChat?.chat?._id, auth?.user?.token))
                })
                .catch(err => {
                    dispatch({
                        type: VALUE,
                        payload: {
                            success: false,
                            error: true,
                            loading: false,
                            value: 1,
                        }
                    })
                })
        }
    }

    return (
        <div>
            <ToggleButton aria-describedby={id} onClick={handleClick} value="one" sx={{ marginBottom: '0px!important', border: 'none' }}>
                <MdOutlineAttachFile />
            </ToggleButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <>
                    <Button
                        component="label"
                        style={{ textTransform: 'capitalize', alignItems: 'center', justifyContent: 'space-around' }}
                    >
                        <FaFileAudio style={{ marginLeft: "9px", marginRight: '9px' }} />
                        <Typography sx={{ mr: 1.5 }}>Audio Upload</Typography>
                        <input
                            hidden
                            accept="audio/mp3,audio/*;capture=microphone"
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => handleUploadFileSelectAudio(e)}
                        />
                    </Button>
                    <br />
                    <Divider />
                    <Button
                        component="label"
                        style={{ textTransform: 'capitalize', justifyContent: 'space-around' }}
                    >
                        <ImageIcon sx={{ mx: 1, fontSize: '20px', }} />
                        <Typography sx={{ mr: 1.5 }}>Image Upload</Typography>
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleUploadFileSelectImaage(e)}
                        />
                    </Button>
                    <br />
                    <Divider />
                    <Button
                        component="label"
                        style={{ textTransform: 'capitalize', justifyContent: 'space-around' }}
                    >
                        <FaFileVideo style={{ marginLeft: "9px", marginRight: '9px' }} />
                        <Typography sx={{ mr: 1.5 }}>Video Upload</Typography>
                        <input
                            type="file"
                            hidden
                            accept="video/*"
                            onChange={(e) => handleUploadFileSelectVideo(e)}
                        />
                    </Button>
                    <Divider />
                    <Button
                        component="label"
                        style={{ textTransform: 'capitalize', justifyContent: 'space-around' }}
                    >
                        <UploadFileIcon sx={{ mx: 1, fontSize: '20px' }} />
                        <Typography sx={{ mr: 1.5 }}>Others Upload</Typography>
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleUploadFileSelectOthers(e)}
                        />
                    </Button>
                </>
            </Popover>
        </div>
    );
};

export default FileUploadPopup;
