import React from "react";
import { styled } from "@mui/material/styles";

const RectangleDivRoot = styled("div")({
  
  backgroundColor: "#dce9e5",
  width: "100%",
  height: "1250px",
});

const RectangleComponent = () => {
  return <RectangleDivRoot />;
};

export default RectangleComponent;