import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { actionByNotesTrashAllDelete } from '../../../store/actions/noteAction';

export default function TrashEmtyPermission({ setTrashCount, trashPage }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ marginLeft: '20px', borderRadius: '10px', width: "210px", margin: "auto", display: 'flex', justifyContent: 'center', textTransform: 'capitalize', padding: '10px 25px!important' }}>
                Click here empty trash
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are You Sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Remove All Trash. Your copy of the Trashed it can't be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={() => {
                        dispatch(actionByNotesTrashAllDelete(auth?.user?.token, setTrashCount, trashPage))
                        handleClose()
                    }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}