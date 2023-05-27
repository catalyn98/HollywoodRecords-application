import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MDBInput, MDBCol } from "mdbreact";
import ProductItem from "./ProductItem";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  @media only screen and (max-width: 678px) {
    width: 0px 20px;
    display: flex;
    flex-direction: column;
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  @media only screen and (max-width: 678px) {
    margin-right: 0px;
  }
`;

const Products = ({ genre, sort }) => {
  const [items, setItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getProductsList = async () => {
      try {
        const res = await axios.get(
          `products${genre ? "?genre=" + genre : ""}`
        );
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsList();
  }, [genre]);

  useEffect(() => {
    let sortedProducts = [...items];
    if (sort === "newest") {
      sortedProducts.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "ascendent") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  }, [sort, items]);

  useEffect(() => {
    const handleSearch = () => {
      const filteredItems = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filteredItems);
    };
    handleSearch();
  }, [searchTerm, items]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div style={{ marginLeft: "45px" }}>
        <Filter style={{ margin: "0px" }}>
          <FilterText>Search album:</FilterText>
          <MDBCol>
            <MDBInput
              className="focusInput"
              style={{ width: "315px" }}
              hint="Artist or title"
              type="text"
              value={searchTerm}
              onChange={handleChange}
            />
          </MDBCol>
        </Filter>
      </div>
      <Container>
        {filteredProducts.map((item, index) => (
          <ProductItem item={item} key={index} />
        ))}
      </Container>
    </>
  );
};

export default Products;
