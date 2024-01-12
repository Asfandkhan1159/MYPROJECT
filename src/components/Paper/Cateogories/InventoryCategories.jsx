import React from 'react'
import Typography from '@mui/joy/Typography';

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'



const InventoryCategories = ({heading="",value="", days="", heading2="", value2=""}) => {
  return (
    <div>
        
        <Box display="main" mx="10px" my="0px" sx={{display:"flex",flexDirection:"column" ,alignItems:"start", gap:2, paddingBottom:"2rem"}} >
        <Typography variant="heading" color="initial" sx={{height:"0px"}}>{heading}</Typography>
        <Grid container spacing={0}>
          <Grid item md ={6}>
          <Typography variant="body1" color="initial">{value}</Typography>
        <Typography level="body-xs">{days}</Typography>
          </Grid>
          <Grid item md ={6}>
     
        <Typography level="body-1">{value2}</Typography>
        <Typography level="body-xs">{heading2}</Typography>
          </Grid>
        </Grid>
        
        </Box>
   

    </div>
  )
}

export default InventoryCategories
