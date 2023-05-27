import { loginStart, loginSuccess, loginFailure } from "./AuthenticationAction";
import axios from "axios";
import notifyError from "../../components/notify/notifyError";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    console.log(user);
    const res = await axios.post("/user/login/", user);
    res.data.user.role === "admin" && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    notifyError("The email address or password is incorrect.");
  }
};
