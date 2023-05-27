import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../managing application state/context/AuthenticationContext";
import { resetCart } from "../managing application state/redux/cartRedux";
import { removeProduct } from "../managing application state/redux/cartRedux";
import axios from "axios";
import NavigationBar from "../components/navigationBar/NavigationBar";
import { HiArrowNarrowLeft } from "react-icons/hi";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FaTrash } from "react-icons/fa";
import StripeCheckout from "react-stripe-checkout";
import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const KEY =
    "pk_test_51N9z0bJdDqUUNKlFQmciF7Y6lCab9kbroabDmc2PsTVkaW3C6BB5qvT0S7vSmSGU9Vl5Rky6Vs4BjGQb7PS9Di5Y00knq5Az7Q";
  const { user } = useContext(AuthenticationContext);
  const dispatchCart = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeProduct(product));
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: (cart.total + 20) * 100,
        });
        await axios.post("/order/", {
          userId: user.user._id,
          products: cart.products.map((product) => ({
            productId: product._id,
            quantity: product.quantity,
          })),
          amount: cart.total + 20,
          status: "completed",
        });
        navigate("/", {
          stripeData: res.data,
          products: cart,
        });
        dispatchCart(resetCart());
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, user, navigate, dispatchCart]);

  return (
    <>
      <NavigationBar />
      <div className="page-content">
        <section className="h-100 h-custom">
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol>
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <MDBRow>
                      <MDBCol lg="14">
                        <MDBTypography tag="h5">
                          <HiArrowNarrowLeft />{" "}
                          <Link className="myLink" to="/">
                            Continue shopping
                          </Link>
                        </MDBTypography>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="mb-1">My shopping cart</h5>
                            <p className="mb-0">
                              You have {cart.products.length} items in your
                              cart.
                            </p>
                          </div>
                        </div>
                        {cart.products.length > 0 ? (
                          <>
                            {cart.products.map((product, index) => (
                              <MDBCard className="mb-3" key={index}>
                                <MDBCardBody>
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <MDBCardImage
                                          src={product.cover}
                                          className="rounded-3"
                                          style={{ width: "175px" }}
                                          alt="Shopping item"
                                          overlap="rectangular"
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <MDBTypography tag="h5">
                                          {product.title}, {product.artist}
                                        </MDBTypography>
                                        <p className="small mb-0">
                                          {product.genre
                                            .charAt(0)
                                            .toUpperCase() +
                                            product.genre.slice(1)}
                                          , {product.recordCompany},{" "}
                                          {product.availability},{" "}
                                          {product.releaseYear}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <div style={{ width: "50px" }}>
                                        <MDBTypography
                                          tag="h5"
                                          className="fw-normal mb-0"
                                        >
                                          {product.quantity}
                                        </MDBTypography>
                                      </div>
                                      <div style={{ width: "80px" }}>
                                        <MDBTypography
                                          tag="h5"
                                          className="mb-0"
                                        >
                                          {product.price * product.quantity} RON
                                        </MDBTypography>
                                      </div>
                                      <FaTrash
                                        onClick={() => handleRemove(product)}
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                            ))}
                          </>
                        ) : (
                          <div>
                            <div>
                              <p>
                                There are currently no products added to the
                                cart.
                              </p>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <img
                                src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/CarouselImages%2FplaceholderMusic.jpg?alt=media&token=a8edaa1f-3d8c-4fdf-adc7-f9d3c21748f5"
                                className="rounded-3"
                                style={{ width: "175px" }}
                                alt="Shopping item"
                              />
                            </div>
                          </div>
                        )}
                      </MDBCol>
                      {cart.products.length > 0 && (
                        <MDBCol lg="5">
                          <MDBCard className="text-black rounded-3">
                            <MDBCardBody>
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBTypography tag="h5" className="mb-0">
                                  Payment
                                </MDBTypography>
                              </div>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Subtotal</p>
                                <p className="mb-2">{cart.total} RON</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Shipping</p>
                                <p className="mb-2">20 RON</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Total (Incl. taxes)</p>
                                <p className="mb-2">{cart.total + 20} RON</p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <StripeCheckout
                                  name="Hollywood Records"
                                  image="https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770283101-36J6KM8EIK71FOCGGDM2/album-placeholder.png?format=500w"
                                  billingAddress
                                  shippingAddress
                                  email={user.user.email}
                                  description={`Your total is ${cart.total} RON`}
                                  amount={cart.total * 100}
                                  token={onToken}
                                  stripeKey={KEY}
                                >
                                  <Button
                                    className="button"
                                    variant="outline-dark"
                                    style={{ marginLeft: "0px" }}
                                  >
                                    Checkout
                                  </Button>
                                </StripeCheckout>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      )}
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
