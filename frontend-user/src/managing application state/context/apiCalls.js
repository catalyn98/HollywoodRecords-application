import { loginStart, loginSuccess, loginFailure } from "./AuthenticationAction";
import axios from "axios";
import notifyError from "../../components/notify/notifyError";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/user/login/", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
    dispatch(notifyError("The email address or password is incorrect."));
  }
};
