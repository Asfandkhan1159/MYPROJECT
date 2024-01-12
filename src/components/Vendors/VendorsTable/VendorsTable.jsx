import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/joy/Avatar";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/joy/Select';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import {useTheme,
  useMediaQuery,
  } from '@mui/material'
// import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Divider from '@mui/material/Divider';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography'
import { useVendorData } from "./VendorDataContext";
import Grid from '@mui/joy/Grid'
const StyledTable = styled(Table)({
  minWidth: 650
});
function RowMenu() {
  return (
    
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}
const renderActionsCell = (params) => {
  return <RowMenu />;
};


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
    { field: "date", headerName: "Paid Date", width: 200 },
    { field: "quantity", headerName: "Number of items", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: renderActionsCell,
    },
    
    
  ];
  
  
  export default function TransactionTable({ selectedVendor }) {
    const {vendorData} = useVendorData();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDateFrom, setFilterDateFrom] = useState('');
    const [filterDateTo, setFilterDateTo] = useState('');
    const [filterModel, setFilterModel] = useState([]);
    
   
    const handleFilterModelChange = (model) => {
      setFilterModel(model);
    };
    const filtered = vendorData.filter((row) => {
      return selectedVendor ? row.name === selectedVendor.name : true;
    });
    const sortedVendors = vendorData
    .slice()
    .sort((a, b) => parseFloat(b.amount.replace('$', '')) - parseFloat(a.amount.replace('$', '')));

  const top4Vendors = sortedVendors.slice(0, 4);


    const handleCustomerChange = (event) => {
      const selectedValue = event.target.getAttribute('data-value');
      setFilterCategory(selectedValue);
      console.log('Selected Customer:', selectedValue);
      console.log('functiom',event.target.getAttribute('data-value'))
    };
    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    const handlePageSizeChange = (event) => {
      setPageSize(parseInt(event.target.value, 10));
      setPage(1);
    };
  
    const filteredRows = vendorData.filter((row) => {
      const categoryMatch = filterCategory === '' || row.category === filterCategory;
      const fromDateMatch = filterDateFrom === '' || new Date(row.date) >= new Date(filterDateFrom);
      const toDateMatch = filterDateTo === '' || new Date(row.date) <= new Date(filterDateTo);
  
      return categoryMatch && fromDateMatch && toDateMatch;
    });
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = filteredRows.slice(startIndex, endIndex);
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
      <Box>
       <Box display="flex" m={2}>
       <Grid container spacing={4}>
        {top4Vendors.map((vendor, index) => (
          <Grid key={vendor.id} item xs={2.2} md={3} xs={4.5} sx={{ borderRight: index < 3 ? '1px solid #000' : 'none' }}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: '49px',
                  height: '49px',
                  borderRadius: '5px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={vendor.logo}
                  alt={vendor.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <Box ml={1} sx={{width:"200px"}}>
                <Typography variant="subtitle1">{vendor.name}</Typography>
                <Typography variant="caption">
               {Math.floor(Math.random() * 10) + 1} Invoices
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
          </Box>
      <TableContainer>
       
               <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            borderRadius: 'sm',
            py: 1,
            px:2,
          
            display: {
              xs: 'none',
              sm: 'flex',
            },
            flexWrap: 'wrap',
            gap: 0,
            '& > *': {
              width: {
                xs: '120px',
                md: '460px',
              },
            },
          }}
        >
          <Typography variant="h4" color="initial" sx={{width:"180px", marginTop:"30px"}}>All Vendors</Typography>
        
          </Box>
         
        
  
        <Box width={smScreen ? "400px" : "600"} sx={{ height: 400, marginTop: "20px", marginLeft:"1rem" }}>
          <DataGrid
            pageSize={pageSize}
            page={page}
            slots={{ toolbar: GridToolbar }}
            pagination
            rows={filtered}
            columns={columns}
            onFilterModelChange={handleFilterModelChange}
          />
          
        
        </Box>
      </TableContainer>
      </Box>
    );
  }