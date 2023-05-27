import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notifyError from "../../components/notify/notifyError";
import Axios from "axios";
import notifySuccess from "../../components/notify/notifySuccess";
import Button from "react-bootstrap/Button";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./form.css";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    if (email.length === 0) {
      notifyError("Enter your email address.");
    } else {
      Axios.post("/user/reset-password", { email })
        .then((res) => {
          if (res.status === 200) {
            notifySuccess(
              "An email with reset instructions has been sent to " + email + "."
            );
            const inputs = document.querySelectorAll("#email");
            inputs.forEach((input) => {
              input.value = "";
            });
            setTimeout(() => {
              navigate("/login");
            }, 6000);
          }
        })
        .catch(() => notifyError("This email address does not exist."));
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Forgot your password?</h3>
          <div className="text-center">
            That's okay, it happens! Enter your email address and click on the
            button below to reset your password.{" "}
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control input-field"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3 container">
            <Link to="/login">
              <Button className="button" variant="dark" onClick={sendEmail}>
                Submit
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <p className="forgot-password text-right mt-2">
              Return to <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordForm;
