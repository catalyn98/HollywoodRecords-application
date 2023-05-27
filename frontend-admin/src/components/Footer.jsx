import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <div className="text-center p-4" style={{ backgroundColor: "light" }}>
        © 2023 Copyright{" "}
        <a className="text-reset fw-bold" href="/">
          Hollywood Records
        </a>
      </div>
    </MDBFooter>
  );
}
