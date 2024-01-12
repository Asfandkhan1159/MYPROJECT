// InventoryDonutChart.jsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { calculateDynamicThreshold, isOutOfStock } from '../../services/InventoryService/InventoryDataService';

const InventoryDonutChart = ({ data }) => {
  const dynamicThreshold = calculateDynamicThreshold(data.historicalConsumption);
  const outOfStock = isOutOfStock(data.quantity, dynamicThreshold);

  const chartOptions = {
    chart: {
      type: 'pie',
      height:"200px",
    
   
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: '80%',
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Inventory',
        data: [
          {
            name: 'In Stock',
            y: outOfStock ? 0 : data.quantity - dynamicThreshold,
            color: '#36A2EB',
          },
          {
            name: 'Out of Stock',
            y: outOfStock ? data.quantity : dynamicThreshold,
            color: '#FF6384',
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions}
 
  />;
};

export default InventoryDonutChart;
