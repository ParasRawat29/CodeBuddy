import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../styles/navbar.css";
import Heading from "../Heading";
import { useSelector } from "react-redux";
function Navbar({ showLogo }) {
  const { authenticated } = useSelector((state) => state.user);
  return (
    <div className="navbarWrapper">
      <div className="logo">{showLogo && <Heading fontSize="1.5rem" />}</div>
      <div className="linksList">
        {!authenticated ? <SignedOutLinks /> : <SignedInLinks />}
      </div>
    </div>
  );
}

export default Navbar;
