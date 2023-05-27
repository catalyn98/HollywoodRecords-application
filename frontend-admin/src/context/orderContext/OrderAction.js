export const getOrdersStart = () => ({
  type: "GET_ORDERS_START",
});

export const getOrdersSuccess = (orders) => ({
  type: "GET_ORDERS_SUCCESS",
  payload: orders,
});

export const getOrdersFailure = () => ({
  type: "GET_ORDERS_FAILURE",
});

export const deleteOrderStart = () => ({
  type: "DELETE_ORDER_START",
});

export const deleteOrderSuccess = (id) => ({
  type: "DELETE_ORDER_SUCCESS",
  payload: id,
});

export const deleteOrderFailure = () => ({
  type: "DELETE_ORDER_FAILURE",
});
