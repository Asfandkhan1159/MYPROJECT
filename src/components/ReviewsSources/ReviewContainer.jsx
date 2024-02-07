import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Rating, FormControl, InputLabel, Select, MenuItem, useTheme,useMediaQuery, Grid } from '@mui/material';

const ReviewContainer = ({ reviews, selectedSources, selectedRating }) => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    let filtered = reviews;

    // Filter by selected sources
    if (selectedSources.length > 0) {
      filtered = filtered.filter((source) => selectedSources.includes(source.name));
    }

    // Filter by selected rating
    if (selectedRating !== 'All') {
      filtered = filtered.map((source) => {
        if (source.reviews && source.reviews.length > 0) {
          return {
            ...source,
            reviews: source.reviews.filter((review) => review.rating === parseFloat(selectedRating)),
          };
        }
        return source;
      });
    }

    setFilteredReviews(filtered);
  }, [selectedSources, selectedRating, reviews]);

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <Typography variant="body1">No reviews available</Typography>;
  }

  

  return (
   
    <Box>
      <Box sx={{ width: smScreen ? "300px" : "auto",
       height: "504px",
        overflowY: "scroll",
         padding: "30px",
          "&::-webkit-scrollbar": { width: "0.4em" },
           "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#888" },
             "&::-webkit-scrollbar-thumb:hover": { background: "#555" } }}>
        {filteredReviews.map((source, index) => (
          <Box display="flex" key={index} mb={3}>
            <Box>
              {source.reviews.map((review, idx) => (
                <Box key={idx} display="flex" alignItems="center" width="auto">
                  <Avatar alt={source.name} src={source.logo} />
                  <Typography sx={{ marginTop: '18px', width: smScreen ? "200px" : "300px" }}>
                    {review.text} 
                  <Box display='flex' flexDirection={smScreen ? "column" : "row"} justifyContent="space-between">
                  <Typography variant='caption'>Food: {review.foodRating}</Typography>
                  <Typography variant='caption'>Service: {review.serviceRating}</Typography>
                  <Typography variant='caption'>Value: {review.valueRating}</Typography>
                  <Typography variant='caption'>Ambiance: {review.ambianceRating}</Typography>
                  </Box>
                  </Typography>
                  
                  <Rating value={review.rating} readOnly />
                  
                </Box>
              ))}
              
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewContainer;