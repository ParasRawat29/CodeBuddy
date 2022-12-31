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
  state.language = { val: "py", id: 1 };
};
