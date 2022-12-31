import { createSlice } from "@reduxjs/toolkit";
import { setUsername, setEmail, setPassword, setActive } from "./reducers";

const loginSlice = createSlice({
  name: "loginScreenActive",
  initialState: {
    active: 0,
    username: "",
    email: "",
    password: "",
  },
  reducers: {
    setUsername,
    setEmail,
    setPassword,
    setActive,
  },
});
export const loginAction = loginSlice.actions;
export default loginSlice;
