import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import WeeklyRevenueChart from '../components/Charts/WeeklyRevenue';
import CustomerSatisfaction from '../components/Charts/CustomerSatisfaction';
import RevenueCard from '../components/Card/RevenueCard/RevenueCard';
import SalesComparison from '../components/Charts/SalesComparison';
import ReviewSummary from '../components/Card/ReviewSummary/ReviewSummary';
import Sidebar from '../components/SideBar';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
import TrendingProducts from '../components/Card/TrendingProductsCard/TrendingProducts';
import PurchasingStatsCard from '../components/Card/PurchasingStats/PurchasingStatsCard';
const RestaurantStatistics = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ display: 'flex' }}>
      <BoilerPlate>
       

        <Box component="main" sx={{ }}>
          <Typography variant="h4" component="div">
            Restaurant Metrics
          </Typography>

          {/* Your content goes here */}
          <Box sx={{ backgroundColor: "#F6F6F4", py: "2rem", px:"2rem", position: 'relative' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6.5}>
                <Card variant="outlined">
                  <CardContent>
                    <WeeklyRevenueChart />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <Card variant="outlined">
                  <CardContent>
                    <CustomerSatisfaction />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6.5}>
                <Card variant="outlined">
                  <CardContent>
                    <SalesComparison />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={5.5}>
               
                
                  <ReviewSummary />
                 
                <RevenueCard />
              </Grid>
              <Grid item md={6.5} xs={12}>
                <TrendingProducts/>
              </Grid>
              <Grid item md={5.5} xs={12}>
              <Card variant="outlined" sx={{width:smScreen ? '300px' : '100%'}}>
                  <CardContent>
                <PurchasingStatsCard  heading='Restaurant Statistics Weekly '
                 revenueTitle="Expenses"
                 revenue='$7800'
                 profitTitle="Profit"
                  profit='$2200'
                  salesTitle="No. of Sales"
                   sales='$10000'
                   vendorsTitle="Total Vendors"
                    vendors='3' />
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{width:smScreen ? '300px' : '100%', mt:1}}>
                  <CardContent>
                <PurchasingStatsCard  heading='Purchasing Overview'
                 revenueTitle="Purchases"
                 revenue='23'
                 profitTitle="Low stock"
                  profit='23'
                  salesTitle="Cost"
                   sales='$780'
                   vendorsTitle="Cost Variation"
                    vendors='45%' />
                    </CardContent>
                  </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </BoilerPlate>
    </Box>
  );
};

export default RestaurantStatistics;
