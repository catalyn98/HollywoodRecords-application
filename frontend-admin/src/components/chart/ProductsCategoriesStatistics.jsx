import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function ProductsCategoriesStatistics() {
  const [, setProductsStatistics] = useState([]);
  const [genre, setGenre] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMoviesStatistics = async () => {
      const genre = [];
      const numberProducts = [];
      try {
        const res = await axios.get("/products/statistics/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        const statisticsList = res.data.sort(function (a, b) {
          return a.total - b.total;
        });
        statisticsList?.map((item) =>
          setProductsStatistics((prev) => [
            ...prev,
            {
              name: genre.push([item._id._id]),
              "New Movie": numberProducts.push(item.total),
            },
          ])
        );
        setGenre(genre);
        setData(numberProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getMoviesStatistics();
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart" style={{ width: "105vh" }}>
          <Chart
            options={{
              chart: {
                id: "basic-bar",
              },
              title: {
                text: "Number of albums according to genre",
                align: "left",
                style: {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                },
              },
              yaxis: {
                tickAmount: 4,
                labels: {
                  formatter: function (val) {
                    return val.toFixed(0);
                  },
                },
              },
              xaxis: {
                categories: genre,
              },
            }}
            series={[
              {
                name: "Number of products",
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
