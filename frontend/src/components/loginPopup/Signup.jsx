import React, { useState } from "react";
import FormInput from "../FormInput";
import ArrowRight from "../../icons/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/loginSlice";
import { handleSignup } from "./logic";

const INPUTS = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    label: "Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    pattern: "^[A-Za-z0-9 ]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "text",
    placeholder: "Email",
    label: "Email",
    errorMessage: "Enter Valid email id",
    pattern: "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
];

function Signup() {
  const dispatch = useDispatch();
  const { email, password, username } = useSelector((state) => state.login);
  const values = {
    email: email,
    password: password,
    username: username,
  };

  const handleChange = (e) => {
    if (e.target.name === "email")
      dispatch(loginAction.setEmail(e.target.value));
    else if (e.target.name === "password")
      dispatch(loginAction.setPassword(e.target.value));
    else if (e.target.name === "username")
      dispatch(loginAction.setUsername(e.target.value));
  };

  return (
    <form onSubmit={handleSignup}>
      {INPUTS.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={handleChange}
        />
      ))}
      <button
        type="submit"
        className="actionBtn loginBtn"
        style={{ margin: "auto" }}
      >
        Signup
        <ArrowRight
          width="50px"
          height="30px"
          margin="0 0 0 1rem"
          color="var(--loginOrangeColor)"
        />
      </button>
      <p className="bottomlink">
        Already have account
        <span onClick={() => dispatch(loginAction.setActive(1))}> login</span>
      </p>
    </form>
  );
}

export default Signup;
