import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box, List, ToggleButton, Typography } from "@mui/material";
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { MdOutlineAttachFile, MdVideocam } from 'react-icons/md';
import Divider from '@mui/material/Divider';
import ImageIcon from '@mui/icons-material/Image';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUploadPopup = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
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
                <List>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1 }}>
                        <AudioFileIcon sx={{ mx: 1, fontSize: '20px' }} />
                        <Typography sx={{ mr: 1.5 }}>Audio</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1 }}>
                        <MdVideocam sx={{ mx: 1, fontSize: '20px' }} />
                        <Typography sx={{ mr: 1.5 }}>Video</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1 }}>
                        <ImageIcon sx={{ mx: 1, fontSize: '20px' }} />
                        <Typography sx={{ mr: 1.5 }}>Image</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 1 }}>
                        <UploadFileIcon sx={{ mx: 1, fontSize: '20px' }} />
                        <Typography sx={{ mr: 1.5 }}>Others</Typography>
                    </Box>
                    <Divider />
                </List>
            </Popover>
        </div>
    );
};

export default FileUploadPopup;
