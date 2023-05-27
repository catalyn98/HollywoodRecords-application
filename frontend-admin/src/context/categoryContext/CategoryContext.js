import { createContext, useReducer } from "react";
import CategoryReducer from "./CategoryReducer";

const INITIAL_STATE = {
  categoriesProduct: [],
  isFetching: false,
  error: false,
};

export const CategoryContext = createContext(INITIAL_STATE);

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);

  return (
    <CategoryContext.Provider
      value={{
        categoriesProduct: state.categoriesProduct,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
