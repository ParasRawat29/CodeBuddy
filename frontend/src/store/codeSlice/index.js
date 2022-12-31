const { createSlice } = require("@reduxjs/toolkit");
const { setCode, setLanguage, setOutput, reset } = require("./reducer");
const codeSlice = createSlice({
  name: "code",
  initialState: {
    code: "",
    language: { val: "py", id: 1 },
    output: "",
  },
  reducers: {
    setCode,
    setLanguage,
    setOutput,
    reset,
  },
});

export const codeActions = codeSlice.actions;
export default codeSlice;
