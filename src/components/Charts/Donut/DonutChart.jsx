import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ButtonGroup, Button,Grid,Typography, Card,CardContent } from '@mui/material';

const DonutChart = () => {
  const [activeButton, setActiveButton] = useState('monthly');
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie',
      height: '270px', // Set the height here
      width: 300,

    },
   
    plotOptions: {
      pie: {
        innerSize: '50%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: ' {point.percentage:.1f} %',
          distance: -40, // Set the desired distance here
        },
        showInLegend: false
      }
    },
    series: [{
      name: 'Sales',
      colorByPoint: true,
      data: [
        {
          name: 'Fish&Chips',
          y: 100,
          color: '#FF0000'
        },
        {
          name: 'Osteria 500',
          y: 200,
          color: '#00FF00'
        },
        {
          name: 'Classic Burger',
          y: 300,
          color: '#0000FF'
        },
        {
          name: 'Good liquid',
          y: 400,
          color: '#FFFF00'
        }
      ]
    }],
    navigation: {
      buttonOptions: {
        enabled: true
      }
    }
  });

  const chartRef = useRef(null);
  const [seriesData, setSeriesData] = useState([]);
  useEffect(() => {
    chartRef.current.chart.update(chartOptions);
  }, [chartOptions]);

  const fetchData = (timePeriod) => {
    // Sample dataset
    let data = [];

    if (timePeriod === 'monthly') {
      data = [
        {
          name: 'Fish&Chips',
          y: 500,
          color: '#FFAE96'
        },
        {
          name: 'Osteria 500',
          y: 400,
          color: '#F6D8A0'
        },
        {
          name: 'Classic Burger',
          y: 300,
          color: '#FFB1F3'
        },
        {
          name: 'Good liquid',
          y: 200,
          color: '#99F6A5'
        }
      ];
    } else if (timePeriod === 'weekly') {
      data = [
        {
          name: 'Fish&Chips',
          y: 200,
          color: '#FFAE96'
        },
        {
          name: 'Osteria 500',
          y: 300,
          color: '#F6D8A0'
        },
        {
          name: 'Classic Burger',
          y: 400,
          color: '#FFB1F3'
        },
        {
          name: 'Good liquid',
          y: 500,
          color: '#99F6A5'
        }
      ];
    } else if (timePeriod === 'daily') {
      data = [
        {
          name: 'Fish&Chips',
          y: 100,
          color: '#FFAE96'
        },
        {
          name: 'Osteria 500',
          y: 200,
          color: '#F6D8A0'
        },
        {
          name: 'Classic Burger',
          y: 300,
          color: '#FFB1F3'
        },
        {
          name: 'Good liquid',
          y: 400,
          color: '#99F6A5'
        }
      ];
    } else if (timePeriod === 'annually') {
      data = [
        {
          name: 'Fish&Chips',
          y: 600,
          color: '#FFAE96'
        },
        {
          name: 'Osteria 500',
          y: 700,
          color: '#F6D8A0'
        },
        {
          name: 'Classic Burger',
          y: 800,
          color: '#FFB1F3'
        },
        {
          name: 'Good liquid',
          y: 900,
          color: '#99F6A5'
        }
      ];
    }

    updateChart(data);
    setSeriesData(data);
  };

  const updateChart = (data) => {
    setChartOptions({
      ...chartOptions,
      series: [{
        name: 'Sales',
        colorByPoint: true,
        data: data
      }]
    });
  };
  useEffect(() => {
    fetchData(activeButton);
  }, []);
  const buttons = [
    <Button key="monthly" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'monthly' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('monthly'); setActiveButton('monthly'); }} checked={activeButton === 'monthly'}>Monthly</Button>,
    <Button key="weekly" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'weekly' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('weekly'); setActiveButton('weekly'); }} checked={activeButton === 'weekly'}>Weekly</Button>,
    <Button key="daily" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'daily' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('daily'); setActiveButton('daily'); }} checked={activeButton === 'daily'}>Daily</Button>,
    <Button key="annually" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'annually' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('annually'); setActiveButton('annually'); }} checked={activeButton === 'annually'}>Annually</Button>
  ];

  return (
    <div>
      <Grid container>
        <Grid item md={4}>
        <Typography variant="h5" color="initial">Top 4 Products</Typography>
        </Grid>
        <Grid item md={8}>

        <ButtonGroup aria-label="Time Period" sx={{ display: "flex", justifyContent: "flex-end", border: "none" }}>
        {buttons}
      </ButtonGroup>
        </Grid>
      </Grid>
      

      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "end", marginTop: "5.5rem" }}>
            {seriesData.map((item) => (
              <div key={item.name} className="series-item">
                <span className="pointer" style={{ backgroundColor: item.color }}></span>
                <span className="data-label">{item.name}: {item.y}</span>
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={chartRef} />
        </Grid>
      </Grid>

      <style>
        {`
          .series-data {
            padding: 16px;
          }

          .data-title {
            font-weight: bold;
          }

          .series-item {
            margin-bottom: 8px;
          }
          .pointer {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              margin-right: 5px;
            }
            
          .data-label {
            margin-left: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default DonutChart;