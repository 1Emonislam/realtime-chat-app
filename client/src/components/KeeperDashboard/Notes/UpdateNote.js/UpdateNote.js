import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionByNotesUpdate } from '../../../../store/actions/noteAction';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '7px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function UpdateNote({ open, mode, notePage, setNoteCount, handleOpen, handleClose, singleNoteInfo }) {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()
    const { register,
        handleSubmit } = useForm();
    const onSubmit = data => {
        data.action = 'note';
        data.status = 'note'
        data.message = 'Successfully Updated!'
        dispatch(actionByNotesUpdate(data, singleNoteInfo?._id, auth?.user?.token, setNoteCount, notePage, handleClose))
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <Typography
                                component='input'
                                color={mode === 'dark' ? '#9d8585' : 'black'}
                                type="text"
                                {...register("title", { min: 0 })} required
                                defaultValue={singleNoteInfo?.title}
                                className="input1" />
                            <CancelIcon onClick={() => handleClose()} style={{ color: 'purple' }}></CancelIcon>
                        </div>
                        {singleNoteInfo?.details && <Typography
                            color={mode === 'dark' ? '#9d8585' : 'black'}
                            sx={{ background: 'none', border: 'none!important', paddingTop: "20px", outline: 0 }}
                            {...register("details", { min: 0 })}
                            component='textarea'
                            width="100%"
                            rows="auto"
                            type="text"
                            defaultValue={singleNoteInfo?.details}
                            className=""
                        />}
                        <Box className="notes-icon-container" style={{ paddingTop: '10px' }}>
                            <Button type="submit">
                                Update
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}