import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const options = {
  title: "Total Revenue",
  curveType: "function",
  legend: { position: "bottom" },
};

export default function LineChart() {
  return (
    <Chart
      chartType="LineChart"
      width="574px"
      height="232px"
      data={data}
      options={options}
    />
  );
}
