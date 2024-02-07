import React from 'react';
import ReviewSourcesData from './ReviewSourcesData';
import { Grid, Rating, Avatar, Box, Card, CardContent,useTheme,
  useMediaQuery, } from '@mui/material';
import { Typography } from '@mui/joy';

const TopReviewSources = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Card sx={{ width:smScreen ? '264px' : '100%' }}>
      <CardContent>
      <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
  Top Review Sources
  </Typography>
        <Grid container spacing={2}>
          {ReviewSourcesData.map((source, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box display="flex" alignItems="center">
                <Avatar alt={source.name} src={source.logo} />
                <Box ml={2}>
                  <Typography variant="subtitle1">{source.name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {source.reviews.length} Reviews
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" fontSize="xl" color="textSecondary">
                      {source.rating}
                    </Typography>
                    <Rating name={`rating-${index}`} value={source.rating} precision={0.5} readOnly size="small" />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TopReviewSources;
