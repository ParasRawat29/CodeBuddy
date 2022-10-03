import React from "react";

function Heading({ fontSize, shadow = false }) {
  const styles = {
    fontSize,
    textShadow: shadow ? "0px 0px 114px #60f2f2" : "",
  };

  return (
    <h1 className="peerheading" style={styles}>
      PEER CODING
    </h1>
  );
}

export default Heading;
