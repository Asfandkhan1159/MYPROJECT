import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';


const AppBar = styled(MuiAppBar, {
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,

}));

function Navbar() {
  

  return (
    <AppBar sx={{ backgroundColor: '#FCFAF9' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', justifyContent:"end", alignItems: 'center' }}>
        <Toolbar disableGutters sx={{ color: '#0000', }}>
          {/* Place your logo or app name here */}
        </Toolbar>
      
        <Box sx={{ display: 'flex', justifyContent:"space-between", alignItems: 'center',border: '1px solid #ccc', borderRadius: '4px', width:"186px", padding:"9px" }}>
        
        <Typography variant="subtitle1" sx={{color:"#000000",
         width:"87px",
        height:"18px",
        fontFamily:"Poppins",
        fontWeight:500,
        fontSize:"12px",
        lineHeight:"18px",
        }}>
            John Doe
          </Typography>
          
            <IconButton  sx={{ p: 0 }}>
              {/* Replace the src attribute with the URL of your user's avatar image */}
              <Avatar alt="User Avatar" src="/path/to/avatar-image.jpg" sx={{width:"28px",
            height:"28px",
            mr:"1.5rem"
            }} />
            </IconButton>
         
          {/* Replace 'User Name' with your user's name */}
         
        </Box>
      </Container>
    </AppBar>
  );
}
export default Navbar;
