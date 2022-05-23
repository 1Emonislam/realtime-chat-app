import React from "react";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import fakeData from "../fakeData/fakeData";
import TrashInfo from "./TrashInfo";
import "./Trash.css";
import { Card } from "@mui/material";

const Trash = () => {
  const noCIcon = (
    <DeleteOutlineIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );
  const mode = JSON.parse(localStorage.getItem('themeCurrent'));
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
      {!fakeData?.length && (
        <NoContentIcon noCIcon={noCIcon} content={"No notes in Trash"} />
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {fakeData?.slice(0, 5)?.map((note, index) => (
          <TrashInfo key={index} note={note} mode={mode}></TrashInfo>
        ))}
      </div>
    </>
  );
};

export default Trash;
