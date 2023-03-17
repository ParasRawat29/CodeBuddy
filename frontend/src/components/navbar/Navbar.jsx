import React from "react";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import "../../styles/navbar.css";
import Heading from "../Heading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Navbar({ showLogo }) {
  const { authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="navbarWrapper">
      <div className="logo">
        {showLogo && (
          <Heading
            fontSize="1.5rem"
            onClick={() => navigate("/")}
            styles={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className="linksList">
        {!authenticated ? <SignedOutLinks /> : <SignedInLinks />}
      </div>
    </div>
  );
}

export default Navbar;
