import React from "react";

const NoContentIcon = ({ noCIcon, content }) => {
  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "40%",
        left: "30%",
      }}
    >
      <h2 style={{}}>{noCIcon}</h2>
      <h2 style={{ color: "#8d9094", fontSize: "23px" }}>{content}</h2>
    </div>
  );
};

export default NoContentIcon;
