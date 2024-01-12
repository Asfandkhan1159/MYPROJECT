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
const Reviews = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
      <BoilerPlate>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h4" color="initial" sx={{ marginLeft: "2rem", fontSize: "40px", mt: 3, margin: "2rem" }}>Reviews</Typography>
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
              <Card sx={{ height: "260px",width:smScreen ? '464px' : '100%' }}>
                <CardContent>
                  <ReviewSummary />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <TopReviewSources />
            </Grid>
            <Grid item xs={12}>
              <ReviewFilter sx={{ width:smScreen ? '44px' : '100%' }} />
            </Grid>
          </Grid>
        </Box>
      </BoilerPlate>
    </div>
  )
}

export default Reviews
