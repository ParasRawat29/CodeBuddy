import store from "./store/rootReducer";
import { userAction } from "./store/userSlice";
import { http } from "./utils/http";

export const loadUser = async () => {
  const dispatch = store.dispatch;
  try {
    const { data } = await http(`/profile`, "GET");
    if (!data.success) {
      dispatch(
        userAction.setProfile({ authenticated: false, email: "", name: "" })
      );
    } else {
      dispatch(
        userAction.setProfile({
          authenticated: true,
          email: data.user.email,
          name: data.user.name,
        })
      );
    }
  } catch (error) {
    dispatch(
      userAction.setProfile({ authenticated: false, email: "", name: "" })
    );
  }
};
