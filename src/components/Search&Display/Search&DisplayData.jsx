import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { fetchNutritionalInfo } from '../../services/Item_API/api';
import BoilerPlate from '../BoilerPlate/BoilerPlate';

const SearchAndDisplayData = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const columns = [
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'brandOwner', headerName: 'Brand Owner', flex: 1 },
    { field: 'dataType', headerName: 'Data Type', flex: 1 },
    { field: 'foodCategory', headerName: 'Food Category', flex: 1 },
    { field: 'publishedDate', headerName: 'Published Date', flex: 1 },
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchNutritionalInfo(query);
      if (data?.foods) {
        setSearchResults(data.foods);
      } else {
        setSearchResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (query) {
      setLoading(true);
      timeoutId = setTimeout(async () => {
        const data = await fetchNutritionalInfo(query);
        if (data?.foods) {
          const filteredResults = data.foods.filter((result) => result.brandOwner);
          setSearchResults(filteredResults);
        } else {
          setSearchResults([]);
        }
        setLoading(false);
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleRowClick = (params) => {
    setSelectedResult(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BoilerPlate>
      <div>
        <Typography variant="h5" gutterBottom>
          Search and Display Data
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <TextField
            label="Enter Search Query"
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!query || loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
          </Button>
        </Box>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={searchResults}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            loading={loading}
            disableSelectionOnClick
            getRowId={(row) => row.fdcId}
            onRowClick={handleRowClick}
            slots={{ toolbar: GridToolbar }}
          />
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              {selectedResult?.description}
            </DialogContentText>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nutrient</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedResult?.foodNutrients.map((nutrient) => (
                    <TableRow key={nutrient.nutrientId}>
                      <TableCell>{nutrient.nutrientName}</TableCell>
                      <TableCell>{nutrient.value}</TableCell>
                      <TableCell>{nutrient.unitName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </BoilerPlate>
  );
};

export default SearchAndDisplayData;
