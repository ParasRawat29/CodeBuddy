import React, { useEffect, useState } from "react";

function Toast({ success, message, opacity }) {
  const [vis, setVis] = useState("hidden");
  var Styles = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    visibility: vis,
    fontSize: "1rem",
    textAlign: "center",
    padding: "3px 10px",
    width: "fit-content",
    maxWidth: "200px",
    backgroundColor: "#e7e7e7",
    fontWeight: "700",
    fontFamily: "Segoe UI",
    color: `${success === true ? "green" : "indianred"}`,
    borderRadius: "5px",
    transition: "visibility 0.5s ease",
    zIndex: "100",
  };
  useEffect(() => {
    if (opacity === 1) setVis("visible");
    else setVis("hidden");
  }, [opacity]);
  return <div style={{ ...Styles }}>{message}</div>;
}

export default Toast;
