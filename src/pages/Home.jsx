import React,{useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
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
function Home() {
  // Sample data for the table
  const { selectedRestaurant, updateSelectedRestaurant, restaurants, setSelectedRestaurant } = useRestaurant();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const { getResponsiveStyles } = useResponsiveStyles();
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
  
  return (
    <div>
        {/* <Navbar /> */}
    
        <BoilerPlate>
        <Box component="main" sx={{ display: { xs: 'block', sm: 'block' }, flexGrow: 1, pt: 3, mt: 8, px: "1rem" }}>
          <Box display="flex" flexDirection="row">
            <Typography variant="h4" sx={{ width: "100%", mb: 2 }}>
              Welcome to {selectedRestaurant.name}
            </Typography>
            <Select
  value={selectedRestaurant ? [selectedRestaurant.name] : []}
  multiple
  onChange={handleChange}
  sx={{ width: '30%', mb: 2 }}
  slotProps={{
    listbox: {
      sx: {
        width: '20%',
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
          <Grid container sx={{ width: '100%' }}>
            <Grid item md={12} xs={10} sx={{ p: 2 }}>
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={{ height: '400px', width: '100%' }}
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
          </Grid>
          <Box sx={{...getResponsiveStyles(), backgroundColor: "#f6f6f4", padding: "0.6rem" }}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12} sm={12}>
                <TrendingProducts />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <MediaCard />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <Card sx={{ height: '100%', width: "100%" }}>
                  <CardContent>
                    <WeeklyStatsCard
                      heading='Restaurant Statistics Weekly'
                      revenueTitle="Purchases"
                      revenue={selectedRestaurant.weeklyStats.purchases}
                      profitTitle="Profit"
                      profit={selectedRestaurant.weeklyStats.profit}
                      salesTitle="Sales"
                      sales={selectedRestaurant.weeklyStats.sales}
                      vendorsTitle="Total Vendors"
                      vendors={selectedRestaurant.weeklyStats.vendors}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <Card sx={{ height: '100%', width: "100%" }}>
                  <CardContent>
                    <WeeklyStatsCard
                      heading='Purchasing Overview'
                      revenueTitle="Purchases"
                      revenue={selectedRestaurant.purchasingOverview.purchases}
                      profitTitle="Low stock"
                      profit='34'
                      salesTitle="Cost"
                      sales='$756'
                      vendorsTitle="Cost Variation"
                      vendors='1%'
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </BoilerPlate>
    </div>
  )
}

export default Home;
