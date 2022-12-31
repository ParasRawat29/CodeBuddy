import { configureStore } from "@reduxjs/toolkit";
import codeSlice from "./codeSlice";
import userSlice from "./userSlice";
import loginSlice from "./loginSlice";

const store = configureStore({
  reducer: {
    code: codeSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
  },
});
export default store;
