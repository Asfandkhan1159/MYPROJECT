import React, { useState, useEffect } from 'react';
import ReviewSourcesData from './ReviewSourcesData';
import { Box, Avatar, Typography, Card, CardContent, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';
import Autocomplete from '@mui/joy/Autocomplete';
import Chip from '@mui/joy/Chip'
const CompareReviews = () => {
  const [selectedSources, setSelectedSources] = useState(['OpenTable', 'Yelp']);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState(['All']); // State for selected ratings

  const handleSourceClick = (source) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    setSelectedSources(updatedSources);
  };

  const handleRatingChange = (event, newValue) => {
    setSelectedRatings(newValue);
  };

  useEffect(() => {
    let filtered = ReviewSourcesData.filter((source) => selectedSources.includes(source.name));

    // Filter by selected ratings
    if (selectedRatings.length > 0 && !selectedRatings.includes('All')) {
      filtered = filtered.map((source) => ({
        ...source,
        reviews: source.reviews.filter((review) => selectedRatings.includes(review.rating.toString())),
      }));
    }

    setFilteredReviews(filtered);
  }, [selectedSources, selectedRatings]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {/* Select Sources Chips */}
            {ReviewSourcesData.map((source, index) => (
              <Grid item key={index}>
                
                <Chip
                  key={source}
                  label={source.name}
                  onClick={() => handleSourceClick(source.name)}
                  color={selectedSources.includes(source.name) ? 'primary' : 'default'}
                  sx={{ margin: 1 }}
                  startDecorator={   <Avatar size="sm" alt={source.name} src={source.logo} />}
                > {source.name}</Chip>
              </Grid>
            ))}
            {/* Rating Filter Autocomplete */}
            <Grid item>
              <Autocomplete
                multiple
                id="tags-default"
                options={['All', '5', '4', '3', '2', '1']}
                getOptionLabel={(option) => (option === 'All' ? 'All stars' : `${option} stars`)}
                value={selectedRatings}
                onChange={handleRatingChange}
                renderInput={(params) => (
                  <Chip
                    {...params}
                    variant="outlined"
                    label="Ratings"
                    color={selectedRatings.length > 0 ? 'primary' : 'default'}
                    sx={{ margin: 1 }}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography variant="h6" color="initial">
              View Reviews
            </Typography>
          </Box>

          {filteredReviews.length > 0 ? (
            <Grid container spacing={2} alignItems="start">
              {filteredReviews.map((source, index) => (
                <Grid item xs={12} key={index}>
                  {source.reviews.map((review, idx) => (
                    <Grid item xs={12} key={idx}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                          <Avatar alt={source.name} src={source.logo} />
                          <Typography sx={{ marginLeft: 1 }}>{review.text}</Typography>
                        </Box>
                        <Box sx={{ alignSelf: 'flex-end' }}>
                          <Rating value={review.rating} readOnly />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          ) : (
            // Handle the case when there are no reviews
            <Typography>No reviews available.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompareReviews;
