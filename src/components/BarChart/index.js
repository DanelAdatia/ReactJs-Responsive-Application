import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ likeCount, commentsCount, shareCount }) => {
  const options = {
    scales: {
      yAxes: [
        {
          position: "right",
        },
      ],
    },
  };
  const data = {
    labels: ["Likes", "Shares", "Comments"],
    datasets: [
      {
        label: "Analytics",
        data: [likeCount, commentsCount, shareCount],
        backgroundColor: ["#ffc4eb", "#ffe4fa", "#f1dedc"],
        fill: true,
        borderColor: "#742774",
      },
    ],
  };

  return <Bar data={data} options={options} width={100} />;
};

export default BarChart;
