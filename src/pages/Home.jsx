import React,{useState, useEffect} from 'react';
import { styled,useTheme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WeeklyStatsCard from '../components/Card/WeeklyStatsCard/WeeklyStatsCard';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import "./Home.css"
import SideNav from '../components/SideBar';
import Navbar from '../components/Navbar';
import TrendingProducts from '../components/Card/TrendingProductsCard/TrendingProducts';
import Stack from '@mui/material/Stack';
import MediaCard from '../components/Card/VideoCard/VideoCard';
import InventoryList from '../components/Inventory/InventoryList';
// Import the image using require
import image8 from '../assets/image 8.svg';
import InventoryTable from '../components/Inventory/InventoryTable';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import useGoogleMapsApiKey from '../services/Item_API/GoogleApi';
import { useRestaurant } from '../services/RestaurantContext/RestaurantContext';
import useResponsiveStyles from '../services/Responsive/getResponsiveStyles';
import { AspectRatio } from '@mui/joy';

function Home() {
  // Sample data for the table
  const { selectedRestaurant, updateSelectedRestaurant, restaurants, setSelectedRestaurant } = useRestaurant();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const { getResponsiveStyles } = useResponsiveStyles();


  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  // const [restaurant,setRestaurant]= useState(['The Groove'])
  const handleChange = (event, newValue) => {
    console.log(`You have chosen "${newValue}"`);
  
    // Ensure that newValue is a string or an array of strings
    if (typeof newValue === 'string' || Array.isArray(newValue)) {
      // If it's a string, convert it to an array
      const selectedValues = typeof newValue === 'string' ? [newValue] : newValue;
  
      // Find the corresponding restaurant for the selected values
      const selectedRestaurant = restaurants.find((restaurant) =>
        selectedValues.includes(restaurant.name)
      );
  
      // Log the selected restaurant
      console.log('Selected Restaurant:', selectedRestaurant);
  
      // Update the selected restaurant
      updateSelectedRestaurant(selectedRestaurant);
    } else {
      console.error('Unexpected format of newValue:', newValue);
    }
  };
  
  
  
  
  
  
  
  

  console.log('selectedRestaurant', selectedRestaurant)
  const center = selectedRestaurant.location
  console.log('center', center)

      const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


      const generateRealisticData = (duration, maxValue, hourly, filter,isMonetaryKPI ) => {
        const now = new Date().getTime();
      
        const timeInterval = filter === 'daily' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // One hour or one day in milliseconds
      
        // Add a condition to generate hourly data for the latest day when "daily" filter is selected
        if (filter === "daily") {
          return Array.from(
            { length: 24 }, // 24 hours in a day
            (_, index) => now - index * timeInterval
          )
            .reverse()
            .map((timestamp) => ({
              x: timestamp,
              y: Math.floor(Math.random() * maxValue),
              isMonetaryKPI: isMonetaryKPI, 
            }));
        }else if (filter === "weekly") {
          // Generate data for the latest 30 days when "monthly" filter is selected
          return Array.from(
            { length: 7 },
            (_, index) => now - index * timeInterval
          )
            .reverse()
            .map((timestamp) => ({
              x: timestamp,
              y: Math.floor(Math.random() * maxValue),
              isMonetaryKPI: isMonetaryKPI, 
            }));
        }
      
        else if (filter === "monthly") {
          // Generate data for the latest 30 days when "monthly" filter is selected
          return Array.from(
            { length: 30 },
            (_, index) => now - index * timeInterval
          )
            .reverse()
            .map((timestamp) => ({
              x: timestamp,
              y: Math.floor(Math.random() * maxValue),
              isMonetaryKPI: isMonetaryKPI, 
            }));
        } else if (filter === "quarterly") {
          // Generate data for the latest 90 days when "quarterly" filter is selected
          return Array.from(
            { length: 90 },
            (_, index) => now - index * timeInterval
          )
            .reverse()
            .map((timestamp) => ({
              x: timestamp,
              y: Math.floor(Math.random() * maxValue),
              isMonetaryKPI: isMonetaryKPI, 
            }));
        }
      
        // Default case (e.g., if filter is not recognized)
        return [];
      };
      
      
  
  return (
    <Box  sx={{ display: 'flex', maxHeight:'100vh' }}>
    <BoilerPlate>
     

      <Box  sx={{display: smScreen ? 'block' : 'flex'}}>
      <Typography variant="h4" sx={{ width: "100%", mb: 2, fontSize: smScreen?'1.5rem' : '2rem' }}>
              Welcome to {selectedRestaurant.name}
            </Typography>
            <Select
  value={selectedRestaurant.name}
  
  onChange={handleChange}
  sx={{ width: smScreen ? "100%" : "30%", mb: 2 }}
  slotProps={{
    listbox: {
      sx: {
        width: smScreen ? '100%' : '20%',
       
      },
    },
  }}
>
  {restaurants.map((restaurant) => (
    <Option key={restaurant.id} value={restaurant.name}>
      {restaurant.name}
    </Option>
  ))}
</Select>
</Box>

        {/* Your content goes here */}
       
        <Box  sx={{ backgroundColor: "#F6F6F4", py: "2rem", px:"2rem" }}>

        <Grid container spacing={6}>
          <Grid item md={6} xs={6} sm={6}>
        
        
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                 mapContainerStyle={{ height: smScreen ? '300px' : '300px', width: smScreen? '300px' : '100%'}}
                  center={center}
                  zoom={18}
                >
                  <Marker position={center} onClick={handleMarkerClick} />
                  {infoWindowOpen && (
                    <InfoWindow
                      position={center}
                      onCloseClick={() => setInfoWindowOpen(false)}
                    >
                      <div>
                        <h3>{selectedRestaurant.name}</h3>
                        <p>Weekly Stats:</p>
                        <ul>
                          <li>Purchases: {selectedRestaurant.weeklyStats.purchases}</li>
                          <li>Profit: {selectedRestaurant.weeklyStats.profit}</li>
                          <li>Sales: {selectedRestaurant.weeklyStats.sales}</li>
                          <li>Vendors: {selectedRestaurant.weeklyStats.vendors}</li>
                        </ul>
                        <p>Purchasing Overview:</p>
                        <ul>
                          <li>Purchases: {selectedRestaurant.purchasingOverview.purchases}</li>
                          <li>Low Stock: {selectedRestaurant.purchasingOverview.lowStock}</li>
                          <li>Cost: {selectedRestaurant.purchasingOverview.cost}</li>
                          <li>Cost Variation: {selectedRestaurant.purchasingOverview.costVariation}</li>
                        </ul>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <MediaCard />
              </Grid>
         
              <Grid item md={6} xs={12} sm={12}>
                    
              
                <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%', }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Sales KPIs</b>
          </Typography>
          <WeeklyStatsCard
  kpiTitles={["Sales", "Guest's Served", "Average Check size"]}
  kpiData={{
    sparklineData: generateRealisticData(0, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}  // Pass the function as a prop
/>

                  </CardContent>
                </Card>
             
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
              
                <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%' }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Profitablity KPIs</b>
          </Typography>
          <WeeklyStatsCard
  kpiTitles={["Gross Margin", "Net Profit Margin", "Purchases"]}
  kpiData={{
    sparklineData: generateRealisticData(30, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}  // Pass the function as a prop
/>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
              
                <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%' }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Customer Satisfaction KPI's</b>
          </Typography>
          <WeeklyStatsCard
  kpiTitles={["Reviews", "Complaints"]}
  kpiData={{
    sparklineData: generateRealisticData(30, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}  // Pass the function as a prop
/>

                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                
                <Card sx={{ height: '338px', width: smScreen ? '300px' : '100%' }}>
                  <CardContent>
                  <Typography variant="h4" sx={{ width: '100%', height: '25px', fontFamily: 'Poppins', fontWeight: '500', fontSize: '20px', color: 'rgba(0,0,0,1)' }}>
            <b>Employee Productivity KPIs</b>
          </Typography>
          <WeeklyStatsCard
  kpiTitles={["Employee Turnover", "Productivity per hour"]}
  kpiData={{
    sparklineData: generateRealisticData(30, 0, false, "monthly"),
  }}
  filterOptions={["daily", "weekly", "monthly", "quarterly"]}
  generateRealisticData={generateRealisticData}  // Pass the function as a prop
/>

                  </CardContent>
                </Card>
              </Grid>
           
      
            </Grid>
          </Box>
       
       
        
      </BoilerPlate>
  </Box>
  )
}

export default Home;
