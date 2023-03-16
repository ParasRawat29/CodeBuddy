const { LANGUAGES } = require("../../helper");

export const setCode = (state, action) => {
  state.code = action.payload.code;
};

export const setLanguage = (state, action) => {
  state.language.val = action.payload.val;
  state.language.id = action.payload.id;
};

export const setOutput = (state, action) => {
  state.output = action.payload.output;
};

export const reset = (state, action) => {
  state.code = "";
  state.output = "";
  state.language = { val: LANGUAGES.PYTHON.val, id: LANGUAGES.PYTHON.id };
  state.fileId = null;
  state.fileName = "";
};

export const setFileName = (state, action) => {
  state.fileName = action.payload.fileName;
};

export const setNewFile = (state, action) => {
  state.newFile = action.payload.newFile;
};
export const setFileId = (state, action) => {
  state.fileId = action.payload.id;
};
