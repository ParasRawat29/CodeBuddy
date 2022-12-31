import React from "react";

function UpDown({ width, height, style }) {
  return (
    <div style={{ width, height, display: "inline", style: style }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 33 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 30.25C24.0939 30.25 30.25 24.0939 30.25 16.5C30.25 8.90608 24.0939 2.75 16.5 2.75C8.90608 2.75 2.75 8.90608 2.75 16.5C2.75 24.0939 8.90608 30.25 16.5 30.25Z"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M11 14.4375L16.5 19.9375L22 14.4375"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default UpDown;
