import React from 'react'
import BoilerPlate from '../components/BoilerPlate/BoilerPlate'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ReviewSummary from '../components/Card/ReviewSummary/ReviewSummary'
import TopReviewSources from '../components/ReviewsSources/TopReviewSources'
import ReviewFilter from '../components/ReviewsSources/CompareReviews'
import { List, ListItemButton, ListItemText,Card,CardContent,useTheme,useMediaQuery  } from '@mui/material'
import { Link } from 'react-router-dom';
import WeeklyStatsCard from '../components/Card/WeeklyStatsCard/WeeklyStatsCard'
import ServerPerformanceCard from '../components/Card/ServerPerformanceCard/ServerPerformanceCard'
const Reviews = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const generateRealisticData = (duration, maxValue, hourly, filter,isMonetaryKPI ) => {
    const now = new Date().getTime();
  
    const timeInterval = filter === 'daily' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // One hour or one day in milliseconds
  
    // Add a condition to generate hourly data for the latest day when "daily" filter is selected
    if (filter === "daily") {
      return Array.from(
        { length: 24 }, // 24 hours in a day
        (_, index) => now - index * timeInterval
      )
        .reverse()
        .map((timestamp) => ({
          x: timestamp,
          y: Math.floor(Math.random() * maxValue),
          isMonetaryKPI: isMonetaryKPI, 
        }));
    }else if (filter === "weekly") {
      // Generate data for the latest 30 days when "monthly" filter is selected
      return Array.from(
        { length: 7 },
        (_, index) => now - index * timeInterval
      )
        .reverse()
        .map((timestamp) => ({
          x: timestamp,
          y: Math.floor(Math.random() * maxValue),
          isMonetaryKPI: isMonetaryKPI, 
        }));
    }
  
    else if (filter === "monthly") {
      // Generate data for the latest 30 days when "monthly" filter is selected
      return Array.from(
        { length: 30 },
        (_, index) => now - index * timeInterval
      )
        .reverse()
        .map((timestamp) => ({
          x: timestamp,
          y: Math.floor(Math.random() * maxValue),
          isMonetaryKPI: isMonetaryKPI, 
        }));
    } else if (filter === "quarterly") {
      // Generate data for the latest 90 days when "quarterly" filter is selected
      return Array.from(
        { length: 90 },
        (_, index) => now - index * timeInterval
      )
        .reverse()
        .map((timestamp) => ({
          x: timestamp,
          y: Math.floor(Math.random() * maxValue),
          isMonetaryKPI: isMonetaryKPI, 
        }));
    }
  
    // Default case (e.g., if filter is not recognized)
    return [];
  };
  
  return (
    <div>
      <BoilerPlate>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h4" color="initial" sx={{ marginLeft: "2rem", fontSize: "40px" }}>Reviews</Typography>
          <List sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemButton component={Link}
              to='/dashboard/compareReviews'
              >
                <ListItemText primary="Compare Reviews" />
              </ListItemButton>
              
            </List>
        </Box>
        <Box sx={{ backgroundColor: "#F6F6F4", padding: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: smScreen ? "100%" : "264px",width:smScreen ? '264px' : '100%' }}>
                <CardContent>
                  <ReviewSummary />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <TopReviewSources />
            </Grid>
            <Grid item xs={12} md={12}>
              <ReviewFilter sx={{ width:smScreen ? '44px' : '100%' }} />
            </Grid>
            <Grid item md={6} xs={12}>
            <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%', }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Server Performance</b>
          </Typography>
          <WeeklyStatsCard
  kpiTitles={["Emily", "George", "Kathy"]}
  kpiData={{
    sparklineData: generateRealisticData(0, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}  // Pass the function as a prop
/>

                  </CardContent>
                </Card>
            </Grid>
            <Grid item md={6} xs={12}>
            <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%', }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Server Performance</b>
            </Typography>
            <ServerPerformanceCard
  serverNames={["Emily", "George", "Kathy"]}
  serverData={{
    sparklineData: generateRealisticData(0, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}
/>
</CardContent>
                </Card>
            </Grid>
          </Grid>
        </Box>
      </BoilerPlate>
    </div>
  )
}

export default Reviews
