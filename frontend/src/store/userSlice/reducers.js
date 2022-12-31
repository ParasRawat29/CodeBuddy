export const setProfile = (state, action) => {
  state.name = action.payload.name;
  state.email = action.payload.email;
  state.authenticated = action.payload.authenticated;
};
