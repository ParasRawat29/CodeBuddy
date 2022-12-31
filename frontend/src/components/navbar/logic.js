import axios from "axios";
import store from "../../store/rootReducer";
import { userAction } from "../../store/userSlice";

const dispatch = store.dispatch;
export const handleLogout = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}logout`
    );
    dispatch(
      userAction.setProfile({ name: "", email: "", authenticated: false })
    );
    // logout succesfull
  } catch (err) {
    console.log("error in logout");
  }
};
