import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function IncomeStatistics() {
  const MONTHS = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const [, setIncomeStatistics] = useState([]);
  const [month, setMonth] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getIncomeStatistics = async () => {
      const month = [];
      const profit = [];
      try {
        const res = await axios.get("/order/income/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        const statisticsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statisticsList?.map((item) =>
          setIncomeStatistics((prev) => [
            ...prev,
            {
              name: month.push(MONTHS[item._id - 1]),
              Income: profit.push(item.total),
            },
          ])
        );
        setMonth(month);
        setData(profit);
      } catch (error) {
        console.log(error);
      }
    };
    getIncomeStatistics();
  }, [MONTHS]);

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
                text: "Income statistics",
                align: "left",
                style: {
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                },
              },
              xaxis: {
                categories: month,
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
                name: "Income",
                data: data,
                color: "#000000",
              },
            ]}
            type="line"
          />
        </div>
      </div>
    </div>
  );
}
