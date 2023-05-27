import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthenticationContext } from "../../managing application state/context/AuthenticationContext";
import axios from "axios";
import { addProduct } from "../../managing application state/redux/cartRedux";
import notifyError from "../notify/notifyError";
import { Remove, Add } from "@material-ui/icons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "./itemDetails.css";
import ReactAudioPlayer from "react-audio-player";

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: text;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid black;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 10px;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const ItemDetails = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "decrease") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  const handleNotify = () => {
    notifyError(
      "You must be logged in to be able to add products to the cart."
    );
  };

  return (
    <div className="card-wrapper">
      <div className="cardDetails">
        <div className="product-imgs">
          <div className="img-select">
            <div>
              <img className="albumImage" src={product.cover} alt="album" />
            </div>
          </div>
        </div>
        <div className="product-content">
          <h1 className="product-title">{product.title}</h1>
          <h2>{product.artist}</h2>
          <div className="product-detail">
            <h4>About this item:</h4>
            <p>{product.description}</p>
            <ul>
              <li>
                Music genre: <span>{product.genre}</span>
              </li>
              <li>
                Record company: <span>{product.recordCompany}</span>
              </li>
              <li>
                Release year: <span>{product.releaseYear}</span>
              </li>
              <li>
                Album length: <span>{product.length}</span>
              </li>
              <li>
                Album availability: <span>{product.availability}</span>
              </li>
            </ul>
          </div>
          <div className="product-price">
            <p className="new-price">
              Price: <span>{product.price} RON</span>
            </p>
          </div>
          <ReactAudioPlayer src={product.demo} controls />
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("decrease")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("increase")} />
            </AmountContainer>
            {user ? (
              <Button onClick={handleClick}>Add to cart</Button>
            ) : (
              <Button onClick={handleNotify}>Add to cart</Button>
            )}
          </AddContainer>
          <p>Share At: </p>
          <div className="social-links">
            <a href="facebook.com">
              <FaFacebookF />
            </a>
            <a href="twitter.com">
              <FaTwitter />
            </a>
            <a href="instagram.com">
              <FaInstagram />
            </a>
            <a href="whatsapp.com">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ItemDetails;
