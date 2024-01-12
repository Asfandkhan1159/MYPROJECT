import React, { useState } from 'react';
import Sidebar from '../components/SideBar';
import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import TransactionTable from '../components/Vendors/VendorsTable/VendorsTable';
import Autocomplete from '@mui/joy/Autocomplete';
import { useVendorData } from '../components/Vendors/VendorsTable/VendorDataContext';
import GetRebates from '../components/Vendors/VendorsTable/GetRebates/GetRebates';
import CompareReviewsComponent from '../components/ReviewsSources/ReviewsComparison';
import { Link } from 'react-router-dom';
const Vendors = () => {
  const { vendorData } = useVendorData();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showRebates, setShowRebates] = useState(false);

  const handleRebatesClick = () => {
    setShowRebates(true);
  };

  const handleVendorSelect = (event, value) => {
    setSelectedVendor(value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', width: 'auto' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, marginTop: '6rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="body1" color="initial" sx={{ marginLeft: '2rem', fontSize: '40px' }}>
              Vendors
            </Typography>
            <Autocomplete
              placeholder="Decorators"
                options={vendorData}
                getOptionLabel={(option) => option.name}
              onChange={handleVendorSelect}
              sx={{ height: '30px' }}
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
      </Box>
    </div>
  );
};

export default Vendors;
