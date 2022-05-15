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
import { useDispatch, useSelector } from 'react-redux';
// import {MESSAGE_WRITE} from './../store/type/messageTypes';
import { sendMessage } from "../store/actions/messageAction";

const IconPopup = () => {
    const dispatch = useDispatch();
    const { auth, selectedChat } = useSelector(state => state);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    
    // onClick={()=>dispatch({
    //     type:MESSAGE_WRITE,
    //     payload:{
    //         data:'done'
    //     }
    // })}

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
                                onClick={() => {
                                dispatch(sendMessage('forumicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ForumIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('blankboxicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <CheckBoxOutlineBlankIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('checkedicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <CheckCircleOutlineIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('questionicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <QuestionMarkIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('replyicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ReplayIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('priorityicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <PriorityHighIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('thumbupicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ThumbUpAltIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('thumbdownicon', selectedChat?.chat?._id , auth.user?.token))
                                }}
                                sx={{ px: 0, display: "flex", justifyContent: "center" }}
                                autoFocus
                                button
                            >
                                <ThumbDownIcon />
                            </ListItem>
                        </Grid>
                        <Grid item xs={4}>
                            <ListItem
                                onClick={() => {
                                dispatch(sendMessage('sentimenticon', selectedChat?.chat?._id , auth.user?.token))
                                }}
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
