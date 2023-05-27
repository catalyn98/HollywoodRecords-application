import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from "./CategoryAction";
import axios from "axios";
import notifySuccess from "../../components/notify/notifySuccess";
import notifyError from "../../components/notify/notifyError";

export const getCategoriesProduct = async (dispatch) => {
  dispatch(getCategoriesStart());
  try {
    const res = await axios.get("/category-products/", {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(getCategoriesSuccess(res.data));
  } catch (error) {
    dispatch(getCategoriesFailure());
  }
};

export const createCategoryProduct = async (categoriesMovies, dispatch) => {
  dispatch(createCategoryStart());
  try {
    const res = await axios.post("/category-products/", categoriesMovies, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(createCategorySuccess(res.data));
    notifySuccess("The product category has been created successfully.");
  } catch (error) {
    dispatch(createCategoryFailure());
    notifyError("The product category could not be created.");
  }
};

export const updateCategoryProduct = async (categoriesProduct, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const res = await axios.put(
      "/category-products/" + categoriesProduct._id,
      categoriesProduct,
      {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    dispatch(updateCategorySuccess(res.data));
    notifySuccess("The product category has been updated successfully.");
  } catch (error) {
    dispatch(updateCategoryFailure());
    notifyError("The product category could not be updated.");
  }
};

export const deleteCategoryProduct = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    await axios.delete("/category-products/" + id, {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
    });
    dispatch(deleteCategorySuccess(id));
    notifySuccess("The product category has been deleted successfully.");
  } catch (error) {
    dispatch(deleteCategoryFailure());
    notifyError("The product category could not be deleted.");
  }
};
