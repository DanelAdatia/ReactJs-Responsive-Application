import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const PieChart = ({ sharedPostsCount, newPostsCount }) => {
  const data = {
    labels: ["Shared Posts", "New Posts"],

    datasets: [
      {
        data: [sharedPostsCount, newPostsCount],
        backgroundColor: ["#f5b0cb", "#fa198b"],
      },
    ],
  };

  return <Chart type="pie" data={data} />;
};

export default PieChart;
