import React, { useState, useEffect } from 'react';
import ReviewSourcesData from './ReviewSourcesData';
import { Box, Avatar, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import Rating from '@mui/material/Rating';

const CompareReviews = () => {
  const [selectedSources, setSelectedSources] = useState(['OpenTable', 'Yelp']);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState('All'); // State for selected rating

  const handleSourceClick = (source) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];
    setSelectedSources(updatedSources);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? 'All' : rating);
  };

  useEffect(() => {
    let filtered = ReviewSourcesData.filter((source) => selectedSources.includes(source.name));

    // Filter by selected rating
    if (selectedRating !== 'All') {
      filtered = filtered.map((source) => ({
        ...source,
        reviews: source.reviews.filter((review) => review.rating === parseFloat(selectedRating)),
      }));
    }

    setFilteredReviews(filtered);
  }, [selectedSources, selectedRating]);

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {/* Select Sources Chips */}
            {ReviewSourcesData.map((source, index) => (
              <Grid item key={index}>
                <Chip
                  label={source.name}
                  onClick={() => handleSourceClick(source.name)}
                  color={selectedSources.includes(source.name) ? 'primary' : 'default'}
                  sx={{ margin: 1 }}
                />
              </Grid>
            ))}
            {/* Rating Filter Chips */}
            {['All', '5', '4', '3', '2', '1'].map((rating, index) => (
              <Grid item key={index}>
                <Chip
                  label={rating === 'All' ? 'All stars' : `${rating} stars`}
                  onClick={() => handleRatingClick(rating)}
                  color={rating === selectedRating ? 'primary' : 'default'}
                  sx={{ margin: 1 }}
                />
              </Grid>
            ))}
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
