import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Purchases from './Purchases';
import Grid from '@mui/material/Grid';
import LowStock from './lowStock';
import Cost from './Cost';
import CostVariation from './CostVariation';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';

const PurchaseOverview = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Card variant="outlined" sx={{ height: smScreen ? 'auto' : 388, width: smScreen ? 300 : "100%" }}>
        <CardContent>
          <h2>Purchases Overview</h2>
          <Box sx={{ padding: "1.5rem 1rem", display: "flex", flexDirection: "column" }}>

            <Grid container spacing={4} justifyContent="start" alignItems="center">
              <Grid item xs={12} sm={3} md={5.5}>
                <Purchases />
                {!smScreen && (
                  <div>
                    <Divider orientation="horizontal" variant="middle" flexItem sx={{ marginTop: "20px", width: "50%", marginLeft: "2px" }} />
                  </div>
                )}
                <Cost />
              </Grid>

              {!smScreen && (
                <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: "20px", height: "130px", marginTop: "20px" }} />
              )}

              <Grid item xs={6} sm={3} md={5.5}>
                <LowStock />
                {!smScreen && (
                  <div>
                    <Divider orientation="horizontal" variant="middle" flexItem sx={{ marginTop: "20px", width: "50%", marginLeft: "2px" }} />
                  </div>
                )}
                <CostVariation />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOverview;
