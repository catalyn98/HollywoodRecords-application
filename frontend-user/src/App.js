import React, { useContext } from "react";
import { AuthenticationContext } from "./managing application state/context/AuthenticationContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

function App() {
  const { user } = useContext(AuthenticationContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="/all-products" element={<ProductList />} />
      <Route path="/products-list" element={<AllProducts />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="/my-order" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
