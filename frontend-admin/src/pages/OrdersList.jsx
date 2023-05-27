import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/orderContext/OrderContext";
import { getOrders, deleteOrder } from "../context/orderContext/apiCalls";
import TopBar from "../components/TopBar";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
} from "mdbreact";
import Moment from "moment";
import { Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function OrdersList() {
  const { orders, dispatch } = useContext(OrderContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="page-content">
        <TopBar />
        <div className="table-container">
          <MDBTable align="middle" className="custom-table">
            <MDBTableHead>
              <tr>
                <th scope="col">ID order</th>
                <th scope="col">ID customer</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Created at</th>
                <th scope="col">Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {orders
                .reverse()
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-normal mb-1">{item._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.userId}</p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.amount} RON</p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.status}</p>
                    </td>
                    <td className="centerInfo">
                      {Moment(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </td>
                    <td className="centerInfo">
                      <Button
                        variant="outline-primary"
                        className="btn-red"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
        </div>
        <MDBPagination className="mt-4 justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <MDBPageItem
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                <MDBPageNav className="MDBPageItemCustom">
                  {pageNumber}
                </MDBPageNav>
              </MDBPageItem>
            )
          )}
        </MDBPagination>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}
