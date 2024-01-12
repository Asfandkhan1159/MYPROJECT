import React, { useState } from 'react';
import BoilerPlate from '../../BoilerPlate/BoilerPlate';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import couponsData from './CouponData';
import Grid from '@mui/material/Grid';
import { useTheme,
  useMediaQuery,
  styled,
Box} from '@mui/material'
// import Typography from '@mui/material/Typography'

const CustomerMosiacs = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [shareData, setShareData] = useState({
    email: '',
    phoneNumber: '',
  });

  const handleOpenDialog = (coupon) => {
    setSelectedCoupon(coupon); // Store the selected coupon when opening the dialog
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCoupon(null); // Clear the selected coupon when closing the dialog
    setOpenDialog(false);
  };

  const handleShare = () => {
    console.log('Sharing Data:', shareData, 'for Coupon:', selectedCoupon); // Log both data and coupon
    handleCloseDialog();
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShareData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('lg'));
 


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', width: 'auto' }}>


     
      <BoilerPlate>
        <Box component="main"
         display={smScreen ? "block" : "flex"}
         flexDirection={smScreen ? "row" : "column"}
         justifyContent={smScreen ? "space-between" : "start"}
         alignItems={smScreen ? "center" : "start"}
        
        sx={{ flexGrow: 1, mt: 8 }}>
          
       
       <h1>Coupons</h1>
        <Grid container spacing={0} sx={{ display: 'grid', gridTemplateColumns: smScreen ? 'repeat(1,1fr)' :'repeat(3, 1fr)', gridGap: '1rem' }}>
          {couponsData.map((coupon, index) => (
            <Grid item key={index} md={6} xs={12} sm={12}>
              <Card orientation="horizontal" variant="outlined" sx={{ width: 360 }}>
  <CardOverflow>
    <AspectRatio ratio="1" sx={{ width: 140 }}>
      <img
        src={coupon.image}
        srcSet={coupon.image}
        loading="lazy"
        alt=""
        style={{ height: '100%', objectFit: 'cover' }}
      />
    </AspectRatio>
  </CardOverflow>
                <CardContent>
                  <Typography fontWeight="md" textColor="success.plainColor">
                    {coupon.name}
                  </Typography>
                  <Typography level="body-sm">{coupon.location}</Typography>
                  <Typography level="body-sm">{coupon.discount}% Off</Typography>
                </CardContent>
                <IconButton color="primary" onClick={() => handleOpenDialog(coupon)}>
                  <ShareIcon />
                </IconButton>
                <CardOverflow
                  variant="soft"
                  color="primary"
                  sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    textAlign: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {coupon.type}
                </CardOverflow>
               
              </Card>

              {/* Share Dialog */}
              <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Share Coupon</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" mb={1}>
          You are sharing: {selectedCoupon ? selectedCoupon.name : ''}
        </Typography>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    name="email"
                    value={shareData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="dense"
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    variant="outlined"
                    name="phoneNumber"
                    value={shareData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </DialogContent>
                <DialogActions>
                  <IconButton onClick={handleCloseDialog} color="primary">
                    <Typography>Cancel</Typography>
                  </IconButton>
                  <IconButton onClick={() => handleShare(coupon)} color="primary">
                    <Typography>Share</Typography>
                  </IconButton>
                </DialogActions>
              </Dialog>
            </Grid>
          ))}
        </Grid>
        </Box>
      </BoilerPlate>
      </Box>
    </React.Fragment>
  );
};

export default CustomerMosiacs;
