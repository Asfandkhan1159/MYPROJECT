// MiniCard (Child)
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Purchases from './Purchases';
import Grid from '@mui/material/Grid'
import LowStock from './lowStock';
import Cost from './Cost';
import CostVariation from './CostVariation';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
const PurchaseOverview = () => {
  

  const contentStyle = {
    display: "flex",
    flexDirection: 'row',
     // Apply background color here
  };
 
  return (
    <div>
      <Card variant="outlined" sx={{maxWidth:"auto", height:"350px"}}>
        <CardContent>
        <h2>Purchases Overview</h2>
        <Box sx={{ padding: "1.5rem 1rem", display:"flex", flexDirection:"column" }}>
        
          <Grid container spacing={4} justifyContent="start" alignItems="center">
            <Grid item xs={5.5} sm={3} md={5.5}>
            <Purchases/>
            <div>
              <Divider orientation="horizontal" variant="middle" flexItem  sx={{marginTop:"20px", width:"50%", marginLeft:"2px"}} />
            
              </div>
              <Cost/>
              
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{marginLeft:"20px", height:"130px", marginTop:"20px"}} />
          
            
            
            <Grid item xs={5.5} sm={3} md={5.5}>
              
              <LowStock/>
              <div>
              <Divider orientation="horizontal" variant="middle" flexItem  sx={{marginTop:"20px", width:"50%", marginLeft:"2px"}}/>
              </div>
             <CostVariation/>
            </Grid>
          
          
          </Grid>
          </Box>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default PurchaseOverview;
