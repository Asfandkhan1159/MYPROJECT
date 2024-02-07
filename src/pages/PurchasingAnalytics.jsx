import React from 'react';
import Typography from '@mui/material/Typography';

import Sidebar from '../components/SideBar';
import Box from '@mui/material/Box';
import MiniCard from '../components/Card/MiniCards/Revenue.jsx';
import Grid from '@mui/material/Grid';
import GroupImage from '../assets/miniCardIcons/Group 1000002788.svg';
import RevenueIcon from '../assets/RevenueIcon.svg';
import SalesIcon from '../assets/miniCardIcons/Subtract.svg'
import ProfitIcon from '../assets/miniCardIcons/Group.svg'
import RestaurantFinanceChart from '../components/Charts/FinanceFlow';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import PurchaseOverview from '../components/Card/PurchaseOverview/PurchaseOverview';
import DonutChart from '../components/Charts/Donut/DonutChart';
import WeeklyStatsCard from '../components/Card/WeeklyStatsCard/WeeklyStatsCard';
import Navbar from '../components/Navbar';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate.jsx';
import PurchasingStatsCard from '../components/Card/PurchasingStats/PurchasingStatsCard.jsx';
import{useTheme,
  styled,
useMediaQuery,
} from '@mui/material';
const revenueOptions = [
  {
    title: "Revenue",
    value: "17645",
    image: RevenueIcon,
    backgroundColor: "#FCF4E5", 
    },
  {
    title: "Profit",
    value: "4507",
    image: ProfitIcon,
    backgroundColor: "#D9F8DD",
  },
  {
    title: "No of Sales",
    value: "248",
    image: SalesIcon,
    backgroundColor: "#FEE6DF",
  },
  {
    title: "Total Vendors",
    value: "46",
    image: GroupImage,
    backgroundColor: "#F9E6F6",
  },
  
];
const Heading = styled(Typography)(({ theme }) => ({
  textAlign: "start",
  color: "black",
  fontWeight: 200,
  // paddingTop: "1em",
  marginBottom:"20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
}));

const PurchasingAnalytics = () => {
  const theme = useTheme();
const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
      <BoilerPlate>
       

        <Box component="main"  sx={{ }}>
          <Typography variant="h4" component="div">
            Purchasing Analytics
          </Typography>

          {/* Your content goes here */}
          <Box sx={{ backgroundColor: "#F6F6F4", py: "2rem", px:"2rem", position: 'relative' }}>
            <Grid container spacing={5}>
              {revenueOptions.map((option, index) => (
                <Grid item xs={12} md={3} sm={6} lg={3} xl={3} key={index}>
                  <MiniCard title={option.title} image={option.image} value={option.value} backgroundColor={option.backgroundColor} />
                </Grid>
              ))}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{width : smScreen ? '300px' : '100%'}}>
                  <CardContent>
                  <RestaurantFinanceChart/>
                  </CardContent>
                 
                </Card>
                
              </Grid>
              <Grid item xs={12} md={6}>
              
                
                <PurchaseOverview/>
               
              </Grid>
              <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{width : smScreen ? '300px' : '100%'}}>
                  <CardContent>
                  
               <DonutChart/>
               </CardContent>
               </Card>
                
                
                
              </Grid>
              <Grid item md={6}>

              <Card variant="outlined" sx={{width:smScreen ? '300px' : '100%' , height:"100%"}}>
                  <CardContent>
                <PurchasingStatsCard  heading='Purchasing Overview'
                 revenueTitle="Purchases"
                 revenue='23'
                 profitTitle="Low stock"
                  profit='23'
                  salesTitle="Cost"
                   sales='$780'
                   vendorsTitle="Cost Variation"
                    vendors='45%' />
                    </CardContent>
                  </Card>

                
             
              </Grid>
            </Grid>
          </Box>
        </Box>
        </BoilerPlate>
      </Box>
    </React.Fragment>
  );
};

export default PurchasingAnalytics;
