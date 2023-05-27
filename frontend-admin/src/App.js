import React, { useContext } from "react";
import { AuthenticationContext } from "./context/authenticationContext/AuthenticationContext";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/Login";
import Home from "./pages/home/Home";
import UserList from "./pages/UserList";
import OrdersList from "./pages/OrdersList";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import CategoryProductList from "./pages/CategoryProductList";
import AddCategoryProduct from "./pages/AddCategoryProduct";
import UpdateCategoryProduct from "./pages/UpdateCategoryProduct";
import "./app.css";

function App() {
  const { user } = useContext(AuthenticationContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <LoginForm />}
      />
      {user && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Home />} />
          <Route path="/users-list" element={<UserList />} />
          <Route path="/orders-list" element={<OrdersList />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/categories-list" element={<CategoryProductList />} />
          <Route path="/add-category" element={<AddCategoryProduct />} />
          <Route
            path="/update-category/:id"
            element={<UpdateCategoryProduct />}
          />
        </>
      )}
      {!user && (
        <>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users-list" element={<LoginForm />} />
          <Route path="/orders-list" element={<LoginForm />} />
          <Route path="/products-list" element={<LoginForm />} />
          <Route path="/add-product" element={<LoginForm />} />
          <Route path="/update-product/:id" element={<LoginForm />} />
          <Route path="/categories-list" element={<LoginForm />} />
          <Route path="/add-category" element={<LoginForm />} />
          <Route path="/update-category/:id" element={<LoginForm />} />
        </>
      )}
    </Routes>
  );
}

export default App;
