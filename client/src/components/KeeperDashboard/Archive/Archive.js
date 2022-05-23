import React from "react";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import fakeData from "../fakeData/fakeData";
import ArchiveInfo from "./ArchiveInfo";

const Archive = () => {
  const noCIcon = (
    <ArchiveOutlinedIcon sx={{ fontSize: "130px", color: "#ececec" }} />
  );
  const mode = JSON.parse(localStorage.getItem('themeCurrent'));

  return (
    <>
      {/* --- No content icon --- */}
      {!fakeData?.length && (
        <NoContentIcon
          noCIcon={noCIcon}
          content={"Your archived notes appear here"}
        />
      )}

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {fakeData?.slice(0, 8)?.map((note, index) => (
          <ArchiveInfo key={index} note={note} mode={mode}></ArchiveInfo>
        ))}
      </div>
    </>
  );
};

export default Archive;
