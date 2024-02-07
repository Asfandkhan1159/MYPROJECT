import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, useTheme, useMediaQuery } from '@mui/material';
const SalesComparison = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const chartOptions = {
    chart: {
      type: "column",
      height:smScreen ? 300 : 361,
      width: smScreen ? 300 : 600 ,
    
    },
    title: {
      text: "Sales Target vs Reality ",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333"
      }
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"

      ],
      labels: {
        style: {
          color: "#333"
        }
      }
    },
    yAxis: {
      title: {
        text: "Value",
        style: {
          color: "#333"
        }
      },
      labels: {
        style: {
          color: "#333"
        }
      }
    },
    series: [
      {
        name: "Actual",
        data: [5, 10, 15, 20, 25],
        color: "#5f98cd"
      },
      {
        name: "Target",
        data: [10, 15, 20, 25, 30],
        color: "#ff7f50"
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default SalesComparison;
