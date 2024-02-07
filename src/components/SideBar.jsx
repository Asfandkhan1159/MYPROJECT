import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Grid,
  ListItemButton,
  Typography,
  Badge,
  Divider,
  Avatar,
  InputBase,
  Paper,
  alpha,
  styled,
  Menu,
  MenuItem,
  Dialog, DialogTitle, DialogContent, DialogContentText,
  useTheme,useMediaQuery,Box
} from "@mui/material";
import {
  
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import Logo from "../assets/path0.svg";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AI_Campaigns from "./AI_Campaigns/SocialMediaCampaigns/AI_Campaigns";
import Insights from '../assets/SideBarICons/sidebar_Icons/com91.svg';
import Menuicon from '../assets/SideBarICons/sidebar_Icons/com21.svg'
import ReviewsIcon from '../assets/SideBarICons/sidebar_Icons/com10.svg'
import CostManagementIcon from '../assets/SideBarICons/sidebar_Icons/com31.svg'
import SettingIcon from '../assets/SideBarICons/sidebar_Icons/com61.svg'
import { useInventoryData } from "./Inventory/InventoryDataContext";
import  {calculateDynamicThreshold, isOutOfStock } from "../services/InventoryService/InventoryDataService";
import MainContent from "./MainContent";
const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,  // z-index set to 1
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
   
    "& .MuiDrawer-paper": {
      position: "relative",
      flexShrink: 2,
      zIndex: theme.zIndex.drawer,
      whiteSpace: "nowrap",
      width: drawerWidth,
      height: "auto", // Set a fixed height
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          drawerWidth: theme.spacing(9),
        },
      }),
    },
  })
);



const Search = styled(Paper)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: 'auto',
  zIndex: 2,  // Ensure higher zIndex for search
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,  // Ensure higher zIndex for search icon
}));

const InputBaseWrapper = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
  zIndex: 4,  // Ensure higher zIndex for input base
  [theme.breakpoints.up('md')]: {
    width: '20ch',
  },
}));


const defaultTheme = createTheme();

