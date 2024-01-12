// CompareReviewsComponent.js
import React, { useState } from 'react';
import ReviewContainer from './ReviewContainer';
import ReviewSourcesData from './ReviewSourcesData';
import RandomEntityReviewData from './ReviewSourcesData2';
import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import BoilerPlate from '../BoilerPlate/BoilerPlate';
import TheGrooveLogo from '../../assets/Groove/Ellipse 1118.svg'

const CompareReviewsComponent = () => {
  const grooveReviews = ReviewSourcesData;
  const randomEntityReviews = RandomEntityReviewData;

  const [selectedSources, setSelectedSources] = useState(['OpenTable']);
  const [selectedRating, setSelectedRating] = useState('All');

  const handleSourcesChange = (event) => {
    setSelectedSources(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  return (
    <BoilerPlate>
      <Typography variant="h4" color="initial" sx={{padding:"2rem"}}>Compare Reviews</Typography>
      <Box sx={{backgroundColor:"#F6F6F4"}}>
      <Box display="flex" justifyContent="space-between" px="2rem" my="2rem" py="2rem" >
        
      <img src={TheGrooveLogo} alt="" />
      <Typography variant="h5" color="initial" sx={{alignSelf:"center"}}>The Groove vs</Typography>
      <FormControl sx={{width:"350px", backgroundColor:"white"}}>
      <InputLabel id="demo-simple-select-label">Restaurant Near You</InputLabel>
      <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Restaurants Near You"
  >
    <MenuItem >Ed's Traven</MenuItem>
    <MenuItem >StarBucks</MenuItem>
    <MenuItem >Thirty</MenuItem>
  </Select>
      </FormControl>
       <FormControl sx={{backgroundColor:"white"}}>
              
              <Select
                labelId="sources-label"
                id="sources"
                multiple
                value={selectedSources}
                onChange={handleSourcesChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {ReviewSourcesData.map((source, index) => (
                  <MenuItem key={index} value={source.name}>
                    {source.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ mx: '30px', backgroundColor:"white" }}>
             
              <Select labelId="rating-label" id="rating" value={selectedRating} onChange={handleRatingChange}>
                <MenuItem value="All">All stars</MenuItem>
                <MenuItem value="5">5 stars</MenuItem>
                <MenuItem value="4">4 stars</MenuItem>
                <MenuItem value="3">3 stars</MenuItem>
                <MenuItem value="2">2 stars</MenuItem>
                <MenuItem value="1">1 star</MenuItem>
              </Select>
            </FormControl>
            </Box>
      <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'space-around', padding: '20px', alignItem: 'end' }}>
        <Grid item md={6}>
          <Paper elevation={3} sx={{ padding: '1px', width:"auto" }}>
            <Typography variant="h5">The Groove Reviews</Typography>
           
            <ReviewContainer reviews={grooveReviews} selectedSources={selectedSources} selectedRating={selectedRating} />
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper elevation={3} sx={{ padding: '1px' }}>
            <Typography variant="h5">Ed's Traven</Typography>
            
            <ReviewContainer reviews={randomEntityReviews} selectedSources={selectedSources} selectedRating={selectedRating} />
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </BoilerPlate>
  );
};

export default CompareReviewsComponent;
