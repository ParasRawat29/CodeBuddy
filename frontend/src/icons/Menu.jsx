import React from "react";

function Menu({ width, height, color, ...styles }) {
  return (
    <div style={{ width, height, display: "inline", ...styles }}>
      <svg width={width} height={height} viewBox="0 0 64.000000 64.000000">
        <g
          transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none"
        >
          <path
            d="M12 548 c-16 -16 -15 -43 2 -57 9 -8 100 -11 311 -9 271 3 299 5 309
21 8 12 8 22 0 35 -10 15 -38 17 -310 20 -225 2 -303 -1 -312 -10z"
          />
          <path
            d="M12 348 c-16 -16 -15 -43 2 -57 9 -8 100 -11 311 -9 271 3 299 5 309
21 8 12 8 22 0 35 -10 15 -38 17 -310 20 -225 2 -303 -1 -312 -10z"
          />
          <path
            d="M12 148 c-16 -16 -15 -43 2 -57 9 -8 100 -11 311 -9 271 3 299 5 309
21 8 12 8 22 0 35 -10 15 -38 17 -310 20 -225 2 -303 -1 -312 -10z"
          />
        </g>
      </svg>
    </div>
  );
}

export default Menu;
