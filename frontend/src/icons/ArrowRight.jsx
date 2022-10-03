import React from "react";

function ArrowRightGreen({ width, height, color, ...styles }) {
  return (
    <div style={{ width, height, display: "inline", ...styles }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 90 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 25.5H57.5M37.375 10.625L57.5 25.5L37.375 40.375"
          stroke={color}
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default ArrowRightGreen;
