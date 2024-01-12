import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SideNav from '../components/SideBar'
import Navbar from '../components/Navbar';
import SettingsPage from '../components/Configuration/settingsConfig';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
function Settings() {
  return (
    <div>
    <BoilerPlate>
        <h1>Settings</h1>
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor:"#F6F6F4" }}>
        <SettingsPage/>
      </Box>
     </BoilerPlate>
     </div>
  )
}

export default Settings
