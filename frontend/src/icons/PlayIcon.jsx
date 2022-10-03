import React from "react";

function PlayIcon({ width, height, color, ...styles }) {
  return (
    <div style={{ width, height, display: "inline", ...styles }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 4V20M20 12L6 20M20 12L6 4"
          stroke="#67DE3D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default PlayIcon;
