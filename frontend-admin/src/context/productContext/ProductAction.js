export const getProductsStart = () => ({
  type: "GET_PRODUCTS_START",
});

export const getProductsSuccess = (products) => ({
  type: "GET_PRODUCTS_SUCCESS",
  payload: products,
});

export const getProductsFailure = () => ({
  type: "GET_PRODUCTS_FAILURE",
});

export const createProductStart = () => ({
  type: "CREATE_PRODUCT_START",
});

export const createProductSuccess = (product) => ({
  type: "CREATE_PRODUCT_SUCCESS",
  payload: product,
});

export const createProductFailure = () => ({
  type: "CREATE_PRODUCT_FAILURE",
});

export const updateProductStart = () => ({
  type: "UPDATE_PRODUCT_START",
});

export const updateProductSuccess = (product) => ({
  type: "UPDATE_PRODUCT_SUCCESS",
  payload: product,
});

export const updateProductFailure = () => ({
  type: "UPDATE_PRODUCT_FAILURE",
});

export const deleteProductStart = () => ({
  type: "DELETE_PRODUCT_START",
});

export const deleteProductSuccess = (id) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: id,
});

export const deleteProductFailure = () => ({
  type: "DELETE_PRODUCT_FAILURE",
});
