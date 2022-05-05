import CancelIcon from "@mui/icons-material/Cancel";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
import GroupMemberShow from "./GroupAdmin";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    outline: 'none'

};
function GroupAllMember({ memberInfo, handleMemberClose, memberOpen }) {
    return (
        <Modal
            style={{ overflowY: 'scroll' }}
            open={memberOpen}
            onClose={handleMemberClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <div>
                        <GroupMemberShow memberInfo={memberInfo} />
                    </div>
                    <div>
                        <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleMemberClose} />
                    </div>
                </div>
            </Box >
        </Modal >
    )
}

export default GroupAllMember