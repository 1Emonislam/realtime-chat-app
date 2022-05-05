import { ToggleButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { groupDelete } from '../../../../store/actions/groupActions';

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



export default function GroupAlertShow({ alertOpenGroup,handleAlertCloseGroup, setAlertOpenGroup, chatId, token }) {
    const dispatch = useDispatch();
    return (
        <div>
             <Modal
                style={{ overflowY: 'scroll' }}
                open={alertOpenGroup}
                onClose={handleAlertCloseGroup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ToggleButton value="one"style={{ textTransform: 'none', border: 'none' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete this entire Group?
                        </Typography>
                    </ToggleButton>
                   
                    <ToggleButton value="two"style={{ textTransform: 'none', border: 'none' }}>
                    <Typography id="modal-modal-description" sx={{ m: 2 }}>
                    Once you delete your copy of the Group conversation, it can't be undone.
                    </Typography>
                    </ToggleButton>
                   
                    <Button onClick={() => setAlertOpenGroup(false)}>
                        Cancell
                    </Button>
                   {token && chatId ? <Button onClick={() => {
                        dispatch(groupDelete(chatId, token))
                        setAlertOpenGroup(false)
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