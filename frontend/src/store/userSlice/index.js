import { createSlice } from "@reduxjs/toolkit";
import { setProfile } from "./reducers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    authenticated: false,
    email: "",
  },
  reducers: {
    setProfile,
  },
});

export const userAction = userSlice.actions;
export default userSlice;
