import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { RiAlbumFill } from "react-icons/ri";
import { GiProfit } from "react-icons/gi";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  const [totalNumberOfUsers, setTotalNumberOfUsers] = useState();
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState();
  const [totalProfit, setTotalProfit] = useState();

  useEffect(() => {
    const getTotalNumberOfUsers = async () => {
      try {
        const res = await axios.get("/user/total-number-of-users/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        setTotalNumberOfUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalNumberOfProducts = async () => {
      try {
        const res = await axios.get("/products/total-number-of-products/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        setTotalNumberOfProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getTotalProfit = async () => {
      try {
        const res = await axios.get("/order/profit/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        setTotalProfit(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalNumberOfUsers();
    getTotalNumberOfProducts();
    getTotalProfit();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total registered users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <FaUser /> {totalNumberOfUsers}
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">
          Total number of products available for sale
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <RiAlbumFill /> {totalNumberOfProducts}
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total profit for this month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            <GiProfit /> {totalProfit} RON
          </span>
        </div>
      </div>
    </div>
  );
}
