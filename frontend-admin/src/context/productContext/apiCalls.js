import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from "./ProductAction";
import axios from "axios";
import notifySuccess from "../../components/notify/notifySuccess";
import notifyError from "../../components/notify/notifyError";

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get("/products/", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await axios.post("/products/", product, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createProductSuccess(res.data));
    notifySuccess("The product has been successfully created.");
  } catch (error) {
    dispatch(createProductFailure());
    notifyError("The product could not be created.");
  }
};

export const updateProduct = async (product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put("/products/" + product._id, product, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(updateProductSuccess(res.data));
    notifySuccess("The product has been successfully updated.");
  } catch (error) {
    dispatch(updateProductFailure);
    notifyError("The product could not be updated.");
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete("/products/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteProductSuccess(id));
    notifySuccess("The product has been successfully deleted.");
  } catch (error) {
    dispatch(deleteProductFailure());
    notifyError("The product could not be deleted.");
  }
};
