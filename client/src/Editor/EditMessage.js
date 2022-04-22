import CancelIcon from '@mui/icons-material/Cancel';
import { ToggleButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { RiEditCircleFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { SUCCESS_MESSAGE_CLEAR, UPDATE_MESSAGE_FAILED } from '../store/type/messageTypes';
import { EditMessageWriter } from './EditMessageWriter';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400',
    bgcolor: 'background.paper',
    border: 'none',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

export default function EditMessage({ messageEditHandle,messageHTML,editMessageOpen }) {
    const { groupMessage, theme } = useSelector(state => state)
    const dispatch = useDispatch();
    if (groupMessage?.success) {
        toast.success(`${groupMessage?.success}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(() => {
            dispatch({
                type: SUCCESS_MESSAGE_CLEAR,
            })
        }, 5000)
    }
    if (groupMessage?.error) {
        Object.values(groupMessage?.error)?.forEach((err) => {
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
            setTimeout(() => {
                dispatch({
                    type: UPDATE_MESSAGE_FAILED,
                    payload: {
                        error: '',
                    }
                })
            }, 5000)
        })
    }
    return (
        <Modal
            open={editMessageOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box sx={style}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box style={{ display: "flex", alignItems: 'center' }}>
                            <Box>
                                <ToggleButton value="false" sx={{ textTransform: 'capitalize', border: 'none' }}>
                                    <RiEditCircleFill
                                        style={{ textAlign: "left" }}
                                        fontSize="25px"
                                        sx={{ mt: 1, mr: 1 }}
                                    />
                                </ToggleButton>
                            </Box>
                            <Box>
                                <ToggleButton value="false" sx={{ textTransform: 'capitalize', border: 'none' }}>
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        sx={{ fontWeight: "bold" }}
                                        style={{ fontFamily: `"Poppins", sans-serif` }}
                                    >
                                        Message Edit
                                    </Typography>
                                </ToggleButton>
                            </Box>
                        </Box>
                        <Box sx={{ ml: 5 }}>
                            <CancelIcon style={{ cursor: "pointer" }} sx={{ color: "#ee00ab" }} onClick={() => messageEditHandle(false)} />
                        </Box>
                    </div>
                    <EditMessageWriter messageEditHandle={messageEditHandle}messageHTML={messageHTML}/>
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
                </Box>
            </>
        </Modal>
    );
}