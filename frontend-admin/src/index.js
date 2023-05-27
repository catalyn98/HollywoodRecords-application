import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContextProvider } from "./context/authenticationContext/AuthenticationContext";
import { UserContextProvider } from "./context/userContext/UserContext";
import { OrderContextProvider } from "./context/orderContext/OrderContext";
import { ProductContextProvider } from "./context/productContext/ProductContext";
import { CategoryContextProvider } from "./context/categoryContext/CategoryContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <UserContextProvider>
          <OrderContextProvider>
            <ProductContextProvider>
              <CategoryContextProvider>
                <App />
              </CategoryContextProvider>
            </ProductContextProvider>
          </OrderContextProvider>
        </UserContextProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.Fragment>
);
