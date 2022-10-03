import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../styles/navbar.css";
import Heading from "../Heading";
function Navbar() {
  const login = true;
  return (
    <div className="navbarWrapper">
      <div className="logo">
        <Heading fontSize="1.5rem" />
      </div>
      <div className="linksList">
        {login ? <SignedOutLinks /> : <SignedInLinks />}
      </div>
    </div>
  );
}

export default Navbar;
