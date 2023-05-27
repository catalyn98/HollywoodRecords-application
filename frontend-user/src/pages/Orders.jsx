import React, { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../managing application state/context/AuthenticationContext";
import axios from "axios";
import NavigationBar from "../components/navigationBar/NavigationBar";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Moment from "moment";
import Footer from "../components/Footer";

const Orders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const res = await axios.get(`/order/find/${user.user._id}`);
        const orders = res.data;
        const productsWithOrders = [];
        for (const order of orders) {
          for (const product of order.products) {
            const productResponse = await axios.get(
              `/products/find/${product.productId}`
            );
            const productDetails = productResponse.data;
            productsWithOrders.push({ order, productDetails });
          }
        }
        const reversedOrders = productsWithOrders.reverse();
        setMyOrders(reversedOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getMyOrders();
  }, [user]);

  return (
    <div>
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
                            Go to shopping
                          </Link>
                        </MDBTypography>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h4 className="mb-1">My orders</h4>
                          </div>
                        </div>
                        {myOrders.length > 0 ? (
                          <>
                            {myOrders.map((order, index) => (
                              <MDBCard className="mb-3" key={index}>
                                <MDBCardBody>
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                      <div>
                                        <MDBCardImage
                                          src={order.productDetails.cover}
                                          className="rounded-3"
                                          style={{ width: "100px" }}
                                          alt="Shopping item"
                                          overlap="rectangular"
                                        />
                                      </div>
                                      <div className="ms-3">
                                        <MDBTypography tag="h5">
                                          {order.productDetails.title},{" "}
                                          {order.productDetails.artist}
                                        </MDBTypography>
                                        <p className="small mb-0">
                                          {order.productDetails.genre
                                            .charAt(0)
                                            .toUpperCase() +
                                            order.productDetails.genre.slice(1)}
                                          , {order.productDetails.recordCompany}
                                          , {order.productDetails.availability},{" "}
                                          {Moment(order.order.createdAt).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                            ))}
                          </>
                        ) : (
                          <div>
                            <div>
                              <p>You have not placed any orders yet.</p>
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
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
