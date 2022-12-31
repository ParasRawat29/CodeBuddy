import React from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../store/loginSlice";

function SignedOutLinks() {
  const dispatch = useDispatch();
  return (
    <div className="signedOutLinkList">
      <button
        className="actionBtn loginBtn"
        onClick={() => dispatch(loginAction.setActive(1))}
      >
        Login
      </button>
    </div>
  );
}

export default SignedOutLinks;
