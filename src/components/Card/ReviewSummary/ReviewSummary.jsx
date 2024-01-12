import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Rating, Box } from '@mui/material';
import LinearProgress from '@mui/joy/LinearProgress';

const ReviewSummary = () => {
  const [value, setValue] = useState(2);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const positivePercent = 50;
    const negativePercent = 20;
    const neutralPercent = 10;
    const noRatingPercent = 20;

    const positiveCount = Math.round((positivePercent / 100) * 100);
    const negativeCount = Math.round((negativePercent / 100) * 100);
    const neutralCount = Math.round((neutralPercent / 100) * 100);
    const noRatingCount = Math.round((noRatingPercent / 100) * 100);

    const reviewValues = [
      ...Array(positiveCount).fill(5),
      ...Array(negativeCount).fill(1),
      ...Array(neutralCount).fill(3),
      ...Array(noRatingCount).fill(null),
    ];

    const shuffledValues = reviewValues.sort(() => Math.random() - 0.5);

    const reviews = shuffledValues.map((value, index) => ({
      id: index + 1,
      rating: value,
    }));

    setReviews(reviews);
  }, []);

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

  return (
   
    <Card>     
      <CardContent>
        <Typography variant="h6" color="initial">
          Review summary
        </Typography>
        <Grid container spacing={0} sx={{marginTop:"2rem"}}>
          <Grid item md={5} sm={4} sx={{display:"flex",flexDirection:"column" ,justifyContent:"center", alignItems:"center"}}>
            <Typography variant="h3" color="initial">
              {averageRating.toFixed(1)}
            </Typography>
            <Rating
              name="simple-controlled"
              value={averageRating}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Typography variant="body1" color="initial">
              {reviews.length} Reviews
            </Typography>
          </Grid>

          <Grid item md={7} sm={6} xs={6} sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
          <Box display="flex" alignItems="center">
      <Typography variant="subtitle2" color="initial">
        Positive
      </Typography>
            <LinearProgress
              determinate
              value={
                (reviews.filter(review => review.rating === 5).length / reviews.length) * 100
              }
              sx={{ marginLeft: '10px', width: '100%', color:"#10A92B" }}
            />
               </Box>
               <Box display="flex" alignItems="center">
      <Typography variant="subtitle2" color="initial">
        Negative
      </Typography>
      <LinearProgress
              determinate
              value={
                (reviews.filter(review => review.rating === 1).length / reviews.length) * 100
              
              }
              
              sx={{ marginLeft: '10px', width: '100%',color:'#979797' }}
            />
      </Box>
            
           <Box display="flex" alignItems="center">
      <Typography variant="subtitle2" color="initial">
        Neutral
      </Typography>
      <LinearProgress
              determinate
              value={
                (reviews.filter(review => review.rating === 3).length / reviews.length) * 100
              }
              sx={{ marginLeft: '10px', width: '100%', color:"#FF5A03" }}
            />
      </Box>
           
            <Box display="flex" alignItems="center">
      <Typography variant="subtitle2" color="initial">
        No Rating
      </Typography>
      <LinearProgress
              determinate
              value={
                (reviews.filter(review => review.rating === null).length / reviews.length) * 100
              }
              sx={{ marginLeft: '10px', width: '100%', color:"#FF5A03" }}
            />
      </Box>
            
          </Grid>
        </Grid>
        </CardContent>
        </Card>
  );
};

export default ReviewSummary;