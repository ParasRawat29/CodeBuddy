import React from "react";

function DeleteIcon({ width, height, color, ...styles }) {
  return (
    <div style={{ width, height, display: "inline", ...styles }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 34 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke={color}
          d="M2.99984 39.7083C2.99984 42.4125 5.09984 44.625 7.6665 44.625H26.3332C28.8998 44.625 30.9998 42.4125 30.9998 39.7083V10.2083H2.99984V39.7083ZM33.3332 2.83333H25.1665L22.8332 0.375H11.1665L8.83317 2.83333H0.666504V7.75H33.3332V2.83333Z"
          fill="#D25757"
        />
      </svg>
    </div>
  );
}

export default DeleteIcon;
