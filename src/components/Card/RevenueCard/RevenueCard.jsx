import React from 'react';
import { Card, CardContent, Grid, LinearProgress, Typography, Box } from '@mui/joy';

const data = [
  { location: 'California', revenue: '26K', progress: 70 },
  { location: 'Sanfrancisco', revenue: '26K', progress: 50 },
  { location: 'Austin', revenue: '26K', progress: 20 },
  { location: 'pahrump', revenue: '26K', progress: 90 },
  // Add more data objects as needed
];

const RevenueCard = () => {
  return (
    <div>
      <Card sx={{ height:"177px"}}>
      
        <CardContent>
        <Typography level="title-lg">Revenue by Location</Typography>
          <Grid container spacing={5}>
            {data.map((item, index) => (
              <Grid item md={6} key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{item.location}</Typography>
                  <Typography>{item.revenue}</Typography>
                </Box>
                <LinearProgress determinate thickness={2} value={item.progress} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default RevenueCard;
