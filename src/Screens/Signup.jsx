import {React, useRef, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputLabel, Typography, Container, Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import ReactPhoneInput from 'react-phone-input-2';
import { useForm, Controller } from 'react-hook-form';
import './Signup.css';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#232323',
  },
});

const SignupPage = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm();


  const pageStyles = {
    width: '929px',
    height: '737px',
    borderRadius: '5px',
    padding: '10px',
  };

  const textFieldStyles = {
    width: '385px', // Set the width of the text fields
    height: 'auto', // Set the height of the text fields
    borderRadius: '5px', // Add border-radius
    background: '#F3F3F3', // Add background color
  };

  const passwordInputRef = useRef()
       const confirmPasswordInputRef = useRef()
  
  const [submittedData, setSubmittedData] = useState(null); 
const navigate= useNavigate();
    const onSubmit = async(data) => {
     
    // Handle form submission
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Compare the hashed password with the hashed confirmPassword
    const passwordsMatch = bcrypt.compareSync(confirmPassword, hashedPassword);

    if (!passwordsMatch) {
      console.log("Confirm password should be the same as the password");
      // You might want to handle this as an error
    } else {
      // Passwords match, you can proceed
      console.log('Password Matches');
      console.log('Hashed password', hashedPassword);
      console.log('Hashed confirm password', bcrypt.hashSync(confirmPassword, 10));

      // Save the data (you might want to save hashedPassword instead of the plain password)
      data.password = hashedPassword;
      data.confirmPassword = hashedPassword;
      setSubmittedData(data);
      navigate(`/Signup/OTPvalidation/${data.phone}`, { state: { submittedData: data } });
      console.log(data);
      
    }
    
  };


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ marginTop: '15rem', ...pageStyles }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form" // Add the form tag here
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              background: '#FFFFFF',
              boxShadow: '0px 4px 50px 0px #0000002B',
              padding: '20px 30px',
              borderRadius: '10px',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Poppins',
                fontSize: '32px',
                fontWeight: 600,
                lineHeight: '48px',
                letterSpacing: '0em',
                textAlign: 'center',
                color: '#232323',
              }}
            >
              Sign Up
            </Typography>
            <Typography variant="body2" mt={2}>
              Enter your details to create an account
            </Typography>
         <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  sx={{
    position: 'absolute',
    zIndex: '-1',
    width: '100%',
    height: '100%',
  }}
>
  <img src="/group-1000000840.svg" alt="" width="100%" height="100%" />
</Box>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{
                margin: '40px auto', // Center the form horizontally
              }}
            >
              
              <Box flex="1" display="flex" flexDirection="column" alignItems="start" mr={2}>
              
                <Box mb={2}>
              
                  <InputLabel
                    htmlFor="first-name"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                  >
                    Full Name
                  </InputLabel>
                  <TextField label="Full Name"
                  name='fullname'
                  variant="outlined" fullWidth 
                  sx={textFieldStyles} 
                  {...register('fullname',{
                    required:"Name is required"
                  })}
                  />
                 {errors.fullname && (
                <Typography color="error" variant="body2">
                  {errors.fullname.message}
                </Typography>
              )}
                </Box>
                <Box mb={2}>
                <InputLabel
                    htmlFor="phone"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                    
                  >
                   Phone Number
                  </InputLabel>
                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: true }}

                  render={({ field: { ref, ...field } }) => (
                    
                    <ReactPhoneInput
                  
                      {...field}
                      inputExtraProps={{
                        ref,
                        required: true,
                        autoFocus: true,
                        
                      }}
                      
                      
                    />
                  )}
                />
                {errors.phone && (
                <Typography color="error" variant="body2">
                  {errors.phone.message}
                </Typography>
              )}
                </Box>
                <Box mb={2}>
                  <InputLabel
                    htmlFor="franchise"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                  >
                    Restaurant Website
                  </InputLabel>
                  <TextField variant="outlined" type="Phone" fullWidth sx={textFieldStyles} />
                </Box>
                <Box mb={2}>
                  <InputLabel
                    htmlFor="password"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                     
                  >
                    Password
                  </InputLabel>
                  <TextField 
  label="Password" 
  variant="outlined" 
  type="password" 
  fullWidth 
  sx={textFieldStyles}
  inputRef={passwordInputRef} // Use inputRef to assign the ref
  {...register('password', {
    required: 'Password is required',
  })}
/>
                    {errors.password && (
                <Typography color="error" variant="body2">
                  {errors.password.message}
                </Typography>
              )}
                 
                </Box>
              </Box>
              <Box flex="1" display="flex" flexDirection="column" alignItems="start" ml={2}>
                <Box mb={2}>
                  <InputLabel
                    htmlFor="Email"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                  >
                   Email
                  </InputLabel>
                  <TextField label="Email"
                   variant="outlined"
                    fullWidth 
                    sx={textFieldStyles}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email format',
                      },
                    })}
                     />
                      {errors.email && (
                <Typography color="error" variant="body2">
                  {errors.email.message}
                </Typography>
              )}
                </Box>
                <Box mb={2}>
                  <InputLabel
                    htmlFor=""
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                  >
                    Name of Franchise
                  </InputLabel>
                  <TextField label="eg KFC" variant="outlined" fullWidth sx={textFieldStyles} />
                </Box>
                <Box mb={2}>
                  <InputLabel
                    htmlFor="domain"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}
                  >
                    Domain
                  </InputLabel>
                  <TextField  variant="outlined" type="text"  sx={{width:"246px",
                height:"auto"
                }}  />
                </Box>
                <Box mb={2}>
                  <InputLabel
                    htmlFor="confirm-password"
                    className="input-label"
                    sx={{
                      minWidth: '120px',
                      fontWeight: 500,
                    }}

                  >
                    Confirm Password
                  </InputLabel>
                  <TextField label="Confirm Password" 
                  variant="outlined" type="password" 
                  inputRef={confirmPasswordInputRef}
                  fullWidth sx={textFieldStyles}
                   {...register('confirmPassword', {
                    required: 'Password is required',
                   
                  })}
                  />
                    {errors.password && (
                <Typography color="error" variant="body2">
                  {errors.password.message}
                </Typography>
              )}
               
                </Box>
              </Box>
            </Box>

            <Button
              type="submit"
              className="btn-submit"
              sx={{
                color: 'white',
                background: 'black',
              }}
            >
              SignUp
            </Button>
           
            <Box display="flex" justifyContent="center" mt={6}>
              <Typography variant="body2" color="textSecondary" mr={1}>
                Don't have an account?
              </Typography>
              <Link
                to="/login"
                variant="body2"
                style={{
                  textDecoration: 'none',
                  fontFamily: 'Poppins',
                  color: '#0D3D2F',
                  fontWeight: '400',
                  fontSize: '13.94px',
                }}
              >
                Login Here
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignupPage;
