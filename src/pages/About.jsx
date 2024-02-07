import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button, Autocomplete, TextField, Avatar, IconButton } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import lunchData from '../../public/lunch.json';

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  

  if (!lunchData.data.menu) {
    return <div>No menu data available</div>;
  }

  const menuSchema = JSON.parse(lunchData.data.menu.menuSchemaMarkup);
  console.log(menuSchema.name)

  const handleSearchChange = (event, value) => {
    // If the value is an object, it means a menu item is selected from Autocomplete
    if (value && typeof value === 'object') {
      setSearchValue(value.name);
      setSelectedCategory('');
    } else {
      setSearchValue(value);
      setSelectedCategory('');
    }
  };
  
  const uniqueCategoriesSet = new Set();

  menuSchema.hasMenuSection.forEach((section) => {
    const category = section.name;
  
    section.hasMenuItem.forEach((item) => {
      uniqueCategoriesSet.add(category);
    });
  });
  
  const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
  
  
  
  console.log(uniqueCategoriesArray)
  const filteredMenuItems = React.useMemo(() => {
    return menuSchema.hasMenuSection.reduce((acc, section) => {
      const matchesCategory = section.name;
      const filteredItems = section.hasMenuItem
        .filter((item) => {
          const matchesSearch =
            searchValue === null ||
            item.name.toLowerCase().includes(searchValue.toLowerCase());

          return matchesSearch && matchesCategory;
        })
        .map((item) => ({
          ...item,
          category: section.name,
        }));

      return [...acc, ...filteredItems];
    }, []);
  }, [menuSchema, searchValue]);

  
  
  // Log the first filtered item to inspect its structure
  console.log('First filtered item:', filteredMenuItems.length > 0 ? filteredMenuItems[0] : 'No items');
  


  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'logo', 
      headerName: 'Logo', 
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={params.row.image} src={params.row.image} style={{  marginRight: 10 }} />
       
        </div>
      )
    },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'offers', headerName: 'Price', width: 120, 
      renderCell: (params) => (
        <p>Price: {params.row.offers?.price} {params.row.offers?.priceCurrency}</p>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <EditIcon alt="" />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon alt="" />
          </IconButton>
        </>
      ),
    },
  ];

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getRowId = (row) => row.id || Math.random().toString(36).substr(2, 9);


  return (
    <div>
      <Box>
        <Typography variant="h4" color="initial">Menu</Typography>
        <Box sx={{ display: smScreen ? 'block' : 'block', width: 'auto' }}>
          <Box sx={{ display: smScreen ? 'block' : 'flex', flexDirection: smScreen ? 'column' : 'row', justifyContent: 'space-between' }}>
          <Autocomplete
  sx={{ width: smScreen ? '300px' : '100%' }}
  value={filteredMenuItems.find(item => item.name === searchValue)}
  onChange={handleSearchChange}
  options={filteredMenuItems}
  getOptionLabel={(menuItem) => menuItem.name}
  renderInput={(params) => <TextField {...params} label="Search by title..." variant="outlined" />}
/>
            <Link to={{
              pathname: '/dashboard/AddMenuItem',
              state: {
                formData: {},
                isEditMode: false,
              }
            }}>
              <Button sx={{
                backgroundColor: "black",
                color: "white",
              }}>Add  menu item</Button>
            </Link>
          </Box>
        </Box>

        {/* Render menu data */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setSelectedCategory('')}>
          All
        </button>
        {uniqueCategoriesArray.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat); // Set the selected category string
              setSearchValue('');
            }}
            style={{
              backgroundColor: selectedCategory === cat ? '#f0f0f0' : 'white',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '5px 10px',
              margin: '0 5px',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

        {/* Display the menu data */}
        <Box>
          <Box width={smScreen ? "400px" : "auto"} sx={{ overflow: 'auto', maxWidth: '100%' }}>
            <DataGrid
              rows={filteredMenuItems}
              columns={columns.map(column => ({
                ...column,
                minWidth: 100
              }))}
            
              pageSize={5}
              rowsPerPageOptions={[25]}
              checkboxSelection
              getRowId={getRowId}
              disableSelectionOnClick
              columnBuffer={5}
            />
          </Box>
        </Box>

      </Box>

    </div>
  );
};

export default About;
