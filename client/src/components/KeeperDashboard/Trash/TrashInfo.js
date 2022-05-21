import { Box, Card, IconButton } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

const TrashInfo = ({ note }) => {
  return (
    <Card className="notes-card-style">
      <div style={{ display: "inlineblock" }}>
        <div style={{ textAlign: "start", fontSize: "1em", fontWeight: "500" }}>
          <p style={{ color: "#2e2e2e", marginBottom: "6px" }}>{note?.title}</p>
          <p
            style={{
              fontSize: "14px",
              wordWrap: "break-word",
              marginBottom: "10px",
              fontWeight: "400",
            }}
          >
            {note?.description}
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
