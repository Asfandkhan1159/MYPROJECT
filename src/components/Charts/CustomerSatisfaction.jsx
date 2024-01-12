import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CustomerSatisfaction = () => {
  const [chartData, setChartData] = useState({
    chart: {
      type: 'area',
      height: '237px',
      width:500,
    
      backgroundColor: '#f8f9fa', // Set a light background color
    },
    title: {
      text: 'Customer Satisfaction',
      align: 'left', // Align the title to the left
      style: {
        fontSize: '18px', // Reduce font size
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xAxis: {
      categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      labels: {
        style: {
          fontSize: '12px', // Reduce font size for xAxis labels
          color: '#666',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Satisfaction Score',
        style: {
          fontSize: '12px', // Reduce font size for yAxis title
          color: '#666',
        },
      },
      labels: {
        style: {
          fontSize: '12px', // Reduce font size for yAxis labels
          color: '#666',
        },
      },
    },
    series: [
      {
        name: 'Satisfaction Score',
        data: [30, 40, 35, 50, 49, 60, 70],
        color: '#4CAF50', // Set a green color for the area chart
        fillOpacity: 0.3, // Set a lower fill opacity
      },
    ],
    legend: {
      enabled: false, // Hide the legend
    },
  });

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartData} />
    </div>
  );
};

export default CustomerSatisfaction;
