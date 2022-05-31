import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionByNotesUpdate } from "../../../store/actions/noteAction";
import "./Notes.css";
import UpdateNote from "./UpdateNote.js/UpdateNote";

const NotesInfo = ({ note, mode, notePage, setNoteCount }) => {
  const { auth } = useSelector(state => state)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const [singleNoteInfo, setSingleNoteInfo] = useState('')
  return (
    <div className="notes-card-style">
      <div style={{ display: "flex" }}>
        <div style={{ color: `${mode === 'dark' ? 'gray' : 'black'}` }}>
          <p
            style={{
              fontSize: "1em",
              fontWeight: "500",
              marginBottom: "6px",
              display: 'flex',
              justifyContent: 'space-between',

            }}
          >

            {note?.title?.slice(0, 50)} <Tooltip title={note?.title} arrow>
              <span style={{ cursor: 'pointer' }}><InfoIcon style={{ position: 'relative', top: '5px', fontSize: '20px' }} /></span>
            </Tooltip>
          </p>
          <p
            style={{
              fontSize: "14px",
              wordWrap: "break-word",
              marginBottom: "10px",
              fontWeight: "400",
            }}
          >
            {note?.details?.slice(0, 120) || note?.message?.content?.text?.slice(0, 120)}...<Tooltip title={note?.details || note?.message?.content?.text} arrow>
              <span style={{ cursor: 'pointer' }}>More</span>
            </Tooltip>
          </p>
        </div>
      </div>

      <Box sx={{ display: "flex", justifyContent: "end", position: 'relative' }}>

        {/* -- Color box component -- */}
        <Tooltip title="Pin" arrow placement="top" onClick={() => {
          const data = {
            action: 'pin',
            status: 'note',
            message: 'Pin Addded'
          }
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token, notePage, handleClose))
        }}>
          <IconButton>
            <PushPinIcon style={{ position: 'relative', top: '2px' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Archive" arrow placement="top" onClick={() => {
          const data = {
            action: 'archive',
            status: 'note',
            message: 'Archive Added'
          }
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token, notePage, handleClose))
        }}>
          <IconButton>
            <ArchiveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow placement="top" onClick={() => {
          const data = {
            action: 'trash',
            status: 'note',
            message: 'Trashed Added'
          }
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token, notePage, handleClose))
        }}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit" arrow placement="top" onClick={() => {
          setSingleNoteInfo(note)
          setOpen(true)
        }}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <span style={{ border: '1px solid #ddd', padding: '0px 8px', left: "0px", fontSize: "13px", bottom: '11px', color: 'gray', position: 'absolute', borderRadius: '20px' }}>{note?.action} </span>
      </Box>
      {singleNoteInfo && <UpdateNote notePage={notePage} setNoteCount={setNoteCount} mode={mode} singleNoteInfo={singleNoteInfo} open={open} handleOpen={handleOpen} handleClose={handleClose} />}
    </div>
  );
};

export default NotesInfo;
