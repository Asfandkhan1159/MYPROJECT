import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  TextField,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import { useSettings } from '../../services/SettingsService/settingContext';

const SettingsPage = () => {
  const {
    darkMode,
    toggleDarkMode,
    notifications,
    toggleNotifications,
    email,
    updateEmail,
    username,
    updateUsername,
    trustedDevices,
    addTrustedDevice,
    removeTrustedDevice,
    activeDevices,
    addRandomActiveSession,
    logoutFromSession,
    themeColor,
    setThemeColor, 
  } = useSettings();

  const [open, setOpen] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState('');
  const [deviceName, setDeviceName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', {
      darkMode,
      notifications,
      email,
      username,
      trustedDevices,
    });
  };
  function getRandomLocation() {
    const locations = [
      'Toronto, CA',
      'New York, US',
      'London, UK',
      'Paris, FR',
      'Sydney, AU',
      'Tokyo, JP',
    ];
    const randomIndex = Math.floor(Math.random() * locations.length);
    return locations[randomIndex];
  }
  const handleThemeChange = (event) => {
    setThemeColor(event.target.value);
  };

  const handleAddDevice = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveDevice = (device) => {
    removeTrustedDevice(device);
  };

  const handleDeviceNameChange = (event) => {
    setDeviceName(event.target.value);
  };

  const handleDeviceSelect = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleAddTrustedDevice = () => {
    addTrustedDevice(deviceName);
    setDeviceName('');
    handleClose();
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#000000',
      },
    },
    typography: {
      h4: {
        fontSize: '2rem',
        fontWeight: 600,
        marginBottom: '1rem',
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
      },
      
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
  <Grid item xs={12} md={5} sx={{display:"flex"}}>
    <FormGroup>
      <Typography variant="body1" color="initial">Secure Browsing</Typography>
      <FormControlLabel
        labelPlacement="right"
        control={
          <Switch
            checked={notifications}
            onChange={toggleNotifications}
            color="primary"
          />
        }
        label={<Typography  variant='caption'>Enable Push Notifications</Typography>}
      />
      
      {/* Login Approvals Switch */}
      <br></br>
      <Typography variant="body1" color="initial">Login Notifications</Typography>
      <FormControlLabel
      
        control={<Switch color="primary" />}
        label={<Typography  variant='caption'>Notify when login attemped from another place</Typography>}
        labelPlacement="right"
      />
       <Typography variant="body1" color="initial">Login Approvals</Typography>
      <FormControlLabel
      
        control={<Switch color="primary" />}
        label={<Typography  variant='caption'>Approval is not required when logged in from recognized devices</Typography>}
        labelPlacement="right"
      />
    </FormGroup>
  </Grid>
              
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        
                        color="primary"
                      />
                    }
                    label={<Typography  variant='caption'>Dark Mode</Typography>}
                  />
                </FormGroup>
              </Grid>
              <Grid item md={12}>
              
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom>
                  Devices
                </Typography>
                <List  sx={{fontSize:"0.01rem"}}>
                  {activeDevices.map((device) => (
                    <ListItem key={device.name}>
                      <ListItemText
                       primary={device.name}
                         primaryTypographyProps={{ style: { fontSize: '0.9rem' } }} 
                       />
                      <Chip
                        label={device.isActive ? 'Active' : 'Inactive'}
                        variant="outlined"
                        color={device.isActive ? 'success' : 'error'}
                        style={{ marginLeft: '1rem' }}
                      />
                      {device.isActive && (
                        <Chip
                          variant="outlined"
                          label="Logout"
                          color="error"
                          onClick={() => logoutFromSession(device)}
                          style={{ marginLeft: '1rem' }}
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddDevice}
                  style={{ marginTop: '1rem', marginLeft: '1rem' }}
                >
                  Add Device
                </Button>
              </Grid>
              <Grid item md={8}>
              <Typography variant="h4" gutterBottom>
        Active Sessions
      </Typography>
              <List>
             
  {activeDevices.map((device) => (
    <ListItem key={device.name}>
      <ListItemText primary={`${device.name} | ${getRandomLocation()}`}
        primaryTypographyProps={{ style: { fontSize: '0.8rem' } }} 
      />
      <Chip
        label={device.isActive ? 'Active' : 'Inactive'}
        variant="outlined"
        color={device.isActive ? 'success' : 'error'}
        style={{ marginLeft: '1rem' }}
      />
      {device.isActive && (
        <Chip
          variant="outlined"
          label="Logout"
          color="error"
          onClick={() => logoutFromSession(device)}
          style={{ marginLeft: '1rem' }}
        />
      )}
    </ListItem>
  ))}
</List>
</Grid>
              
              <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                  Change Password
                </Typography>
                <TextField
                  margin="dense"
                  id="email"
                  label="password"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={updateEmail}
                />
                <TextField
                  margin="dense"
                  id="username"
                  label="confirm password"
                  type="text"
                  fullWidth
                  value={username}
                  onChange={updateUsername}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
              Save Settings
            </Button>
          </form>
        </Paper>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Trusted Device</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="device-select-label">Select Device</InputLabel>
            <Select
              labelId="device-select-label"
              id="device-select"
              value={selectedDevice}
              onChange={handleDeviceSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="laptop">Laptop</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="device-name"
            label="Device Name"
            type="text"
            fullWidth
            value={deviceName}
            onChange={handleDeviceNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTrustedDevice} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default SettingsPage;