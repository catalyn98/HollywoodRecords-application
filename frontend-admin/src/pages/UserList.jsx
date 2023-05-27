import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { getUsers, deleteUser } from "../context/userContext/apiCalls";
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
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="page-content">
        <TopBar />
        <div className="table-container">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Phone number</th>
                <th scope="col">Created at</th>
                <th scope="col">Delete</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {item.firstName} {item.lastName}
                          </p>
                          <p className="text-muted mb-0">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.username}</p>
                      <p className="fw-normal mb-1"></p>
                    </td>
                    <td className="centerInfo">
                      <p className="fw-normal mb-1">{item.phoneNumber}</p>
                    </td>
                    <td className="centerInfo">
                      {Moment(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </td>
                    <td className="centerInfo">
                      <button
                        className="btn btn-outline-primary btn-red "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
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
