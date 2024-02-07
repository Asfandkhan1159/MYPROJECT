import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../../../SideBar";
import { Box, Typography,Button } from '@mui/material';
import Autocomplete from '@mui/joy/Autocomplete';
import TextField from '@mui/joy/TextField'; // Import TextField from @mui/joy
import { useVendorData } from "../VendorDataContext";
import Avatar from "@mui/joy/Avatar";
import BoilerPlate from "../../../BoilerPlate/BoilerPlate";
const GetRebates = () => {
  const { vendorData } = useVendorData();
  const [filter, setFilter] = useState('');

  const filteredData = vendorData.filter((item) =>
  (filter != null) ? item.name.toLowerCase().includes(filter.toLowerCase()) : ''

);

  const columns = [
    {
      field: "logo",
      headerName: "Vendor Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={params.row.logo} src={params.value} />
          <span style={{ marginLeft: "10px" }}>{params.row.name}</span>
        </div>
      )
    },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => (
        <Button variant="contained" sx={{backgroundColor:"black", color:"white"}}>
          Claim Rebate
        </Button>
      ),
    },
   
  ];

  return (
    <BoilerPlate>
        <Box sx={{ display: "flex", flexDirection:"row", alignItems:"center" }}>
          <Typography variant="body1" color="initial" sx={{ marginLeft: "2rem", fontSize: "40px", mt: 3, margin: "2rem" }}>
            Get Rebates
          </Typography>
          <Autocomplete
          sx={{height:'30px'}}
            options={vendorData.map((item) => item.name)}
            
            value={filter}
            onChange={(event, newValue) => {
              setFilter(newValue);
            }}
           
            renderInput={(params) => (
              <TextField {...params} label="Filter by name" variant="outlined" />
            )}
          />
        </Box>
        <Box sx={{ backgroundColor: "", padding: "2rem", margin: "2rem" }}>
          <DataGrid rows={filteredData} columns={columns} pageSize={5} sx={{
            width: "100%",
            backgroundColor: "white",
          }} />
        </Box>
      
    </BoilerPlate>
  );
};

export default GetRebates;
