import CancelIcon from "@mui/icons-material/Cancel";
import { Avatar, Modal, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    outline: 'none'

};
function GroupAllMember({ members, handleMemberClose, memberOpen }) {
    return (
        <Modal
            open={memberOpen}
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
                        {members?.map((member, index) => (
                            <Tooltip title={member.firstName + ' ' + member?.lastName} key={index}>
                                <Avatar style={{ cursor: 'pointer' }} key={index} alt={member.username} src={member?.pic} />
                            </Tooltip>
                        ))}
                        <Box>
                            <Typography
                                variant="h6"
                                component="h6"
                                sx={{ fontWeight: "bold" }}
                                style={{ fontFamily: `"Poppins", sans-serif` }}
                            >
                                Members
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ ml: 5 }}>
                        <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleMemberClose} />
                    </Box>
                </div>


            </Box >

        </Modal >
    )
}

export default GroupAllMember