import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Hidden,
  useTheme,
  useMediaQuery,
  styled,
  createTheme
} from '@mui/material';
import WeeklyRevenueChart from '../components/Charts/WeeklyRevenue';
import Sidebar from '../components/SideBar';
// import Box from '@mui/material/Box'
import CustomerSatisfaction from '../components/Charts/CustomerSatisfaction';
import RevenueCard from '../components/Card/RevenueCard/RevenueCard';
import SalesComparison from '../components/Charts/SalesComparison';
import ReviewSummary from '../components/Card/ReviewSummary/ReviewSummary';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
import useResponsiveStyles from '../services/Responsive/getResponsiveStyles';
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
const RestaurantStatistics = () => {
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
  const smScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { getResponsiveStyles } = useResponsiveStyles();


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', width: 'auto' }}>
        <BoilerPlate>
        <Box component="main"
         display={smScreen ? "block" : "flex"}
         flexDirection={smScreen ? "row" : "column"}
         justifyContent={smScreen ? "space-between" : "start"}
         alignItems={smScreen ? "center" : "start"}
        
        sx={{ flexGrow: 1, mt: 8 }}>
          <Heading variant="h4">Restaurant Metrics</Heading>
          <Box sx={{ backgroundColor: "#F6F6F4", py:"2rem"}}>
            <Grid container spacing={5}>
              
                <Grid item xs={12} md={6.5} >
               <WeeklyRevenueChart/>
              
                </Grid>
            
              <Grid item xs={12} md={5.5}>
                <Card variant="outlined" sx={{maxWidth:"100%"}}>
                  <CardContent>
                 <CustomerSatisfaction/>
                  </CardContent>
                 
                </Card>
                
                
              </Grid>
              <Grid item md={6.5} xs={12}>
                <SalesComparison/>
              </Grid>
              <Grid item md={5.5} sx={{marginTop:"-2.5rem"}}>
                <RevenueCard/>
                <ReviewSummary/>
              </Grid>
             
            </Grid>
          </Box>
        </Box>
        </BoilerPlate>
      </Box>
    </React.Fragment>  );
};

export default RestaurantStatistics;
