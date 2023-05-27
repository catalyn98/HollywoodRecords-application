import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function TopSoldProductsStatistics() {
  const [albumTitle, setAlbumTitle] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTopSoldProducts = async () => {
      try {
        const res = await axios.get("/order/top-sold-products/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        const topSoldProducts = res.data;
        const productNames = topSoldProducts.map((product) => product.title);
        const productQuantities = topSoldProducts.map(
          (product) => product.quantity
        );
        setAlbumTitle(productNames);
        setData(productQuantities);
      } catch (error) {
        console.log(error);
      }
    };
    getTopSoldProducts();
  }, []);

  return (
    <div id="chart">
      <div className="row">
        <div className="mixed-chart" style={{ width: "105vh" }}>
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              title: {
                text: "Best selling products",
                align: "left",
                style: {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                },
              },
              xaxis: {
                categories: albumTitle,
              },
              yaxis: {
                tickAmount: 4,
                labels: {
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                },
              },
            }}
            series={[
              {
                name: "Number of pieces sold",
                data: data,
                color: "#000000",
              },
            ]}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}
