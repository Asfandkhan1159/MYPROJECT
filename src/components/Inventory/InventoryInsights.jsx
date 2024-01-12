import React, { useState } from 'react';
import { useInventoryData } from './InventoryDataContext';
import InventoryDonutChart from './InventoryDonutChart';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import BoilerPlate from '../BoilerPlate/BoilerPlate';
import Alert from '@mui/joy/Alert';
import CircularProgress from '@mui/joy/CircularProgress';
import Warning from '@mui/icons-material/Warning';
import { calculateDynamicThreshold, isOutOfStock } from '../../services/InventoryService/InventoryDataService';

const InventoryInsights = () => {
  const { rows } = useInventoryData();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
    
  const filteredRows = rows.filter(

    (row) =>
      (selectedCategory === '' || row.category === selectedCategory) &&
      (searchText === '' ||    searchText === null ||
     row.itemName.toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <BoilerPlate>
    <Box p={2}>
      <Box mb={2}>
        <FormControl sx={{width:"200px"}}>
          <InputLabel>Category</InputLabel>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Vegetable">Vegetable</MenuItem>
            <MenuItem value="Fruit">Fruit</MenuItem>
            <MenuItem value="Meat">Meat</MenuItem>
            <MenuItem value="Grains">Grains</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <Autocomplete
          options={rows.map((row) => row.itemName)}
          value={searchText}
          onChange={(event, newValue) => setSearchText(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Search Item" />
          )}
        />
      </Box>
      <Grid container spacing={3}>
          {filteredRows.map((row) => {
            console.log('Item:', row.itemName, 'Status:', row.status);
            const dynamicThreshold = calculateDynamicThreshold(
                row.historicalConsumption
              );
              const outOfStock = isOutOfStock(row.quantity, dynamicThreshold);
            return (
              <Grid item key={row.id} xs={12} sm={6} md={4} lg={4}>
                 <Card
                  sx={{
                    width:"90%",
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flex: '1 0 auto' }}>
                  {outOfStock ? (
                    <Alert
                      variant="soft"
                      color="danger"
                      invertedColors
                      startDecorator={
                        // <CircularProgress size="sm" color="danger">
                          <Warning />
                        
                      }
                      sx={{ alignItems: 'flex-start', gap: '1rem' }}
                    >
                      This item is going out of stock!
                    </Alert>
                  ) : (
                    <Alert variant="soft" color="success">
                      Sufficient stock available!
                    </Alert>
                  )}
                    <Typography variant="h6" color="initial">
                      {row.itemName}
                    </Typography>
                    <InventoryDonutChart data={row} />

                    
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </BoilerPlate>
  );
};

export default InventoryInsights;