import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import { Box, Typography, List, ListItemButton, ListItemText,useTheme, useMediaQuery  } from '@mui/material';
import TransactionTable from '../components/Vendors/VendorsTable/VendorsTable';
import Autocomplete from '@mui/joy/Autocomplete';
import { useVendorData } from '../components/Vendors/VendorsTable/VendorDataContext';
import GetRebates from '../components/Vendors/VendorsTable/GetRebates/GetRebates';
import CompareReviewsComponent from '../components/ReviewsSources/ReviewsComparison';
import { Link } from 'react-router-dom';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
const Vendors = () => {
  const { vendorData } = useVendorData();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showRebates, setShowRebates] = useState(false);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const handleRebatesClick = () => {
    setShowRebates(true);
  };

  const handleVendorSelect = (event, value) => {
    setSelectedVendor(value);
  };

  return (
    <div>
      <Box>
      <BoilerPlate>
        <Box component="main">
          <Box sx={{ display: smScreen ? 'block' : 'flex',justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body1" color="initial" sx={{ marginLeft: '2rem', fontSize: '40px' }}>
              Vendors
            </Typography>
            <Autocomplete
              placeholder="Decorators"
                options={vendorData}
                getOptionLabel={(option) => option.name}
              onChange={handleVendorSelect}
            
            />
            <List sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemButton component={Link}
              to='/dashboard/getrebates'
              >
                <ListItemText primary="Get Rebates" />
              </ListItemButton>
            
              <ListItemButton component={Link}
              to="/dashboard/searchitem"
              >
                <ListItemText primary="Search for Items" />
              </ListItemButton>
            </List>
          </Box>
          <Box sx={{ marginTop: '5rem' }}>
            <TransactionTable selectedVendor={selectedVendor} />
            
          </Box>
        </Box>
        </BoilerPlate>
      </Box>
    </div>
  );
};

export default Vendors;
