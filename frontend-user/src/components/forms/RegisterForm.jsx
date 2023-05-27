import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notifyError from "../../components/notify/notifyError";
import Axios from "axios";
import notifySuccess from "../../components/notify/notifySuccess";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleFinish = async (e) => {
    e.preventDefault();
    if (firstName.length < 3) {
      notifyError("First name must contain at least 3 characters.");
    } else if (lastName.length < 3) {
      notifyError("Last name must contain at least 3 characters.");
    } else if (email.length < 5) {
      notifyError("The email address must contain at least 5 characters.");
    } else if (username.length < 5) {
      notifyError("Username must contain at least 5 characters.");
    } else if (phoneNumber.length !== 10) {
      notifyError("The phone number must contain exactly 10 numbers.");
    } else if (password.length < 8) {
      notifyError("The password must contain at least 8 characters.");
    } else {
      Axios.post("/user/register/", {
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        password,
      })
        .then((res) => {
          if (res.status === 201) {
            notifySuccess(
              "Your account has been successfully created, please login!"
            );
            setTimeout(() => {
              navigate("/login");
            }, 6000);
          }
        })
        .catch(() =>
          notifyError(
            "Your account could not be created. The email address, username or phone number already belong to another user."
          )
        );
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form RegisterForm">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to="/login">
              <span className="link-primary">Login</span>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control mt-1 input-field"
                  placeholder="First name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control mt-1 input-field"
                  placeholder="Last name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control mt-1 input-field"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control mt-1 input-field"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1 input-field"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1 input-field"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 mt-3 container">
            <Link to="/login">
              <Button variant="dark" onClick={handleFinish}>
                Submit
              </Button>
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
