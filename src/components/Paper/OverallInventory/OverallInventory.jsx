import React from 'react'
import { Paper, useTheme,
  useMediaQuery,
  styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InventoryCategories from '../Cateogories/InventoryCategories'
import Divider from '@mui/joy/Divider';
import useResponsiveStyles from '../../../services/Responsive/getResponsiveStyles'
const OverallInventory = () => {
  const category = {
    title:"Categories",
    value:"12",
    days:"last 7 days"
  }
  const products = {
    title:"Total Products",
    value:"868",
    days:"last 7 days",
    value2:"$25000",
    heading2:"Revenue"
  }

  const lowStocks = {
    title:"low stocks",
    value:"12",
    days:"Ordered",
    value2:"2",
    heading2:"Not in Stock"
  }
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <Paper elevation={0} sx={{px:"3rem", width:smScreen ? '364px' : '100%'}}>
        <Typography variant="h6" color="initial" sx={{height:"0px"}}>Overall Inventory</Typography>
        <Grid container spacing={0} sx={{marginTop:"2rem"}}>
          <Grid item md={3} xs={12}>
            <Typography variant="h6" color="primary" sx={{color:"#1570EF"}}>{category.title}</Typography>
            <InventoryCategories value={category.value} days={category.days}/>
          </Grid>
          <Divider orientation="vertical" sx={{mx:"2rem"}} />
          <Grid item md={4} xs={12}>
            <Typography variant="h6" color="primary" sx={{color:"#E19133"}}>{products.title}</Typography>
            <InventoryCategories value={products.value} days={products.days} value2={products.value2} heading2={products.heading2}/>
          </Grid>
          <Divider orientation="vertical"  sx={{mx:"2rem"}}/>
          <Grid item md={3} xs={12}>
            <Typography variant="h6" color="primary" sx={{color:"#F36960"}}>{lowStocks.title}</Typography>
            <InventoryCategories value={lowStocks.value} days={lowStocks.days} value2={lowStocks.value2} heading2={lowStocks.heading2}/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default OverallInventory