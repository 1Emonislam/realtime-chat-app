// groupInfoOpen, setGroupInfoOpen, groupInfo, handleGroupInfoOpen, handleGroupInfoClose, chatId, token 
import Cancel from '@mui/icons-material/Cancel';
import { Avatar, Modal, ToggleButton } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        lg: '600px',
        md: '500px',
        xs: 'auto'
    },
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const SingleProfile = ({ groupInfoOpen, setGroupInfoOpen, groupInfo, handleGroupInfoOpen, handleGroupInfoClose, chatId, token }) => {
    return (
        <Box>
            <Modal
                style={{ overflowY: 'scroll' }}
                open={groupInfoOpen}
                onClose={handleGroupInfoClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar title={groupInfo?.chat?.chatName} alt={groupInfo?.chat?.chatName} src={groupInfo?.chat?.img} style={{ width: '100px', height: '100px', margin: '0 auto' }} />
                            <Cancel style={{ cursor: 'pointer', position: 'absolute', right: '60px' }} sx={{ color: "#ee00ab" }} onClick={handleGroupInfoClose} />
                        </div>

                        <ToggleButton value="two" style={{ textTransform: 'capitalize', border: 'none' }}>Group: {groupInfo?.chat?.chatName} </ToggleButton>

                        {groupInfo?.chat?.topic && <div>
                            <ToggleButton value="theree" style={{ textTransform: 'capitalize', border: 'none' }}>Topic: {groupInfo?.chat?.topic} </ToggleButton>

                        </div>}
                        {groupInfo?.chat?.status && <div>
                            <ToggleButton value="theree" style={{ textTransform: 'capitalize', border: 'none' }}>status: <span style={{ border: '0.5px solid #ddd', marginLeft: '10px', padding: '0px 15px', borderRadius: '5px' }}>{groupInfo?.chat?.status}</span> </ToggleButton>

                        </div>}
                        {groupInfo?.chat?.description && <div>
                            <ToggleButton value="theree" style={{ textTransform: 'capitalize', border: 'none' }}>Description: {groupInfo?.chat?.description} </ToggleButton>

                        </div>}

                    </div>
                </Box>
            </Modal>
        </Box>
    );
};

export default SingleProfile;