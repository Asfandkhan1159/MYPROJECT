import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown';
import { Card, CardContent, useTheme, useMediaQuery } from '@mui/material';

// Initialize drilldown module
drilldown(Highcharts);

const WeeklyRevenueChart = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartData, setChartData] = useState({
    chart: {
      type: 'column',
      height: 300,
      width: smScreen ? 300 : 600 ,
      backgroundColor: '#f8f9fa',
    },
    title: {
      text: 'Weekly Revenue',
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
      },
    },
    xAxis: {
      categories: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      labels: {
        style: {
          fontSize: '12px',
          color: '#666',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Amount ($)',
        style: {
          fontSize: '12px',
          color: '#666',
        },
      },
      labels: {
        style: {
          fontSize: '12px',
          color: '#666',
        },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '12px',
      },
    },
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
    series: [
      {
        name: 'Sales',
        data: [
          { y: 50, drilldown: 'salesDrilldown' },
          { y: 60, drilldown: 'salesDrilldown' },
          { y: 45, drilldown: 'salesDrilldown' },
          { y: 70, drilldown: 'salesDrilldown' },
          { y: 69, drilldown: 'salesDrilldown' },
          { y: 80, drilldown: 'salesDrilldown' },
          { y: 90, drilldown: 'salesDrilldown' },
        ],
        color: '#6CB577', // Light green for sales
      },
      {
        name: 'Expenses',
        data: [
          { y: 30, drilldown: 'expensesDrilldown' },
          { y: 40, drilldown: 'expensesDrilldown' },
          { y: 35, drilldown: 'expensesDrilldown' },
          { y: 50, drilldown: 'expensesDrilldown' },
          { y: 49, drilldown: 'expensesDrilldown' },
          { y: 60, drilldown: 'expensesDrilldown' },
          { y: 70, drilldown: 'expensesDrilldown' },
        ],
        color: '#E57373', // Light red for expenses
      },
    ],
    drilldown: {
      series: [
        {
          id: 'salesDrilldown',
          name: 'Sales Drilldown',
          data: [
            ['Grilled Salmon', 20],
            ['Margherita Pizza', 25],
            ['Chicken Alfredo Pasta', 30],
          ],
        },
        {
          id: 'expensesDrilldown',
          name: 'Expenses Drilldown',
          data: [
            ['Fresh Salad', 15],
            ['Vegetarian Sushi Roll', 20],
            ['Chocolate Fondant', 15],
          ],
        },
      ],
    },
  });

  return (
    <div>
        <HighchartsReact highcharts={Highcharts} options={chartData} />
     </div>
  );
};

export default WeeklyRevenueChart;
