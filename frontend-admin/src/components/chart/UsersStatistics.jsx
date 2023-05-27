import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function UsersStatistics() {
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

  const [, setUserStatistics] = useState([]);
  const [month, setMonth] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsersStatistics = async () => {
      const month = [];
      const numberOfUsers = [];
      try {
        const res = await axios.get("/user/statistics/", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("user")).token,
          },
        });
        const statisticsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statisticsList?.map((item) =>
          setUserStatistics((prev) => [
            ...prev,
            {
              name: month.push(MONTHS[item._id - 1]),
              "New User": numberOfUsers.push(item.total),
            },
          ])
        );
        setMonth(month);
        setData(numberOfUsers);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersStatistics();
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
                text: "Users statistics",
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
                name: "Number of users",
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
