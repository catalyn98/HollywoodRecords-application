import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ItemDetails from "../components/itemDetails/ItemDetails";
import Footer from "../components/Footer";

const Container = styled.div``;

const ProductDetails = () => {
  return (
    <Container>
      <NavigationBar />
      <ItemDetails />
      <Footer />
    </Container>
  );
};

export default ProductDetails;
