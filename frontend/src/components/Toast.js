import React from "react";

function Toast({ success, message, opacity }) {
  var Styles = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    display: "block",
    fontSize: "1rem",
    textAlign: "center",
    padding: "3px 10px",
    width: "fit-content",
    maxWidth: "200px",
    backgroundColor: "#e7e7e7",
    fontWeight: "700",
    fontFamily: "Segoe UI",
    color: `${success === true ? "green" : "indianred"}`,
    borderRadius: "3px",
    transition: "opacity 0.5s ease",
  };

  return <div style={{ ...Styles, opacity }}>{message}</div>;
}

export default Toast;
