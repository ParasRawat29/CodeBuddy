const { createSlice } = require("@reduxjs/toolkit");
const {
  setCode,
  setLanguage,
  setOutput,
  reset,
  setFileName,
  setNewFile,
  setFileId,
} = require("./reducer");
const { LANGUAGES } = require("../../helper");
const codeInSession = sessionStorage.getItem("code");
const fileNameInSession = sessionStorage.getItem("ofn");

const codeSlice = createSlice({
  name: "code",
  initialState: {
    code: codeInSession ? codeInSession : "",
    // language: { val: "py", id: 1 },
    language: { val: LANGUAGES.PYTHON.val, id: LANGUAGES.PYTHON.id },
    output: "",
    fileName: fileNameInSession ? fileNameInSession : "",
    newFile: true,
    fileId: null,
  },
  reducers: {
    setCode,
    setLanguage,
    setOutput,
    setFileName,
    setNewFile,
    setFileId,
    reset,
  },
});

export const codeActions = codeSlice.actions;
export default codeSlice;
