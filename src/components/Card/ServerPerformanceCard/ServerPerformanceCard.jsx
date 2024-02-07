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
    if (!Array.isArray(data)) {
    console.error('Invalid sparkline data:', data);
    return {}; // Return an empty options object or handle accordingly
  }
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
  
  const generateSparklineData = async (serverNames, generateRealisticData, filter) => {
    const sparklineData = {};
    await Promise.all(
      serverNames.map(async (serverName) => {
        sparklineData[serverName] = await generateRealisticData(
          10,
          100,
          false,
          filter,
          false
        ); // Assuming not a monetary KPI for server performance
      })
    );
    return sparklineData;
  };
const ServerPerformanceCard = ({
    serverNames,
    serverData,
    filterOptions,
    generateRealisticData,
  }) => {
    const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);
    const [stateServerData, setStateServerData] = useState({ sparklineData: {} });
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
    useEffect(() => {
      updateData();
    }, [selectedFilter]);
  
    const updateData = async () => {
      const sparklineData = await generateSparklineData(
        serverNames,
        generateRealisticData,
        selectedFilter
      );
      setStateServerData({ sparklineData });
    };
  
    useEffect(() => {
      console.log("stateServerData", stateServerData);
    }, [stateServerData]);
  
    const handleFilterChange = (filter) => {
      setSelectedFilter(filter);
    };
  
    const columns = [
      { field: "performanceMetric", headerName: "Performance Metric", width: smScreen ? 40 : 150 },
      ...serverNames.map((serverName) => ({
        field: serverName,
        headerName: serverName,
        width: smScreen ? 10 : 100,
        renderCell: (params) => (
          <div>
            {console.log('Sparkline Data:', stateServerData.sparklineData)}
            {console.log('Server Name:', params.field)}
    
            <HighchartsReact
              highcharts={Highcharts}
              options={generateSparklineOptions(
                stateServerData.sparklineData[params.field] || [],
                params.field,
                'green',
                'red',
                selectedFilter,
                false
              )}
            />
          </div>
        ),
      })),
      {
        field: "change",
        headerName: "Change",
        width: smScreen ? 10 : 200,
        renderCell: (params) => {
            const sparklineData = params.row.sparkline;
            console.log('Sparkline Data in change column', sparklineData);
          
            let change = 0;
          
            if (sparklineData && sparklineData.length > 1) {
              const firstValue = sparklineData[0].y;
              const lastValue = sparklineData[sparklineData.length - 1].y;
          
              console.log('First Value:', firstValue);
              console.log('Last Value:', lastValue);
          
              change = calculateChange(Number(firstValue), Number(lastValue));
            }
          
            console.log('Change:', change);
          
            return (
              <div className={change >= 0 ? "positive-change" : "negative-change"}>
                {change >= 0 ? `+${change}` : change}
              </div>
            );
          },
          
      },
      
    ];
    
  
    const rows = ["Sales", "Good Feedback", "Complaints"].map((metric) => ({
        id: metric,
        performanceMetric: metric,
        ...serverNames.reduce((acc, serverName) => {
          const isMonetaryKPI = false; // Assuming not a monetary KPI for server performance
          const sparklineData = stateServerData.sparklineData[serverName];
      
          // Check if sparklineData is defined and contains the required metric
          const metricData = sparklineData
            ? sparklineData.find((data) => data.x === metric) || { y: 0 }
            : { y: 0 };
      
          return {
            ...acc,
            [serverName]: metricData.y,
          };
        }, {}),
        change: calculateChange(
          serverNames.reduce(
            (acc, serverName) => [
              ...acc,
              stateServerData.sparklineData[serverName]?.find((data) => data.x === metric) || { y: 0 },
            ],
            []
          )[0]?.y,
          serverNames.reduce(
            (acc, serverName) => [
              ...acc,
              stateServerData.sparklineData[serverName]?.find((data) => data.x === metric) || { y: 0 },
            ],
            []
          ).slice(-1)[0]?.y
        ),
      }));
      
    
    return (
      <div style={{ height: 400, width: smScreen ? "80%" : "100%" }}>
        <DataGrid
          rows={rows.map((row) => ({
            ...row,
            change: calculateChange(
              row[serverNames[0]], // Assuming the first server value is the initial value
              row[serverNames[serverNames.length - 1]]
            ),
          }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ border: "none" }}
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
                    sx={{ height: "20px" }}
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
  
  export default ServerPerformanceCard;