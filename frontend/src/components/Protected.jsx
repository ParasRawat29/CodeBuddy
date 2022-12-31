import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginAction } from "../store/loginSlice";

function Protected({ authenticated, children }) {
  const dispatch = useDispatch();

  if (!authenticated) {
    dispatch(loginAction.setActive(1));
    return <Navigate to="/" />;
  }

  return children;
}

export default Protected;
