import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, Card, IconButton, Tooltip } from "@mui/material";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from "react-redux";
const TrashInfo = ({ note }) => {
  const { notes, theme } = useSelector(state => state)
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
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton>
          <RestoreFromTrashIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TrashInfo;
