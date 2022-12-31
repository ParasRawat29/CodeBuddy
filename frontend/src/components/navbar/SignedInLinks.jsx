import React from "react";
import { useState } from "react";
import UserIcon from "../../icons/UserIcon";
import { NavLink } from "react-router-dom";
import { handleLogout } from "./logic";
function SignedInLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((pre) => !pre)}
        style={{ background: "inherit" }}
      >
        <UserIcon height="30px" width="30px" />
      </button>
      {open && (
        <ul
          style={{
            color: "white",
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: "1000",
            right: 0,
            background: "rgba(0,0,0,0.3)",
            fontFamily: "Kanit",
            fontSize: "1.2rem",
            padding: "10px",
          }}
        >
          <li style={{ margin: "10px 0" }}>
            <NavLink
              to="/codebase"
              style={{
                color: "white",
                listStyleType: "none",
                textDecoration: "none",
              }}
            >
              codebase
            </NavLink>
          </li>
          <li>
            <button
              style={{
                backgroundColor: "indianred",
                fontSize: "1rem",
                padding: "5px 20px",
                borderRadius: 700,
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SignedInLinks;
