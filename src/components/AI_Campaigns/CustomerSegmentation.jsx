import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BoilerPlate from '../BoilerPlate/BoilerPlate';
import {useTheme,
    styled,
  useMediaQuery,createTheme,Box } from '@mui/material'
  import Typography from '@mui/joy/Typography';
const customerData = [
  { id: 1, name: 'John Doe', age: 25, gender: 'Male', type: 'Millennial', culture: 'Western', spendingScore: 75 },
  { id: 2, name: 'Jane Smith', age: 35, gender: 'Female', type: 'Gen Z', culture: 'Eastern', spendingScore: 90 },
  { id: 3, name: 'Bob Johnson', age: 28, gender: 'Male', type: 'Millennial', culture: 'Western', spendingScore: 60 },
  { id: 4, name: 'Alice Brown', age: 40, gender: 'Female', type: 'Gen X', culture: 'Western', spendingScore: 80 },
  { id: 5, name: 'Charlie Williams', age: 22, gender: 'Male', type: 'Gen Z', culture: 'Eastern', spendingScore: 70 },
  // Add more customer data as needed
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'gender', headerName: 'Gender', width: 90 },
  { field: 'type', headerName: 'Customer Type', flex: 1 },
  { field: 'culture', headerName: 'Culture', flex: 1 },
  {
    field: 'spendingScore',
    headerName: 'Spending Score',
    width: 300,
    renderCell: (params) => (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '220px', height: '30px', backgroundColor: '#3498db', borderRadius: '4px', margin: '4px 0' }}>
          <div
            style={{
              width: `${params.value}%`,
              height: '100%',
              backgroundColor: '#2ecc71',  // Adjust the color as needed
              borderRadius: '4px',
            }}
          />
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{params.value}</div>
      </div>
    ),
  },
];

const CustomerSegmentation = () => {
    const theme = useTheme();
    
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <BoilerPlate>
             <Box display="" mx="2rem" my="2rem" sx="">
        <Typography variant="level2" color="initial" sx={{ fontSize: smScreen ? '1.5rem' : '2rem' }}>
        Segmentations
      </Typography>
    <Box
component="main"
width={smScreen ? "400px" : "100%"}
sx={{ overflow: 'auto' }}

>

      <DataGrid
        rows={customerData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
    </Box>
    </BoilerPlate>
  );
};

export default CustomerSegmentation;
