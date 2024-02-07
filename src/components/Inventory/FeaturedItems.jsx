// FeaturedItems.jsx
import React from 'react';
import InventoryDonutChart from './InventoryDonutChart';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'

const FeaturedItems = ({ featuredItems }) => {
  return (
    <div>
     <Typography variant="h4" color="initial" sx={{ marginLeft: '2rem', fontSize: '20px' }}>
              Featured Items
            </Typography>
      <Grid container spacing={2}>
        {featuredItems.map((item) => (
          <Grid key={item.id} item md={3} xs={12}>
            <div>
              <h3 style={{display:"flex", justifyContent:"center"}}>{item.itemName}</h3>
              <InventoryDonutChart data={item} />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FeaturedItems;
