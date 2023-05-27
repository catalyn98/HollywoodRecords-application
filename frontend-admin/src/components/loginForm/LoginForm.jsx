import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../context/authenticationContext/AuthenticationContext";
import notifyError from "../notify/notifyError";
import { login } from "../../context/authenticationContext/apiCalls";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthenticationContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      notifyError("Enter email address.");
    } else if (password.length === 0) {
      notifyError("Enter password.");
    } else {
      login({ email, password }, dispatch);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="text-center">
            Your account must be an administrator account to be able to access
            the dashboard.
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1 input-field"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1 input-field"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3 container">
            <Button className="button" variant="dark" onClick={handleLogin}>
              Submit
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
