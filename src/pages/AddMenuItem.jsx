import React from 'react';
import MultiStepForm from '../components/Stepper';
import SideNav from '../components/SideBar'
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
const AddMenuItem = () => {
  const location = useLocation();
  const formData = location.state?.formData || {}; 
  const isEditMode = location.state?.isEditMode || false;
  console.log('formData in AddMenuItem:', formData);
  return (
    <div>
         
       
       <Box height={30}/>
       
       <Box component="main" sx={{ display: "flex" }}>
     
       <SideNav />
       <Box component="main" sx={{ flexGrow: 1, pt: 3, pl: 1, mt:2 }}>
       <h1>Add Menu Item</h1>
       
     <MultiStepForm initialFormData={formData} isEditMode={isEditMode}/>
     </Box>
     </Box>
    </div>
  );
};

export default AddMenuItem;