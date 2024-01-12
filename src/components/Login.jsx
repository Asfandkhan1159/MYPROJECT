import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {InputLabel, Button, TextField, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; // Import styled-components
import './Login.css'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: "#232323",
  },
});

// Define styled components in the same file
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  box-shadow: 0px 4px 50px 0px #0000002B;
  padding: 20px;
  width: 80%; /* Adjusted width for responsiveness */
  max-width: 592px;
  height: auto;
  margin: 2rem;
`;

const BackgroundImage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%; /* Adjusted width to cover the entire screen */
  height: auto; /* Adjusted height for responsiveness */
  margin-top: 8rem; /* Adjusted margin-top for better positioning on smaller screens */
`;// import { FaGoogle } from 'react-icons/fa';

function LoginForm() {
  return (
 <div className='container'>
 
      
        
          <BackgroundImage>
            <img src="/group-1000000840.svg" alt="" width="100%" height="100%" />
          </BackgroundImage>
          <LoginContainer>
          <LoginBox>
        <Typography variant="h4" sx={{
          fontFamily: 'Poppins',
          fontSize: '32px',
          fontWeight: 600,
          lineHeight: '48px',
          letterSpacing: '0em',
          textAlign: 'left',
          mt: '20px',
          
        }} >Log In</Typography>
        <Typography variant="body2" align="center" sx={{
        fontFamily: "Poppins",
fontSize: "15px",
fontWeight: "400",
lineHeight: "23px",

textAlign: "center",
mb:"4rem"
}}>
          Hi, Enter your details to Log into your account
        </Typography>
        <Box sx={{ width: '100%', display:"flex", flexDirection:"column" ,textAlign: 'center', my: 2, mt: 4 }}> {/* Adjusted margin-top here */}
      <InputLabel htmlFor="email" sx={{display:"block", textAlign:"start",fontWeight:500,color:"#232323"}}>Email Address</InputLabel>
      <TextField id="email" variant="outlined" className='input-style' sx={{
              width: "100%", // Set width to 100% for responsiveness
              maxWidth: "455px"
            }}/>
    
       
          <InputLabel htmlFor="password" sx={{ textAlign:"start",mt:"2rem" ,fontWeight: 500,color:"#232323"}}>Password</InputLabel>
          <TextField
            id="password"
            type="password"
            variant="outlined"

            required
            placeholder="******************"
            className='input-style'
            sx={{
              width: "100%", // Set width to 100% for responsiveness
              maxWidth: "455px"
            }}
          />
        
        </Box>

        <Link to="#" style={{
  textDecoration: 'none',

  marginBottom:"2rem",
  alignSelf: 'end',
  width: '116px',
  height: '20px',
  fontSize: '13px',
  fontWeight: '400',
  lineHeight: '20px',
  letterSpacing: '0em',
  mb: '2rem',
  mt: '0.5rem',
  fontFamily: 'Poppins',
  color: '#0D3D2F',
  justifySelf:"end"

}}>
  Forgot Password?
</Link>

<Link to="/Dashboard/home" className="button-link"
  sx={{
    color: 'white', // Set the text color to white
    background: 'black', // Set the background color to black
  }}>
        Login In
      </Link>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{mt:"2rem"}}>
          <img src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />
          <Typography variant="body2" color="textSecondary">
            Log in with Google
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mt={6}>
          <Typography variant="body2" color="textSecondary" mr={1}>
            Don't have an account?
          </Typography>
          <Link to="/Signup" variant="body2" style={{
            textDecoration:"none",
             fontFamily: 'Poppins',
             color: "#0D3D2F",
             fontWeight:"400",
             fontSize:"13.94px"
          }} >
            Register Here
          </Link>
        </Box>
        </LoginBox>
     
    </LoginContainer>
    </div>
   
  );
}

export default LoginForm;

