import { createContext, useReducer } from "react";
import ProductReducer from "./ProductReducer";

const INITIAL_STATE = {
  products: [],
  isFetching: false,
  error: false,
};

export const ProductContext = createContext(INITIAL_STATE);

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
