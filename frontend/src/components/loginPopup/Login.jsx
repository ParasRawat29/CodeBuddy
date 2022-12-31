import React, { useState } from "react";
import FormInput from "../FormInput";
import ArrowRight from "../../icons/ArrowRight";
import { loginAction } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "./logic";
const INPUTS = [
  {
    id: 1,
    name: "email",
    type: "text",
    placeholder: "Email",
    errorMessage: "Enter Valid email",
    label: "Room Id",
    pattern: "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "",
    label: "Password",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
];

function Login() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.login);
  const handleChange = (e) => {
    if (e.target.name === "email")
      dispatch(loginAction.setEmail(e.target.value));
    else if (e.target.name === "password")
      dispatch(loginAction.setPassword(e.target.value));
  };

  return (
    <form onSubmit={handleLogin}>
      {INPUTS.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={input.name === "email" ? email : password}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className="actionBtn loginBtn"
        style={{ margin: "auto" }}
      >
        Login
        <ArrowRight
          width="50px"
          height="30px"
          margin="0 0 0 1rem"
          color="var(--loginOrangeColor)"
        />
      </button>
      <p className="bottomlink">
        Don't have account
        <span onClick={() => dispatch(loginAction.setActive(2))}> signup</span>
      </p>
    </form>
  );
}

export default Login;
