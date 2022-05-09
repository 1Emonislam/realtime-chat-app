import * as React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import Popover from "@mui/material/Popover";
import { BsEmojiSmile } from 'react-icons/bs';
import { Grid, List, ListItem, ToggleButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ReplayIcon from "@mui/icons-material/Replay";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const IconPopup = () => {
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
                <BsEmojiSmile />
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
                <List sx={{ pt: 1 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ForumIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <CheckBoxOutlineBlankIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <CheckCircleOutlineIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <QuestionMarkIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ReplayIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <PriorityHighIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ThumbUpAltIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ThumbDownIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <SentimentDissatisfiedIcon />
                            </ListItem>
                        </Grid>
                    </Grid>
                </List>
            </Popover>
        </div>
    );
};

export default IconPopup;
