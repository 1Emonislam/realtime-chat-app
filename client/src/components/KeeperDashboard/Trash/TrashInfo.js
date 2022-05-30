import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, Card, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionByNotesTrashSingleDelete, actionByNotesTrashUpdate } from '../../../store/actions/noteAction';
const TrashInfo = ({ note, trashCount, setTrashCount, trashPage }) => {
  const { theme, auth } = useSelector(state => state)
  const dispatch = useDispatch()
  const mode = theme?.theme;
  return (
    <Card className="notes-card-style">
      <div style={{ display: "inlineblock" }}>
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
        <Tooltip title="Restore" placement="top" onClick={() => {
          const data = {
            action: 'note',
            status: 'trash',
            message: 'Trash Restore'
          }
          dispatch(actionByNotesTrashUpdate(data, note?._id, auth?.user?.token, setTrashCount, trashPage))
        }}>
          <IconButton>
            <RestoreFromTrashIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow placement="top" onClick={() => {
          dispatch(actionByNotesTrashSingleDelete(note?._id, auth?.user?.token, setTrashCount, trashPage))
        }}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default TrashInfo;
