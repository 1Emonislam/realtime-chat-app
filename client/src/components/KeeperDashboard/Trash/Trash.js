import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getActinByNotes } from "../../../store/actions/noteAction";
import { ERROR_NOTE, MESSAGE_NOTE } from "../../../store/reducers/notesReducer";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import "./Trash.css";
import TrashEmtyPermission from "./TrashEmtyPermission";
import TrashInfo from "./TrashInfo";
const Trash = () => {
  const { notes, auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()
  const [trashPage, setTrashPage] = useState(1)
  const [trashCount, setTrashCount] = useState(notes?.trashCount || 0)
  const limit = 10;
  const noCIcon = (
    <DeleteOutlineIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );
  const mode = theme?.theme;
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
    dispatch(getActinByNotes(trashPage, limit, auth?.user?.token))
  }, [trashPage, dispatch, auth?.user?.token])
  return (
    <>

      <div style={{ marginTop: '50px' }}>
        {notes?.trash?.length !== 0 && <TrashEmtyPermission setTrashCount={setTrashCount} trashPage={trashPage} />}
      </div>

      {/* --- No content icon --- */}
      {notes?.trash?.length === 0 && (
        <NoContentIcon noCIcon={noCIcon} content={"No notes in Trash"} />
      )}

      {notes?.trash?.length !== 0 && <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes?.trash?.map((note, index) => (
          <TrashInfo trashCount={trashCount} setTrashCount={setTrashCount} trashPage={trashPage} key={index} note={note} mode={mode}></TrashInfo>
        ))}
      </div>}
      <Pagination
        count={Math.ceil(trashCount / limit)}
        color="secondary"
        variant="outlined"
        onChange={(e, value) => setTrashPage(value)}
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

export default Trash;
