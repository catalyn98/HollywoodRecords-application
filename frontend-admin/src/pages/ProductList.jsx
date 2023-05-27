import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext/ProductContext";
import { getProducts, deleteProduct } from "../context/productContext/apiCalls";
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
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function ProductList() {
  const { products, dispatch } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
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
                <th scope="col">Album and artist</th>
                <th scope="col">Genre</th>
                <th scope="col">Record company</th>
                <th scope="col">Release year</th>
                <th scope="col">Price</th>
                <th scope="col">Created at</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {products
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.cover}
                          alt=""
                          style={{ width: "65px", height: "65px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{item.title}</p>
                          <p className="text-muted mb-0">{item.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="centerInfo">
                      <p>{item.genre}</p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.recordCompany}</p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.releaseYear}</p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.price} RON</p>
                    </td>
                    <td className="centerInfo">
                      {Moment(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </td>
                    <td className="centerInfo">
                      <Link
                        to={{
                          pathname: `/update-product/${item._id}`,
                        }}
                        state={{ product: item }}
                        style={{ marginRight: 25 }}
                      >
                        <Button variant="outline-primary">Edit</Button>
                      </Link>{" "}
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
