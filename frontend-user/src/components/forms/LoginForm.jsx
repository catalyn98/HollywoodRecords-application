import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../managing application state/context/AuthenticationContext";
import { login } from "../../managing application state/context/apiCalls";
import notifyError from "../../components/notify/notifyError";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";

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
            Not registered yet?{" "}
            <Link to="/register">
              <span className="link-primary">Register</span>
            </Link>
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
          <div className="text-center">
            <p className="forgot-password text-right mt-2">
              Forgot <Link to="/forgot-password">password?</Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
