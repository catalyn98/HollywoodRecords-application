import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { sliderItems } from "../../data";
import "./slider.css";

const Slider = () => {
  return (
    <Carousel fade>
      {sliderItems.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.image}
            style={{ maxHeight: "cover", maxWidth: "100%" }}
            alt="artist"
          />
          <Carousel.Caption>
            <h3 className="artistName">{item.title}</h3>
            <p className="artistDescription">{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
