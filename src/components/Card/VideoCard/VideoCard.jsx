import React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Video from '../../../assets/Groove/video.mp4';
import {useTheme, useMediaQuery } from '@mui/material'
export default function MediaCard() {
  const theme = useTheme();
   const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
   
      <Box
        component="ul"
        sx={{ display: 'flex',width: smScreen ? '300px' : '100%', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
      >
        <Card
          component="li"
          sx={{  width: smScreen ? '300px' : '100%', flexGrow: 1, height: '300px' }}
        >
          <CardCover>
            <video loop controls>
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardCover>
          
        </Card>
      </Box>
   
  );
}
