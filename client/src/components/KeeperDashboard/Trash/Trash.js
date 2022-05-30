import React from "react";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrashInfo from "./TrashInfo";
import "./Trash.css";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
const Trash = () => {
  const { notes,theme } = useSelector(state => state)
  const noCIcon = (
    <DeleteOutlineIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );
  const mode = theme?.theme;
  return (
    <>
      <Card
        className="trash-empty-card"
        sx={{
          '&:hover': {
            backgroundColor: `${mode === 'dark' ? 'rgb(47 44 44)' : 'rgb(243, 243, 243)'}`
          }
        }}
      >Click here empty trash </Card>

      {/* --- No content icon --- */}
      {!notes?.trash?.length !== 0 && (
        <NoContentIcon noCIcon={noCIcon} content={"No notes in Trash"} />
      )}

      {notes?.trash?.length !== 0 && <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes?.trash?.map((note, index) => (
          <TrashInfo key={index} note={note} mode={mode}></TrashInfo>
        ))}
      </div>}
    </>
  );
};

export default Trash;
