import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Character from '../../../assets/Character.svg'


const CharacterIcon = styled('img')({
    width: "198px",
 height: "100%",
 objectFit: "cover",
 paddingTop:'0',
 marginTop:"0",
 display:'flex',
 alignItems:"flex-start"
   });
 
export default function MediaCard() {
  return (
    <Card sx={{height:"300px"}}>
      <Grid container>
        <Grid item xs={8.5}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Your August Stats Video is here!!
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Restanomics provide video representation to its customers to view monthly stats of the restaurants. Click on the button below to Download your monthly stats.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Grid>
        <Grid item xs={3.5}>
          <CardMedia
            sx={{ height: 291, alignSelf:"flex-start", marginTop:"-2rem", zIndex:'1' }}
            image={Character}
            title="green iguana"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
