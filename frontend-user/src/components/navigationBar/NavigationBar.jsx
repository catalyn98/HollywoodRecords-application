import React, { useContext } from "react";
import { AuthenticationContext } from "../../managing application state/context/AuthenticationContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetCart } from "../../managing application state/redux/cartRedux";
import { logout } from "../../managing application state/context/AuthenticationAction";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Badge } from "@material-ui/core";
import { FaShoppingCart } from "react-icons/fa";
import "./menu.css";

const NavigationBar = () => {
  const { user, dispatch } = useContext(AuthenticationContext);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatchCart = useDispatch();

  const handleLogout = () => {
    dispatchCart(resetCart());
    dispatch(logout());
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/CarouselImages%2Flogo.png?alt=media&token=1436d671-885b-4ac5-9f4b-909cbcae5939"
            alt="Logo"
            className="logo"
          />
        </Link>
        <div className="button-group">
          {user ? (
            <>
              <Link to="/login">
                <Button
                  className="button"
                  variant="outline-dark"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
              <Link to="/products-list">
                <Button className="button" variant="outline-dark">
                  Products list
                </Button>
              </Link>
              <Link to="/my-order">
                <Button className="button" variant="outline-dark">
                  My orders
                </Button>
              </Link>
              <Link to="/cart">
                <Button className="button" variant="outline-dark">
                  {quantity > 0 ? (
                    <Badge
                      badgeContent={quantity}
                      className="black-badge"
                      overlap="rectangular"
                    >
                      <FaShoppingCart />
                    </Badge>
                  ) : (
                    <FaShoppingCart />
                  )}
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/products-list">
                <Button className="button" variant="outline-dark">
                  Products list
                </Button>
              </Link>
              <Link to="/login">
                <Button className="button" variant="outline-dark">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="button" variant="outline-dark">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
