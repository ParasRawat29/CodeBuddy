import React from "react";

function Avatar({ text }) {
  return (
    <div
      class="box"
      style={{
        width: "40px",
        height: "40px",
        aspectRatio: 1,
        background: "#ed61bb",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p class="text" style={{ color: "white" }}>
        {text}
      </p>
    </div>
  );
}

export default Avatar;
