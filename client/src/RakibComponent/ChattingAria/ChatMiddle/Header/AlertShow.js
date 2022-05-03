import { ToggleButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllMessage } from '../../../../store/actions/messageAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '10px',
    p: 4,
};

export default function AlertShow({ alertOpen, handleAlertClose, setAlertOpen, chatId, token }) {
    const dispatch = useDispatch();
    return (
        <div>
             <Modal
                style={{ overflowY: 'scroll' }}
                open={alertOpen}
                onClose={handleAlertClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ToggleButton value="one"style={{ textTransform: 'none', border: 'none' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Delete this entire conversation?
                        </Typography>
                    </ToggleButton>
                   
                    <ToggleButton value="two"style={{ textTransform: 'none', border: 'none' }}>
                    <Typography id="modal-modal-description" sx={{ m: 2 }}>
                        Once you delete your copy of the conversation,it can't be undone.
                    </Typography>
                    </ToggleButton>
                   
                    <Button onClick={() => setAlertOpen(false)}>
                        Cancell
                    </Button>
                    {token && chatId ? <Button onClick={() => {
                        dispatch(deleteAllMessage(chatId, token))
                        setAlertOpen(false)
                    }}>
                        Delete
                    </Button>
                        : <Tooltip style={{ cursor: "pointer" }} title="Permission denied" arrow>
                            <Button>
                                Delete
                            </Button>
                        </Tooltip>
                    }
                </Box>
            </Modal>
        </div >
    );
}