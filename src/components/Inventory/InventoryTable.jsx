import React, { useState } from 'react';
import Sidebar from '../SideBar';
import { Link } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
// import { differenceInDays } from 'date-fns'; // Import date-fns library for date comparison
import parse from 'date-fns/parse';
// icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import InventoryList from './InventoryList';
import { useInventoryData, InventoryDataProvider } from './InventoryDataContext';
import BoilerPlate from '../BoilerPlate/BoilerPlate';
import { calculateDynamicThreshold, isOutOfStock } from '../../services/InventoryService/InventoryDataService';
import { DataGrid } from '@mui/x-data-grid';
import FeaturedItems from './FeaturedItems';
import {List, ListItemButton, ListItemText } from '@mui/material'
import InventoryInsights from './InventoryInsights';
const currentDate = new Date();
console.log(currentDate)


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function isDateNear(dateString) {
    const currentDate = new Date();
    const targetDate = parse(dateString, 'MMM d, yyyy', new Date(), {
      awareOfUnicodeTokens: true,
    });
  
    const differenceInMilliseconds = targetDate - currentDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 3600 * 24));
  
    return differenceInDays <= 7;
  } 
  
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  function RowMenu() {
    return (
      
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem>
          <Divider />
          <MenuItem color="danger">Delete</MenuItem>
        </Menu>
      </Dropdown>
    );
  }
  
  const InventoryTable = () => {
  
    const { rows } = useInventoryData();
    const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState('all');

  const handleCustomerChange = (event) => {
    const selectedValue = event.target.getAttribute('data-value');
    setCustomer(selectedValue);
    console.log('Selected Customer:', selectedValue);
    console.log('functiom',event.target.getAttribute('data-value'))
  };
  // const calculateDynamicThreshold = (historicalConsumption) => {
  //   const averageConsumption = historicalConsumption.reduce((sum, value) => sum + value, 0) / historicalConsumption.length;
  //   return Math.floor(averageConsumption);
  // };

// YourComponent.jsx
const getFeaturedItems = (inventoryItems) => {
  // Example: Select items with quantity greater than a threshold
  const featuredItems = inventoryItems.filter((item) => item.quantity > 50);

  // Add more criteria or adjust as needed

  return featuredItems;
};

// ...

const featuredItems = getFeaturedItems(rows);

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'location', headerName: 'Item Location', width: 140 },
  { field: 'category', headerName: 'Category', width: 140 },
  { field: 'itemName', headerName: 'Name', width: 240 },
  {
    field: 'quantity',
    headerName: 'Quantity',
    width: 140,
    renderCell: (params) => (
      <Box>
        <div>
          <Typography variant="body2">{params.value} kg</Typography>
        </div>
      </Box>
    ),
  },
  {
    field: 'expirationDate',
    headerName: 'Shelf Life',
    width: 140,
    renderCell: (params) => (
      <Typography variant="body2">
        {isDateNear(params.value) ? (
          <Chip variant="soft" size="sm" color="danger">
            {params.value}
          </Chip>
        ) : (
          <Chip variant="soft" size="sm" color="success">
            {params.value}
          </Chip>
        )}
      </Typography>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => (
      <Chip
        variant="soft"
        size="sm"
        color={params.row.quantity <= calculateDynamicThreshold(params.row.historicalConsumption) ? 'danger' : 'success'}
      >
        {params.row.quantity <= calculateDynamicThreshold(params.row.historicalConsumption) ? 'Out of Stock' : 'In Stock'}
      </Chip>
    ),
  },
];

  const renderFilters = () => (
    <React.Fragment>
    
      <FormControl size="sm" >
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>

    <FormControl>
      <FormLabel>Customer</FormLabel>
      <Select
        size="sm"
        placeholder="All"
        onChange={handleCustomerChange}
        value={customer}
      >  <Option value="all" data-value="all">
          All
        </Option>
        <Option value="olivia" data-value="olivia">
          Olivia Rhye
        </Option>
        <Option value="steve" data-value="steve">
          Steve Hampton
        </Option>
        <Option value="ciaran" data-value="ciaran">
          Ciaran Murray
        </Option>
        <Option value="marina" data-value="marina">
          Marina Macdonald
        </Option>
        <Option value="charles" data-value="charles">
          Charles Fulton
        </Option>
        <Option value="jay" data-value="jay">
          Jay Hoper
        </Option>
        </Select>
     
    </FormControl>
    <List sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemButton component={Link}
              to='/dashboard/insights'
              >
                <ListItemText primary="Get Insights" />
              </ListItemButton>
              </List>
    </React.Fragment>
  );
    return (
      // <InventoryDataProvider>
        <Box sx={{display:"flex", width:"1197px"}}>
   
        <Sidebar />
        
        <Box
            sx={{
              display: 'flex',
              my: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
           

        <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, pt: 3, mt: 8, px: '1rem' }}>
  <span>
    <h1 style={{ display: 'inline' }}>Inventory</h1>
  </span>
  <Box>
  
  <FeaturedItems featuredItems={featuredItems} />

</Box>
 
        <Sheet
          className="SearchAndFilters-mobile"
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
            my: 1,
            gap: 1,
          }}
        >
           
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
              <ModalClose />
              <Typography id="filter-modal" level="h2">
                Filters
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {renderFilters()}
                <Button color="primary" onClick={() => setOpen(false)}>
                  Submit
                </Button>
              </Sheet> */}
            </ModalDialog>
          </Modal>
        </Sheet>
        
       
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',     
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 10,
          }}
        >
         
         <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={2}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        sx={{width:"100%"}}
      />
    </div>
        </Sheet>
     
        <Box
          className="Pagination-laptopUp"
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
          >
            Previous
          </Button>
  
          <Box sx={{ flex: 1 }} />
          {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
            <IconButton
              key={page}
              size="sm"
              variant={Number(page) ? 'outlined' : 'plain'}
              color="neutral"
            >
              {page}
            </IconButton>
          ))}
          <Box sx={{ flex: 1 }} />
  
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
      <InventoryList/>
      </Box>
      </Box>
      // </InventoryDataProvider>
    )
  }
  
  export default InventoryTable
  
  