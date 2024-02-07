import React, { useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';

const tableData = [
  { sr: 1, name: 'Mirin Sake Glazed', popularity: 20, sales: '20' },
  { sr: 2, name: "Annalida's Hot", popularity: 85, sales: '20' },
  { sr: 3, name: 'Lobster Macs', popularity: 78, sales: '90' },
  { sr: 4, name: 'Spicy Tuna Roll', popularity: 95, sales: '75' },
  { sr: 5, name: 'Truffle Fries', popularity: 60, sales: '40' },
  // Add more data as needed
];

const linearProgressColors = ['#205B84', '#0D3D2F', '#4A2A8B'];

const TrendingProducts = () => {
  const [topProducts, setTopProducts] = useState('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const linearProgressColors = ['#205B84', '#0D3D2F', '#4A2A8B'];

  const generateTopProductsOptions = () => {
    const options = tableData.map((product, index) => (
      <MenuItem key={index} value={product.sr}>
        {product.name}
      </MenuItem>
    ));
    return (
      <>
        <MenuItem sx={{ height: "30px" }} value="Top 3 products">Top 3 products</MenuItem>
        {options}
      </>
    );
  };

  const generateTimePeriodOptions = () => {
    const timePeriods = ['This week', '2', '3']; // Replace with dynamic data if available
    return timePeriods.map((period, index) => (
      <MenuItem key={index} value={period}>
        {period}
      </MenuItem>
    ));
  };

  const handleTopProductsChange = (event) => {
    setTopProducts(event.target.value);
  };

  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
  };


  return (
    <div>
      <Grid
        container
        sx={{
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 20px 0px #0D0D0D1A',
          padding: '1.2rem',
          borderRadius: '8px',
          height: '445px', width: smScreen ? '300px' : '100%' ,
          
          marginBottom: '20px',
         
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'grey',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#ccc',
          },
        }}
        
      >
        <Grid item xs={12} md={4}>
          <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Trending Eats</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: smScreen ? 'center' : 'center', alignItems: 'flex-end' }}>
          <FormControl sx={{ marginBottom: smScreen ? '10px' : '0', marginRight: smScreen ? '0' : '10px', width: smScreen ? '100%' : '200px' }}>
            <Select
              defaultValue='Top 3 products'
              value={topProducts}
              onChange={handleTopProductsChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%', height: "30px", textAlign: 'center' }}
            >
              <MenuItem value='' disabled>Select Top Products</MenuItem>
              {generateTopProductsOptions()}
            </Select>
          </FormControl>
          <FormControl sx={{ marginBottom: smScreen ? '10px' : '0', marginRight: smScreen ? '0' : '10px', width: smScreen ? '100%' : '200px' }}>
            <Select
              value={selectedTimePeriod}
              onChange={handleTimePeriodChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ width: '100%', height: "30px", textAlign: 'center' }}
            >
              <MenuItem value='' disabled>Select Time Period</MenuItem>
              {generateTimePeriodOptions()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TableContainer sx={{ px:'2rem', py:"0.9rem", margin: '-8px' }}>
            <Table>
              {/* Table Head */}
              <TableHead>
  <TableRow>
    <TableCell
      sx={{
        padding: '2px', // Adjust padding
        margin: 0,
        fontSize: '14px',
      }}
    >
      Sr
    </TableCell>
    <TableCell
      sx={{
        padding: '2px', // Adjust padding
        margin: 0,
        fontSize: '14px',
        width:"200px"
      }}
    >
      Name
    </TableCell>
    <TableCell
      sx={{
        padding: '2px', // Adjust padding
        margin: 0,
        fontSize: '14px',
      }}
    >
      Popularity
    </TableCell>
    <TableCell
      sx={{
        padding: '2px', // Adjust padding
        margin: 0,
        fontSize: '14px',
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      Sales
    </TableCell>
  </TableRow>
</TableHead>

              {/* Table Body */}
              <TableBody sx={{height:"30px"}}>
                {tableData.map((row, index) => (
                  <TableRow key={row.sr} sx={{ padding: 0, margin: 0}}>
                <TableCell
                      sx={{
                        border: 'none',
                        padding: '8px', // Adjust padding
                        margin: 0,
                        fontSize: '14px',
                        height:"2px"
                      }}
                    >
                      {row.sr}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        padding: '8px', // Adjust padding
                        margin: 0,
                        fontSize: '14px',
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 'none',
                        padding: '8px', // Adjust padding
                        margin: 0,
                        fontSize: '14px',
                      }}
                    >
                    <LinearProgress
                      variant="determinate"
                      value={row.sales}
                      thickness={1}
                      sx={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: '#ccc',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: linearProgressColors[index],
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: 'none', display: "flex", justifyContent: "flex-end", margin: 0, fontSize: '14px' }}>
                    <Chip label={`${row.sales}%`} variant="outlined" color="success" sx={{ borderRadius: "8px", display: "flex", justifyContent: "flex-end" }}>
                      {row.sales}%
                    </Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default TrendingProducts;
