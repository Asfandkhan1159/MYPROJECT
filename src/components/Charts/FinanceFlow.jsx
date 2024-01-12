import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, ButtonGroup } from '@mui/material';

const RestaurantFinanceChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('weekly');
  const [activeButton, setActiveButton] = useState('monthly');

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const fetchData = (filter) => {
    let seriesData = [];

    if (filter === 'weekly') {
      seriesData = generateRandomData(7);
    } else if (filter === 'monthly') {
      seriesData = generateRandomData(30);
    } else if (filter === 'annually') {
      seriesData = generateRandomData(365);
    }

    setData(seriesData);
  };

  const generateRandomData = (count) => {
    const data = [];

    for (let i = 0; i < count; i++) {
      // Generate daily cash inflows
      const dailyTotal = Math.floor(Math.random() * 1000) + 500; // Random amount for demonstration
      data.push(dailyTotal);
    }

    return data;
  };

  const options = {
    title: {
      text: 'Restaurant Cash Inflows',
    },
    xAxis: {
      categories: data.map((_, index) => `Day ${index + 1}`),
    },
    yAxis: {
      title: {
        text: 'Cash Inflows (USD)',
      },
      labels: {
        formatter: function () {
          return '$' + this.value; // Add the dollar sign to yAxis labels
        },
      },
    },
    chart: {
      height: 300,
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br/>${this.x}: $${this.y.toFixed(2)}`;
      },
    },
    series: [
      {
        name: 'Daily Cash Inflows',
        data: data,
        marker: {
          symbol: 'circle', // Use circles as markers for finance-related charts
        },
      },
    ],
  };

  const buttons = [
    <Button
      key="monthly"
      sx={{
        fontSize: '12px',
        border: 'none',
        color: 'primary.main',
        '&.MuiButton-text': { color: 'grey.500' },
        outline: 'none',
        backgroundColor: activeButton === 'monthly' ? '#d6ead8' : '#f6f6f4',
        color: 'black',
      }}
      onClick={() => {
        fetchData('monthly');
        setActiveButton('monthly');
      }}
      checked={activeButton === 'monthly'}
    >
      Monthly
    </Button>,
    <Button
      key="weekly"
      sx={{
        border: 'none',
        color: 'primary.main',
        '&.MuiButton-text': { color: 'grey.500' },
        outline: 'none',
        backgroundColor: activeButton === 'weekly' ? '#d6ead8' : '#f6f6f4',
        color: 'black',
      }}
      onClick={() => {
        fetchData('weekly');
        setActiveButton('weekly');
      }}
      checked={activeButton === 'weekly'}
    >
      Weekly
    </Button>,
    <Button
      key="daily"
      sx={{
        border: 'none',
        color: 'primary.main',
        '&.MuiButton-text': { color: 'grey.500' },
        outline: 'none',
        backgroundColor: activeButton === 'daily' ? '#d6ead8' : '#f6f6f4',
        color: 'black',
      }}
      onClick={() => {
        fetchData('daily');
        setActiveButton('daily');
      }}
      checked={activeButton === 'daily'}
    >
      Daily
    </Button>,
    <Button
      key="annually"
      sx={{
        border: 'none',
        color: 'primary.main',
        '&.MuiButton-text': { color: 'grey.500' },
        outline: 'none',
        backgroundColor: activeButton === 'annually' ? '#d6ead8' : '#f6f6f4',
        color: 'black',
      }}
      onClick={() => {
        fetchData('annually');
        setActiveButton('annually');
      }}
      checked={activeButton === 'annually'}
    >
      Annually
    </Button>,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      
        <ButtonGroup aria-label="Time Period" sx={{ border: 'none', height:"30px" }}>
          {buttons}
        </ButtonGroup>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default RestaurantFinanceChart;
