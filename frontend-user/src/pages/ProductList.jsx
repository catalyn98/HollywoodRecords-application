import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import NavigationBar from "../components/navigationBar/NavigationBar";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Container = styled.div``;

const Title = styled.h1`
  margin: 15px;
  margin-left: 47px;
  color: 12263a;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 26px;
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

const Select = styled.select`
  padding: 5px;
  margin-right: 20px;
  @media only screen and (max-width: 678px) {
    margin: 10px 0px;
  }
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get("genre");
  const [sort, setSort] = useState("newest");

  return (
    <Container>
      <NavigationBar />
      <Title>{genre.charAt(0).toUpperCase() + genre.slice(1)} music</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Sort products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="ascendent">Price (ascendent)</Option>
            <Option value="descendent">Price (descendent)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products genre={genre} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;
