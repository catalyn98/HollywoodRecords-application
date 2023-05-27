import {
  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
} from "./OrderAction";
import axios from "axios";
import notifySuccess from "../../components/notify/notifySuccess";
import notifyError from "../../components/notify/notifyError";

export const getOrders = async (dispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await axios.get("/order/", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getOrdersSuccess(res.data));
  } catch (error) {
    dispatch(getOrdersFailure());
  }
};

export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    await axios.delete("/order/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteOrderSuccess(id));
    notifySuccess("The order has been successfully deleted.");
  } catch (error) {
    dispatch(deleteOrderFailure());
    notifyError("The order could not be deleted.");
  }
};
