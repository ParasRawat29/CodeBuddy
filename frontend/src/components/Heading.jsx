import React from "react";

function Heading({ fontSize, onClick, styles, shadow = false }) {
  const stylesHandler = {
    fontSize,
    textShadow: shadow ? "0px 0px 114px #60f2f2" : "",
    ...styles,
  };

  return (
    <h1 className="peerheading" style={stylesHandler} onClick={() => onClick()}>
      PEER CODING
    </h1>
  );
}

export default Heading;
