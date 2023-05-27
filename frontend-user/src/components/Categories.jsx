import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  justify-content: space-evenly;
  text-align: center;
  display: inline-flex;
  margin: 15px;
  height: 60vh;
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
`;

const Categories = ({ item }) => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    const genre = item.genre;
    navigate(`/all-products${genre ? "?genre=" + genre : ""}`);
  };

  return (
    <Container>
      <Image src={item.image} />
      <Info>
        <Title>{item.title}</Title>
        <Button onClick={handleShopNowClick}>Shop now</Button>
      </Info>
    </Container>
  );
};

export default Categories;
