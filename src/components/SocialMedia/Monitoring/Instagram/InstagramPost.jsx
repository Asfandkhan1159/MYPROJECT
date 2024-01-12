/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import GroveLogo from '../../../../assets/Instagram/theGrove.png'
import Post from '../../../../assets/Instagram/Post.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button'




export default function InstagramPost() {
  return (
    <Grid container spacing={2} sx={{padding:"2rem"}}>
      
    <Grid item md={4.5}>
    <Select placeholder="Choose one…">
  <Option>Angular</Option>
  <Option>Angular</Option>
  <Option>Angular</Option>
</Select>
<Box display="flex" justifyContent="center" marginTop={8}>
<Paper 
    sx={{
        width:"100%",
        padding:"0.8rem",
        maxHeight: "600px", // Set the maximum height as per your requirement
        overflowY: "auto",
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      }}
    variant="elevation" 
    elevation={3}
    >

<Typography textAlign="center" sx={{fontSize:"2.4rem"}}>Pages</Typography>
<Box display="flex" alignItems="center" sx={{border:"1px solid #C4C4C4", padding:"0.7rem", borderRadius:"5px"}}>
                <Avatar alt="" src={GroveLogo} sx={{width:"100px", height:'100px', border:"0.1rem solid #C4C4C4"}}/>
                <Box ml={2}>
                  <Typography variant="subtitle1">Grove</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                 @grove_lwr <InstagramIcon/>
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" fontSize="xl" color="textSecondary">
                     2485 followers
                    </Typography>
                   
                  </Box>
                  
                </Box>
                
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
  <Typography variant="h5" fontSize="xl" color="textSecondary">
    Last 28 days
  </Typography>
  <Grid container spacing={2}>
    <Grid item md={6}>
      <Box textAlign="center" border='1px solid #C4C4C4' borderRadius="5px">
        <Typography variant="body1" color="initial">
          Total Impressions
        </Typography>
        <Typography variant="body1" color="initial">
          187,243
        </Typography>
      </Box>
    </Grid>
    <Grid item md={6}>
      <Box textAlign="center" border='1px solid #C4C4C4' borderRadius="5px">
        <Typography variant="body1" color="initial">
          Total Reach
        </Typography>
        <Typography variant="body1" color="initial">
          587,243
        </Typography>
    
      </Box>
      
    </Grid>
    
  </Grid>
  <Button sx={{ backgroundColor: "Black",
  color: "white",
  marginTop:'40px',
  width:"250px"
  }}>
          Analyze your page
        </Button>
</Box>

    <Box textAlign="center" sx={{border:"0.7px solid #C4C4C4", marginTop:"40px", padding:"2rem", borderRadius:"5px"}}>
      <Typography variant="body1" color="initial">GROVE Restaurant, Patio and Ballroom is a sister restaurant of PIER 22, co-founded by visionary restaurateurs Hugh Miller and Greg Campbell in 2018. As a fine-casual restaurant, GROVE is committed to offering a wide-ranging selection of house-made meals that satisfy any craving. Our Contemporary American cuisine showcases a personal and authentic approach to cooking that never fails to impress.

For us, the dining experience is about more than just food - it's about creating a space where guests can choose their cuisine and scene. We offer several distinct dining areas that cater to a variety of preferences and moods.

Our name is inspired by the sprawling evergreen forests that have long provided an idyllic existence for those living and visiting the Lakewood Ranch area. The pine found in our logo embodies the heart, balance, and spirit that we bring to every dish we serve.

Chef Greg Campbell sums it up best: "We're committed to using quality fresh ingredients along with innovative cooking methods to inspire, nourish, and wholly satisfy our guests." At GROVE, we believe that every meal should be an experience that you won't forget.</Typography>
    </Box>

    </Paper>
</Box>


    </Grid>
    <Grid item md={7.5} sx={{display:"flex", justifyContent:"start"}}>
      <Box marginTop={12}>
    <Paper 
    
    sx={{
        width:"90%",
        padding:"0.8rem",
        maxHeight: "600px", // Set the maximum height as per your requirement
        overflowY: "auto",
        '&::-webkit-scrollbar': {
          width: '12px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      }}
    variant="elevation" 
    elevation={3}
    >
      
      <Typography variant="body1" color="initial">Post and Comments</Typography>
    <Card
      variant="outlined"
     
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            
            position: 'relative',
          
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src={GroveLogo}
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography fontWeight="lg">ＧＲＯＶE
</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
        <img
                  src={Post}
                  alt=""
                  loading="lazy"
                />
        </AspectRatio>
      </CardOverflow>
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
        <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: '50%',
                width: `max(${6 - index}px, 3px)`,
                height: `max(${6 - index}px, 3px)`,
                bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
              }}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          20k Likes
        </Link>
        <Typography fontSize="sm">
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          >
            grove_lwr
          </Link>{' '}
          -📸 Wasabi Tuna - mild wasabi crust, soy mustard sauce, soy glaze, sticky rice, sesame soy zucchini noodles
        </Typography>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          startDecorator="…"
          sx={{ color: 'text.tertiary' }}
        >
          more
        </Link>
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: 'text.tertiary', my: 0.5 }}
        >
          2 DAYS AGO
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
    </Paper>
    </Box>
    </Grid>
    </Grid>
  );
}