import React from "react";
import "./style.css";
function Circular({ styles, className, onClick, children }) {
  return (
    <button
      className={`circularBtn ${className}`}
      onClick={onClick}
      style={{ ...styles }}
    >
      {children}
    </button>
  );
}

export default Circular;
