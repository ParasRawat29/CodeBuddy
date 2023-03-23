import React from "react";
import "./style.css";
function MediaStreamControllerButton({ styles, className, onClick, children }) {
  return (
    <div
      className={`MediaStreamControllerButton ${className}`}
      onClick={onClick}
      style={{ ...styles }}
    >
      {children}
    </div>
  );
}

export default MediaStreamControllerButton;
