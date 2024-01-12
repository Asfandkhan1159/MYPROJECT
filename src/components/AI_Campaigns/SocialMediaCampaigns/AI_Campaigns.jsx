import React from 'react';
import BoilerPlate from '../../BoilerPlate/BoilerPlate';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid'; // Import the Grid component
import productsData from './productData';

const AI_Campaigns = () => {
  return (
    <div>
      <BoilerPlate>
        <Box display="" mx="2rem" my="2rem" sx="">
          <Typography level="h2" color="initial">
            Real Time Analytics
          </Typography>
          <Grid container spacing={4}> {/* Use Grid container with spacing */}
            {productsData.map((product, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ width: '100%', boxShadow: 'lg' }}>
                  <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                      <img src={product.image} loading="lazy" alt="" />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent>
                    <Typography level="body-xs">{product.category}</Typography>
                    <Link
                      href="#product-card"
                      fontWeight="md"
                      color="neutral"
                      textColor="text.primary"
                      overlay
                      endDecorator={<ArrowOutwardIcon />}
                    >
                      {product.name}
                    </Link>
                    <Rating name="read-only" value={product.rating} readOnly />
                    <Typography
                      level="title-lg"
                      sx={{ mt: 1, fontWeight: 'xl' }}
                      endDecorator={
                        <Chip
                          component="span"
                          size="sm"
                          variant="soft"
                          color={Number(product.rating) >= 3 ? 'success' : 'danger'} // Convert to number before comparison
                        >
                          {Number(product.rating) >= 3 ? '😊' : '😢'} {product.rating}%
                        </Chip>
                      }
                    >
                      ${product.price}
                    </Typography>
                    
                  </CardContent>
                  <CardOverflow>
                  
                  </CardOverflow>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </BoilerPlate>
    </div>
  );
};

export default AI_Campaigns;
