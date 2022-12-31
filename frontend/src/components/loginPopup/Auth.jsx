import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/loginSlice";
import Login from "./Login";
import Signup from "./Signup";

function Auth() {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.login);
  return (
    <div id="myModal" className="modal">
      <div className="modal-content transparentCard">
        <span
          className="close"
          onClick={() => dispatch(loginAction.setActive(0))}
        >
          &times;
        </span>
        {active === 1 && <Login />}
        {active === 2 && <Signup />}
      </div>
    </div>
  );
}

export default Auth;
