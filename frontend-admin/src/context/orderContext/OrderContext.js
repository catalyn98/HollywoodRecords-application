import { createContext, useReducer } from "react";
import OrderReducer from "./OrderReducer";

const INITIAL_STATE = {
  orders: [],
  isFetching: false,
  error: false,
};

export const OrderContext = createContext(INITIAL_STATE);

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, INITIAL_STATE);

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
