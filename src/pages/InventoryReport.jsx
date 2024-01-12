import React, {useState} from 'react'
import Sidebar from '../components/SideBar'
import { Box, Typography, Grid, Button,useTheme,
  styled,
useMediaQuery,createTheme } from '@mui/material'
import OverallInventory from '../components/Paper/OverallInventory/OverallInventory'
import InventorySummary from '../components/Card/SummaryCards/InventorySummary'
import {MiniTable}  from '../components/Inventory/MiniInventoryTable'
import { useInventoryData,InventoryDataProvider  } from '../components/Inventory/InventoryDataContext'
import { DataGrid } from "@mui/x-data-grid";
import { useVendorData } from '../components/Vendors/VendorsTable/VendorDataContext'
import { Link } from 'react-router-dom';
import Avatar from "@mui/joy/Avatar";
import Icon1 from '../assets/InventoryReportIcons/Categories.svg'
import Icon2 from '../assets/InventoryReportIcons/Suppliers.svg'
import Icon3 from '../assets/InventoryReportIcons/Group 1000002790.svg'
import Icon4 from '../assets/InventoryReportIcons/Vector.svg'
import BoilerPlate from '../components/BoilerPlate/BoilerPlate'
const InventoryReport = () => {
  const { rows } = useInventoryData(); 
  const vendorDataContext = useVendorData(); // Accessing the context
  const vendorData = vendorDataContext.vendorData;
  const [pagination, setPagination] = useState({ page: 0, pageSize: 5 });

const handlePageSizeChange = (newPageSize) => {
  setPagination((prevPagination) => ({
    ...prevPagination,
    pageSize: newPageSize,
  }));
};
const Heading = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  color: "black",
  fontWeight: 200,
  // paddingTop: "1em",
  marginBottom:"20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));
  const InventoryData = {
    heading:"Inventory Summary",
    text:"Quantity in Hand",
    value:"236",
    text2:"Will be Received",
    value2:"50"
  }

  const ProductSummaryData ={
    heading:"Product Summary",
    text:'No. of Supplies',
    value:"31",
    text2:"No. of Categories",
    value2:"50"
  }
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
  ];
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(smScreen)
  return (
    <React.Fragment>
       <Box 
        
       sx={{ display: 'flex',  width:'100%'  }}>
        <BoilerPlate >
        <Box component="main"
         display={smScreen ? "block" : "flex"}
         flexDirection={smScreen ? "row" : "column"}
         justifyContent={smScreen ? "space-between" : "start"}
         alignItems={smScreen ? "center" : "start"}

        
        sx={{ flexGrow: 1, mt: 8 }}>
          <Heading variant="h4">
            Inventory Report
          </Heading>
          <Box sx={{ backgroundColor: "#F6F6F4", padding:"2rem", margin:"2rem" }}>
            
            <OverallInventory/>
            
            <Box sx={{marginTop:"2rem"}}>
              <Grid container spacing={smScreen ? 1 : 12}>
                <Grid item md={4} xs={12}>
              <InventorySummary heading={InventoryData.heading}
             text={InventoryData.text}
             value={InventoryData.value}
             text2={InventoryData.text2}
             value2={InventoryData.value2}
             icon1={Icon4}
             icon2={Icon3}
             />
             </Grid>
                  <Grid item md={4} xs={12}>
              <InventorySummary 
              heading={ProductSummaryData.heading}
             text={ProductSummaryData.text}
             value={ProductSummaryData.value}
             text2={ProductSummaryData.text2}
             value2={InventoryData.value2}
             icon1={Icon1}
             icon2={Icon2}
             />
             </Grid>
             <Grid item md ={4}>
             <MiniTable rows={rows} />
             </Grid>
            </Grid>
            <Box mt={5} sx={{backgroundColor:"#FFF", border:"1px solid #C4C4C4", borderRadius:"5px", padding:"2.5rem"}}>
            <Box display="flex" justifyContent="space-between">
  <Typography variant="h5" color="initial">Suppliers</Typography>
  <Button variant="text" color="primary" component={Link}
  to='/dashboard/vendors'
  >
    See all
  </Button>
</Box>
<Box
component="main"
width={smScreen ? "400px" : "100%"}
sx={{ overflow: 'auto' }}

>
             
              <DataGrid
    rows={vendorData}
    columns={columns}
    pagination
    paginationMode="client"
    paginationModel={pagination}
    onPaginationModelChange={setPagination}
    pageSize={pagination.pageSize}
    onPageSizeChange={handlePageSizeChange}
    
  />
  </Box>

        </Box>
            </Box>
            
          </Box>
          </Box>
          </BoilerPlate>
          </Box>
    </React.Fragment>
  )
}

export default InventoryReport
