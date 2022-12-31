export const setUsername = (state, action) => {
  state.username = action.payload;
};

export const setEmail = (state, action) => {
  state.email = action.payload;
};

export const setPassword = (state, action) => {
  state.password = action.payload;
};

export const setActive = (state, action) => {
  state.active = action.payload;
};
