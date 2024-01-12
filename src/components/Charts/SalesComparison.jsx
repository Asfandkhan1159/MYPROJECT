import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent } from '@mui/material';
const SalesComparison = () => {
  const chartOptions = {
    chart: {
      type: "column",
      height: 300,
      width: 500,
    },
    title: {
      text: "Sales Target vs Reality",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
      },
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          color: "#333",
        },
      },
    },
    yAxis: {
      title: {
        text: "Value",
        style: {
          color: "#333",
        },
      },
      labels: {
        style: {
          color: "#333",
        },
      },
    },
    tooltip: {
      formatter: function () {
        const seriesName = this.series.name;
        const pointValue = this.y;
        return `<b>${seriesName}</b>: $${pointValue}K`;
      },
    },
    series: [
      {
        name: "Actual",
        data: [5, 10, 15, 20, 25],
        color: "#5f98cd",
      },
      {
        name: "Target",
        data: [10, 15, 20, 25, 30],
        color: "#ff7f50",
      },
    ],
  };

  return (
  
      <Card>
      <CardContent>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </CardContent>
    </Card>
 
  );
};

export default SalesComparison;
