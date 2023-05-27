import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../context/authenticationContext/AuthenticationContext";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../context/authenticationContext/AuthenticationAction";

export default function TopBar() {
  const { dispatch } = useContext(AuthenticationContext);
  const [showBasic, setShowBasic] = useState(false);

  return (
    <div className="header">
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <h3>Admin</h3>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <TiThMenu />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="nav-link">
                <Link className="myLink" to="/">
                  Dashboard
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-link">
                <Link className="myLink" to="/users-list">
                  Users list
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-link">
                <Link className="myLink" to="/orders-list">
                  Orders list
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Products
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className="dropdown-item">
                      <Link className="myLink" to="/products-list">
                        Products list
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem className="dropdown-item">
                      <Link className="myLink" to="/add-product">
                        Add product
                      </Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Category products
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className="dropdown-item">
                      <Link className="myLink" to="/categories-list">
                        Categories products list
                      </Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem className="dropdown-item">
                      <Link className="myLink" to="/add-category">
                        Add category product
                      </Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem className="nav-link">
                <Link className="myLink" to="/login">
                  <AiOutlineLogout onClick={() => dispatch(logout())} />
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
