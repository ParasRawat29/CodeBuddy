import { loginAction } from "../../store/loginSlice";
import store from "../../store/rootReducer";
import { userAction } from "../../store/userSlice";
import { http } from "../../utils/http";

const dispatch = store.dispatch;

export const handleLogin = async (e) => {
  e.preventDefault();
  const st = store.getState();
  const { email, password } = st.login;
  const { data } = await http(`/signin`, "POST", {
    email,
    password,
  });
  if (!data.success) {
  } else {
    clearCredentials();
    dispatch(
      userAction.setProfile({
        authenticated: true,
        name: data.name,
        email: data.email,
      })
    );
  }
};

const clearCredentials = () => {
  dispatch(loginAction.setActive(0));
  dispatch(loginAction.setEmail(""));
  dispatch(loginAction.setPassword(""));
};

export const handleSignup = async (e) => {
  e.preventDefault();
  const st = store.getState();
  const { email, password, username } = st.login;
  const { data } = await http(`register`, "POST", {
    email,
    password,
    name: username,
  });
  if (!data.success) {
  } else {
    clearCredentials();
    dispatch(
      userAction.setProfile({
        authenticated: true,
        name: data.name,
        email: data.email,
      })
    );
  }
};