const DrawerHeader = styled("div")(({ Drawer }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  padding: "1rem",
}));
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Sidebar = ({children}) => {
  const {rows} = useInventoryData();
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openPurchases, setOpenPurchases] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCostManagement, setOpenCostManagement] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [lowStockNotifications, setLowStockNotifications] = useState([]);


  const toggleDashboard = () => {
    setOpenDashboard(!openDashboard);
  };
  const togglePurchases = () => {
    setOpenPurchases(!openPurchases);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const toggleCostManagement = () => {
    setOpenCostManagement(!openCostManagement);
  };

  const toggleSettings = () => {
    setOpenSettings(!openSettings);
  };
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
// Filter low-stock items
// const lowStockNotifications = rows.filter((item) => item.quantity <= 3);

const handleNotificationClick = () => {
  // Combine all historical consumptions into a single array
  const allHistoricalConsumptions = rows.flatMap((item) => item.historicalConsumption);
  console.log('All Historical Consumptions:', allHistoricalConsumptions);

  // Calculate the threshold based on all historical consumptions
  const threshold = calculateDynamicThreshold(allHistoricalConsumptions);
  console.log('Threshold:', threshold);

  // Identify the low stock items based on the calculated threshold
  const lowStockItems = rows.filter((row) => isOutOfStock(row.quantity, threshold));
  console.log('Low Stock Items:', lowStockItems);

  setLowStockNotifications(lowStockItems);
  setOpen(true);
}


const handleClose = () => {
  setOpen(false);
};
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "24px",
      letterSpacing: "0em",
      textAlign: "center",
      color: "#232323",
    },
  });
  const childItemStyle = {
    marginLeft: '16px', // Adjust the left margin for children
    fontSize: '14px', // Adjust the font size for children
  };

  const childItemClass = "child-sidebar-item"; 

  
 

  return (
    <Box display="flex">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar sx={{ display: 'flex', backgroundColor: '#fff', color: 'black', position:'fixed' }}>
      <Toolbar>
        
        <div style={{ flexGrow: 1 }} />
        {/* Search */}
        <Search component="form">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <InputBaseWrapper
            placeholder="Search..."
            
          />
        </Search>
        {/* Notifications */}
        <div style={{ marginLeft: '16px' }}>
        <IconButton color="inherit" onClick={handleNotificationClick}>
          <Badge badgeContent={lowStockNotifications.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Low Stock Notifications</DialogTitle>
        <DialogContent>
  <DialogContentText>
    {lowStockNotifications.length > 0 ? (
      lowStockNotifications.map((item) => (
        <div key={item.id}>{item.itemName} is low on stock!</div>
      ))
    ) : (
      <div>No low stock notifications</div>
    )}
  </DialogContentText>
</DialogContent>
      </Dialog>
        </div>
        {/* Avatar */}
        <div>
        <IconButton color="inherit" onClick={handleAvatarClick}>
          <Avatar alt="User Avatar" src="https://mui.com/static/images/avatar/2.jpg" />
        </IconButton>
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Settings</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>

        <Drawer variant="permanent" anchor="right" open={isSidebarOpen} display="flex" sx={{height:"100vh"}}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "start", alignItems: "center", padding: "16px" }}>
          {isSidebarOpen && (
            <>
             <Link to="/dashboard/home" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" style={{ width: 56, height: 41 }} />
              <Typography variant="body-1">estanomics</Typography>
            </div>
          </Link>
            </>
          )}
          {!isSidebarOpen && (
            <img src={Logo} alt="Logo" style={{ width: 56, height: 41 }} />
          )}
        </DrawerHeader>

          <List >
         
            <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              px: [1],
            }}
          >
         <IconButton onClick={toggleSidebar}>
         {isSidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
        <ListItemButton onClick={toggleDashboard}
       
>             
          <ListItemIcon>
           <img src={Insights} alt="" />
          </ListItemIcon>
          <ListItemText primary="Business Insights" />
        {openDashboard ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard/home"
            sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
            className={childItemClass}
          >
            <ListItemIcon>{/* Add an icon for the first dropdown item */}</ListItemIcon>
           <Typography variant="body-2" color="initial">Main Dashboard</Typography>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/restaurantstats"
            sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
            className={childItemClass}
          >
          
            <ListItemIcon>{/* Add an icon for the second dropdown item */}</ListItemIcon>
            <Typography variant="body-2" color="initial">Restaurant Metrics</Typography>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/purchasinganalytics"
            sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
            className={childItemClass}
          >
          
            <ListItemIcon>{/* Add an icon for the third dropdown item */}</ListItemIcon>
            <Typography variant="body-2" color="initial">Purchasing Analytics</Typography>
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/dashboard/inventoryreport"
            sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
            className={childItemClass}
          >
          
            <ListItemIcon>{/* Add an icon for the fourth dropdown item */}</ListItemIcon>
            <Typography variant="body-2" color="initial">Inventory Report</Typography>
          </ListItemButton>
        </List>
        <Divider
            variant="middle"
            orientation="horizontal"
            
          />
      </Collapse>
        <ListItemButton onClick={toggleMenu}>
            <ListItemIcon>
            <img src={Menuicon} alt="" />
            </ListItemIcon>
            <ListItemText primary="Menu Intelligence" />
            {openMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link}
              to="/dashboard/About"
              sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
              className={childItemClass}
            
              >
                <ListItemIcon>
             
                </ListItemIcon>
                <Typography variant="body-2" color="initial">Menu Item</Typography>
              </ListItemButton>
              <ListItemButton component={Link}
               sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '32px' } }}
               className={childItemClass}
             
               >
              <ListItemIcon>
                  {/* Add an icon for the first dropdown item */}
                </ListItemIcon>
                <Typography variant="body-2" color="initial">Menu Pricing</Typography>
              </ListItemButton>

            {/* Add more dropdown items as needed */}
          </List>
          <Divider
            variant="middle"
            orientation="horizontal"
            
          />
        </Collapse>
        <ListItemButton
        component={Link}
        to="/dashboard/Reviews" >
          <ListItemIcon>
          <img src={ReviewsIcon} alt="" />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItemButton>
        <ListItemButton
        component={Link}
        to="/dashboard/getrebates" >
          <ListItemIcon>
          <img src={ReviewsIcon} alt="" />
          </ListItemIcon>
          <ListItemText primary="Rebates" />
        </ListItemButton>
        <ListItemButton onClick={toggleCostManagement}>
        <ListItemIcon>
             <img src={CostManagementIcon} alt="" />
            </ListItemIcon>
            <ListItemText primary="Cost Management" />
            {openCostManagement ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        
        </ListItemButton>
        <Collapse in={openCostManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItemButton
        component={Link}
        to="/dashboard/vendors"
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      >
          <ListItemIcon>
            {/* <SettingsIcon /> */}
          </ListItemIcon>
          <Typography variant="body-2" color="initial">Vendors</Typography>
        </ListItemButton>
          </List>
          <ListItemButton
        component={Link}
        to="/dashboard/Inventory"
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      > 
          <ListItemIcon>
            {/* <AccountCircleIcon /> */}
          </ListItemIcon>
          <Typography variant="body-2" color="initial">Inventory</Typography>
        </ListItemButton>
        <Divider
            variant="middle"
            orientation="horizontal"
            
          />
        </Collapse>
       
       
        
        {/* <ListItemButton onClick={togglePurchases}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Digital Marketing" />
            {openPurchases ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openPurchases} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link}
              to="/dashboard/post"
              sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      
              >
                <ListItemIcon>
                
                
              </ListItemIcon>
            
              <Typography variant="body-2" color="initial">Social Media </Typography>
              </ListItemButton>
              <ListItemButton
        component={Link}
        to="/dashboard/AI_Campaigns" 
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      
              
        >
          <ListItemIcon>
                
              
              </ListItemIcon>
         
              <Typography variant="body-2" color="initial">Feedback</Typography>
        </ListItemButton>
        
        <ListItemButton
        component={Link}
        to="/dashboard/Customer_Mosiacs"
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      
              
        > 
          
        <ListItemIcon>
                
        
              </ListItemIcon>
         
              <Typography variant="body-2" color="initial">Discount Deals</Typography>
        </ListItemButton>
        
        <ListItemButton
        component={Link}
        to="/dashboard/customersegmentation"
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
        className={childItemClass}
      
              
        > 
          
        <ListItemIcon>
                
               
              </ListItemIcon>
         
              <Typography variant="body-2" color="initial">Customer Segmentation</Typography>
        </ListItemButton>

           
          </List>
          <Divider
            variant="middle"
            orientation="horizontal"
            
          />
        </Collapse> */}
        {/* Add more top-level menu items here */}
        
        <ListItemButton onClick={toggleSettings}>
        <ListItemIcon>
           <img src={SettingIcon} alt="" />
          </ListItemIcon>
       <ListItemText primary="Settings"/>
       {openSettings? <ExpandLessIcon/> : <ExpandMoreIcon/>}
       </ListItemButton>
       <Collapse in={openSettings} timeout="auto" unmountOnExit>
        <ListItemButton component={Link}
            to='/dashboard/settings'
            sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
            className={childItemClass}
          
                  
            
            >
              <ListItemIcon>
                
                {/* Add an icon for the second dropdown item */}
              </ListItemIcon>
              <Typography variant="body-2" color="initial">Configurations</Typography>
            </ListItemButton>
            <ListItemButton
        component={Link}
        to="/dashboard/users"
        sx={{ ...childItemStyle, "&.child-sidebar-item": { marginLeft: '42px' } }}
            className={childItemClass}
          
                  
            
            >
        
          <ListItemIcon>
                
                {/* Add an icon for the second dropdown item */}
              </ListItemIcon>
          
              <Typography variant="body-2" color="initial">User Roles</Typography>
        </ListItemButton>
            </Collapse>
        
      </List>
    </Drawer>
   
    </ThemeProvider>
    <MainContent>
          {children}
        </MainContent>
    </Box>
    
  );
};

export default Sidebar;
