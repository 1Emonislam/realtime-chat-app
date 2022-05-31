import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Box, IconButton, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionByNotesUpdate } from "../../../store/actions/noteAction";
import UpdateNote from "../Notes/UpdateNote.js/UpdateNote";

const ArchiveInfo = ({ note, mode, archivePage, setArchiveCount }) => {
  const { auth } = useSelector(state => state)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const [singleNoteInfo, setSingleNoteInfo] = useState('')
  return (
    <div className="notes-card-style">
      <div style={{ display: "flex" }}>
        <div style={{ color: `${mode === 'dark' ? '#9d8585' : 'black'}` }}>
          <p
            style={{
              fontSize: "1em",
              fontWeight: "500",
              marginBottom: "6px",
              display: 'flex',
              justifyContent: 'space-between'
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

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        {/* -- Color box component -- */}
        <Tooltip title="Pin" arrow placement="top" onClick={() => {
          const data = {
            action: 'pin',
            status: 'note',
            message: 'Pin Addded'
          }
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token,archivePage, handleClose))
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
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token, archivePage, handleClose))
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
          dispatch(actionByNotesUpdate(data, note?._id, auth?.user?.token,archivePage, handleClose))
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
      </Box>
      {singleNoteInfo && <UpdateNote notePage={archivePage} setNoteCount={setArchiveCount} mode={mode} singleNoteInfo={singleNoteInfo} open={open} handleOpen={handleOpen} handleClose={handleClose} />}
    </div>
  );
};

export default ArchiveInfo;
