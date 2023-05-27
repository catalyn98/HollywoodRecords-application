import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavigationBar from "../components/navigationBar/NavigationBar";
import Slider from "../components/slider/Slider";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `;

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getCategoryProduct = async () => {
      try {
        const res = await axios.get("/category-products/");
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryProduct();
  }, []);

  return (
    <>
      <NavigationBar />
      <Slider />
      <Container>
        {items?.map((item, index) => {
          return <Categories key={index} item={item} />;
        })}
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
