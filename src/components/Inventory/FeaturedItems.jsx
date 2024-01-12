// FeaturedItems.jsx
import React from 'react';
import InventoryDonutChart from './InventoryDonutChart';
import Grid from '@mui/material/Grid';

const FeaturedItems = ({ featuredItems }) => {
  return (
    <div>
      <h2>Featured Items</h2>
      <Grid container spacing={5}>
        {featuredItems.map((item) => (
          <Grid key={item.id} item md={3}>
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
