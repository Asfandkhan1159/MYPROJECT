import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {
  
  Typography,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import styled from 'styled-components';
import Grid from '@mui/system/Unstable_Grid';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
const Buttongroup = styled(ButtonGroup)({
  color:"#0d3d2f"
})


const PurchasingStatsCard = ({heading, revenueTitle ,revenue , profit , profitTitle, sales , salesTitle, vendors,vendorsTitle}) => {
  const [activeButton, setActiveButton]=useState();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const buttons = [
    <Button key="week" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'week' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('monthly'); setActiveButton('monthly'); }} checked={activeButton === 'monthly'}>Week</Button>,
    <Button key="month" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'month' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('weekly'); setActiveButton('weekly'); }} checked={activeButton === 'weekly'}>Month</Button>,
    <Button key="quarter" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'quarter' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('daily'); setActiveButton('daily'); }} checked={activeButton === 'daily'}>Quarter</Button>,
    <Button key="annually" sx={{ border: 'none', color: 'primary.main', '&.MuiButton-text': { color: 'grey.500' }, outline: 'none', backgroundColor: activeButton === 'annually' ? '#d6ead8' : '#f6f6f4', color: 'black' }} onClick={() => { fetchData('annually'); setActiveButton('annually'); }} checked={activeButton === 'annually'}>Annual</Button>
  ];
  return (
    <div>
    <Grid container columns={24} sx={{ marginTop: "2rem" }}>
      <Grid item md={11}>
        <Typography variant='h6' sx={{ width: "100%", fontSize: "16px" }}>
          <b>
            {heading}
          </b>
        </Typography>
      </Grid>
      <Grid item md={13}>
        <ButtonGroup aria-label="Time Period" sx={{ display: "flex", justifyContent: "flex-end", border: "none", height: "auto" }}>
          {buttons}
        </ButtonGroup>
      </Grid>
    </Grid>

    <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: "7rem" }}>
      <Grid item xs={6} md={3}>
        <Tooltip title="Total Revenue" arrow>
          <IconButton>
            <RestaurantIcon />
          </IconButton>
        </Tooltip>
        <Typography variant='caption' sx={{ width: "49px" }}>
          {revenueTitle}
        </Typography>
        <Typography variant='h6' align="center" sx={{ width: "49px" }}>{revenue}</Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Tooltip title="Total Profit" arrow>
          <IconButton>
            <LocalOfferIcon />
          </IconButton>
        </Tooltip>
        <Typography variant='caption' sx={{ width: "49px" }}>
          {profitTitle}
        </Typography>
        <Typography variant='h6' align="center" sx={{ width: "49px" }}>{profit}</Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Tooltip title="Total Sales" arrow>
          <IconButton>
            <FastfoodIcon />
          </IconButton>
        </Tooltip>
        <Typography variant='caption' sx={{ width: "49px" }} >
          {salesTitle}
        </Typography>
        <Typography variant='h6' align="center" sx={{ width: "49px" }}>{sales}</Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Tooltip title="Total Vendors" arrow>
          <IconButton>
            <RoomServiceIcon />
          </IconButton>
        </Tooltip>
        <Typography variant='caption' sx={{ width: "49px" }}>
          {vendorsTitle}
        </Typography>
        <Typography variant='h6' align="center" sx={{ width: "49px" }}>{vendors}</Typography>
      </Grid>
    </Grid>

  </div>
);
};




export default PurchasingStatsCard;