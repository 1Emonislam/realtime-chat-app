import AddCircleIcon from "@mui/icons-material/AddCircle";
// import ArchiveIcon from "@mui/icons-material/Archive";
// import CancelIcon from "@mui/icons-material/Cancel";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import LabelIcon from "@mui/icons-material/Label";
// import {BsPinFill} from 'react-icons/bs'
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, IconButton, Pagination, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import "./Notes.css";
import { useForm } from 'react-hook-form';
import NotesInfo from "./NotesInfo";
import { actionByNotesNoteGet, createNoteItem } from "../../../store/actions/noteAction";
import { toast, ToastContainer } from "react-toastify";
import { ERROR_NOTE, MESSAGE_NOTE } from "../../../store/reducers/notesReducer";
import { useEffect, useState } from "react";
import Loading from "../../Spinner/Loading";
const Notes = () => {
  const noCIcon = (
    <NoteOutlinedIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );

  const { auth, notes, loading } = useSelector(state => state)
  const [notePage, setNotePage] = useState(1)
  const [noteCount, setNoteCount] = useState()
  const limit = 10;
  // console.log(notes.notes)
  const mode = useSelector(state => state?.theme?.theme)
  const dispatch = useDispatch()
  const { register, reset, handleSubmit } = useForm();
  const onSubmit = data => {
    data.permission = true;
    dispatch(createNoteItem(data, auth?.user?.token, reset))
  };
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
    dispatch(actionByNotesNoteGet(notePage, limit, auth?.user?.token,setNoteCount))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notePage, dispatch, auth?.user?.token])
  return (
    <>
      <Paper
        elevation={4}
        className="notes-container"
        sx={{ height: "100%", borderRadius: 2 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex" }}>
            <Typography
              component='input'
              color={mode === 'dark' ? '#9d8585' : 'black'}
              type="text"
              {...register("title", { min: 0 })} required
              placeholder="Title"
              className="input1" />
            <IconButton sx={{ width: "30px", height: "30px" }}>
              <PushPinIcon
                sx={{ color: "#bebebe", fontSize: "19px", marginTop: "10px" }}
              />
            </IconButton>
          </div>
          <Typography
            color={mode === 'dark' ? '#9d8585' : 'black'}
            sx={{ background: 'none', border: 'none!important', outline: 0 }}
            {...register("details", { min: 0 })}
            component='textarea'
            width="100%"
            rows="auto"
            type="text"

            placeholder="Take a note..."
            className=""
          />
          <Box className="notes-icon-container">
            {/* -- Color box component -- */}
            {/* <IconButton>
            <CheckBoxIcon className="notes-icons" />
          </IconButton> */}
            {/* <IconButton>
            <BsPinFill style={{maarginTop:'5px'}} className="notes-icons" />
          </IconButton> */}
            {/* <IconButton>
            <ArchiveIcon className="notes-icons" />
          </IconButton> */}
            {/* <IconButton>
              <CancelIcon className="notes-icons" />
            </IconButton> */}
            <IconButton type="submit">
              <AddCircleIcon className="notes-icons" />
            </IconButton>
          </Box>
        </form>

      </Paper>

      {/* --- No content icon --- */}
      {loading && <Loading />}
      {(notes?.note?.length === 0) && (
        <>
          <NoContentIcon
            noCIcon={noCIcon}
            content={"Notes you add appear here"}
          />
        </>
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes?.note?.map((note, index) => (
          <NotesInfo setNoteCount={setNoteCount} key={index} note={note} notePage={notePage} setNotePage={setNotePage} noteCount={noteCount} mode={mode}></NotesInfo>
        ))}
      </div>
      <Pagination
        count={Math.ceil(noteCount / limit)}
        color="secondary"
        variant="outlined"
        onChange={(e, value) => setNoteCount(value)}
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

export default Notes;
