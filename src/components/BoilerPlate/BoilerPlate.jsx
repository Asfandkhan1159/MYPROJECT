import React from 'react';
import Sidebar from '../SideBar';
import { Box } from '@mui/material';

const BoilerPlate = ({ children }) => {
  return (
    <div>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
       
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
          {children}
        </Box>
      </Box>
    </div>
  );
};
export default BoilerPlate;
