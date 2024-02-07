import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from "@mui/material";
const generateSparklineOptions = (
  data,
  title,
  positiveColor,
  negativeColor,
  filter, isMonetaryKPI
) => {
  let tooltipDateFormat;
  let dataLabelFormat;
  console.log('data',data)
  console.log('title',title)
  console.log('positiveColor',positiveColor)
  console.log('negativeColor',negativeColor)
  console.log('filter',filter)
  console.log('isMOnetaryKPI',isMonetaryKPI)
  
  if (filter === "daily") {
    tooltipDateFormat = "%A, %b %e, %H:%M";
    dataLabelFormat = "%H:%M";
    const latestDayData = [];
    const latestDay = new Date().getDate();

    for (let i = data.length - 1; i >= 0; i--) {
      const pointDate = new Date(data[i].x).getDate();
      if (pointDate === latestDay) {
        latestDayData.push(data[i]);
      } else {
        break;
      }
    }

    data = latestDayData.reverse();
  } else if (filter === "weekly") {
    tooltipDateFormat = "Week %W, %b %e";
    dataLabelFormat = "%b %e";
  } else {
    tooltipDateFormat = "%b %e";
    dataLabelFormat = "%b %e";
  }
  return {
    chart: {
      type: "line",
      backgroundColor: null,
      borderWidth: 0,
      margin: [2, 0, 2, 0],
      width: 120,
      height: 60,
      style: {
        overflow: "visible",
      },
      skipClone: true,
    },
    title: {
      text: title,
      style: {
        color: "#333",
        fontSize: "10px",
        fontWeight: "bold",
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      tickPositions: [0],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      hideDelay: 0,
      outside: true,
      shared: true,
      formatter: function () {
        const date = new Date(this.x);
        const formattedDate = Highcharts.dateFormat(tooltipDateFormat, date);
      
        let tooltip = `<b>${formattedDate}</b><br/>`;
      
        this.points.forEach((point) => {
          const dataLabel = Highcharts.dateFormat(dataLabelFormat, point.x);
          const formattedValue = point.series.userOptions.isMonetaryKPI
            ? `$${point.y}`
            : point.y;
      
          tooltip += `<span style="color:${point.color}">\u25CF</span> ${title}: <b>${formattedValue}</b> (${dataLabel})<br/>`;
        });
      
        return tooltip;
      },
      
    },
    
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2,
            },
          },
        },
        fillOpacity: 0.25,
      },
      columnrange: {
        fillOpacity: 0.25,
      },
    },
    series: [
      {
        data: data,
        color: data[data.length - 1] >= data[data.length - 2] ? positiveColor : negativeColor,
        isMonetaryKPI: isMonetaryKPI, // Ensure isMonetaryKPI is set in userOptions
      },
    ],
    exporting: {
      enabled: false,
    },
  };
};




const calculateChange = (firstValue, lastValue) => {
  const parsedFirstValue = firstValue;
  const parsedLastValue = lastValue;
  console.log("parsedFirstValue", parsedFirstValue);
  console.log("parsedLastValue", parsedLastValue);

  if (
    !isNaN(parsedFirstValue) &&
    !isNaN(parsedLastValue) &&
    parsedFirstValue !== 0
  ) {
    const percentageChange =
      ((parsedLastValue - parsedFirstValue) / Math.abs(parsedFirstValue)) * 100;
    return percentageChange.toFixed(2); // Round to 2 decimal places
  }

  return 0;
};


const WeeklyStatsCard = ({ kpiTitles, kpiData, filterOptions, generateRealisticData }) => {
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
  const [stateKpiData, setStateKpiData] = useState(kpiData);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    updateData();
  }, [selectedFilter]);

  const generateSparklineData = async (filter) => {
    const sparklineData = {};
    kpiTitles.forEach(async (title) => {
      const isMonetaryKPI = ["Sales", "Average Check size", "Gross Margin", "Net Profit Margin", "Purchases"].includes(title);
      sparklineData[title] = await generateRealisticData(10, 100, false, filter, isMonetaryKPI);
    });
    return sparklineData;
  };

  const updateData = async () => {
    const updatedKpiData = {
      sparklineData: await generateSparklineData(selectedFilter),
    };

    setStateKpiData(updatedKpiData);
  };

  useEffect(() => {
    console.log('stateKpiData', stateKpiData);
  }, [stateKpiData]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const columns = [
    { field: "kpi", headerName: "KPI", width: smScreen ? 40 : 150 },
    {
      field: "value",
      headerName: "Value",
      width: smScreen ? 10 : 100,
      valueGetter: (params) => {
        const kpi = kpiData[params.row.kpi];
        const formattedValue =
          kpi && kpi.displayCurrency
            ? `$${Math.floor(Math.random() * 1000)}`
            : Math.floor(Math.random() * 1000);

        return formattedValue;
      },
    },
    {
      field: "sparkline",
      headerName: "Trend",
      width: smScreen ? 100 : 200,
      renderCell: (params) => (
  <div>
    {console.log('Sparkline Data:', params.row.sparkline)}
    {console.log('kpi row Data:', params.row.kpi)}

    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...generateSparklineOptions(params.row.sparkline,params.row.kpi,'green','red',selectedFilter, params.row.isMonetaryKPI),
        chart: {
          width: smScreen ? 150 : 200,
          height: 65,
          type: 'line',
        },
      }}
    />
  </div>
),

    },
    {
      field: "change",
      headerName: "Change",
      width: smScreen ? 10 : 200,
      valueGetter: (params) => {
        const sparklineData = params.row.sparkline;

        if (sparklineData.length > 1) {
          const firstValue = sparklineData[0].y;
          const lastValue = sparklineData[sparklineData.length - 1].y;
          const change = calculateChange(firstValue, lastValue);

          return change;
        }

        return 0;
      },
      cellClassName: (params) =>
        params.value >= 0 ? "positive-change" : "negative-change",
      renderCell: (params) => (
        <div
          className={params.value >= 0 ? "positive-change" : "negative-change"}
        >
          {params.value >= 0 ? `+${params.value}` : params.value}
        </div>
      ),
    },
  ];

  const rows = kpiTitles.map((title) => {
    const isMonetaryKPI = ["Sales", "Average Check size", "Gross Margin", "Net Profit Margin", "Purchases"].includes(title);
  
    return {
      id: title,
      kpi: title,
      value: Math.floor(Math.random() * 1000),
      sparkline: stateKpiData.sparklineData[title] || [],
      isMonetaryKPI: isMonetaryKPI,
    };
  });
  

  return (
    <div style={{ height: 400, width: smScreen ? "80%" : "100%" }}>
      <DataGrid
        rows={rows.map((row) => ({
          ...row,
          change: calculateChange(
            row.sparkline[0]?.y, // Assuming the first value is the initial value
            row.sparkline[row.sparkline.length - 1]?.y
          ),
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
       
        sx={{border:"none"}}
        components={{
          Toolbar: () => (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "8px",
              }}
            >
              <FormControl>
                <Select
                  labelId="filter-label"
                  id="filter"
                  value={selectedFilter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  sx={{height:"20px"}}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                </Select>
              </FormControl>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default WeeklyStatsCard;
