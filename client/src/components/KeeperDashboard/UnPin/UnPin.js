// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import LabelIcon from "@mui/icons-material/Label";
// import {BsPinFill} from 'react-icons/bs'
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import { Pagination } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import { getActinByNotes } from "../../../store/actions/noteAction";
import { ERROR_NOTE, MESSAGE_NOTE } from "../../../store/reducers/notesReducer";
import Loading from "../../Spinner/Loading";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import UnPinInfo from "./UnPinInfo";
const UnPin = () => {
    const noCIcon = (
        <NoteOutlinedIcon sx={{ fontSize: "130px", color: "#ececec" }} />
    );
    const { auth, notes, loading } = useSelector(state => state)
    const [unPinPage, setUnPinPage] = useState(1)
    const [unPinCount, setUnPinCount] = useState(notes?.unPinCount || 0)
    const limit = 12;
    // console.log(notes.notes)
    const mode = useSelector(state => state?.theme?.theme)
    const dispatch = useDispatch()
    if (notes?.message) {
        toast.success(`${notes?.message}`, {
            position: "bottom-right",
            theme: mode,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: MESSAGE_NOTE,
            payload: {
                message: ''
            }
        })
    }
    if (notes?.error?.length) {
        Object.values(notes?.error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: mode,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: ERROR_NOTE,
                payload: {
                    error: ''
                }
            })
        })
    }
    useEffect(() => {
        dispatch(getActinByNotes(unPinPage, limit, auth?.user?.token))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unPinPage, dispatch, auth?.user?.token])
    return (
        <>
            {/* --- No content icon --- */}
            {loading && <Loading />}
            {(notes?.unPin?.length === 0) && (
                <>
                    <NoContentIcon
                        noCIcon={noCIcon}
                        content={"No Notes UnPin you appear here"}
                    />
                </>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "40px", justifyContent: "center" }}>
                {notes?.unPin?.map((note, index) => (
                    <UnPinInfo setUnPinCount={setUnPinCount} key={index} note={note} unPinPage={unPinPage} setUnPinPage={setUnPinPage} mode={mode}></UnPinInfo>
                ))}
            </div>
            <Pagination
                style={{ marginLeft: "50px" }}
                count={Math.ceil(unPinCount / limit)}
                color="secondary"
                variant="outlined"
                onChange={(e, value) => setUnPinPage(value)}
            />
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
        </>
    );
};

export default UnPin;
