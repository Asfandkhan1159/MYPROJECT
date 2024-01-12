import React, { useState } from 'react';
import BoilerPlate from '../BoilerPlate/BoilerPlate';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import UserActions from './UserActions';
import { Fab, CircularProgress,Button, Dialog, DialogTitle, DialogContent, TextField  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';

const User = () => {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [rowId, setRowId] = useState(null);
  const [editedRows, setEditedRows] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newUser, setNewUser] = useState({});

  const handleSave = () => {
    setLoading(true);
    // Simulate saving changes
    setTimeout(() => {
      setEditedRows({});
      setLoading(false);
      setSuccess(true);
      // Optionally set a success state or trigger any other actions
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 2000);
  };

  const handleChange = (newValue, columnField) => {
    console.log("KARDIA", newValue, columnField);
    setEditedRows({ ...editedRows, [rowId]: { ...editedRows[rowId], [columnField]: newValue } });
  };

  const handleAddUser = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleModalSave = () => {
    // Add logic to save the new user data
    // For now, let's just close the modal
    handleCloseModal();
  };
  // Sample user data
  const rows = [
    { id: 1, username: 'john_doe', email: 'john@example.com', roles: 'admin', permissions: 'Full Access', lastLogin: '2023-01-01 12:30 PM' },
    { id: 2, username: 'jane_doe', email: 'jane@example.com', roles: 'basic', permissions: 'none', lastLogin: '2023-01-02 09:45 AM' },
    { id: 3, username: 'bob_smith', email: 'bob@example.com', roles: 'editor', permissions: 'Read/Write', lastLogin: '2023-01-03 03:15 PM' },
    { id: 4, username: 'alice_jackson', email: 'alice@example.com', roles: 'admin', permissions: 'Full Access', lastLogin: '2023-01-04 10:20 AM' },
    { id: 5, username: 'mike_brown', email: 'mike@example.com', roles: 'basic', permissions: 'Read Only', lastLogin: '2023-01-05 01:45 PM' },
    { id: 6, username: 'emma_davis', email: 'emma@example.com', roles: 'editor', permissions: 'Read/Write', lastLogin: '2023-01-06 11:30 AM' },
    { id: 7, username: 'alex_clark', email: 'alex@example.com', roles: 'basic', permissions: 'Full Access', lastLogin: '2023-01-07 09:15 AM' },
    { id: 8, username: 'sarah_jones', email: 'sarah@example.com', roles: 'admin', permissions: 'Read Only', lastLogin: '2023-01-08 05:30 PM' },
    { id: 9, username: 'david_miller', email: 'david@example.com', roles: 'admin', permissions: 'Read/Write', lastLogin: '2023-01-09 02:45 PM' },
    { id: 10, username: 'olivia_thomas', email: 'olivia@example.com', roles: 'basic', permissions: 'Full Access', lastLogin: '2023-01-10 10:10 AM' },
    { id: 11, username: 'chris_white', email: 'chris@example.com', roles: 'editor', permissions: 'Read Only', lastLogin: '2023-01-11 04:20 PM' },
    { id: 12, username: 'eva_wood', email: 'eva@example.com', roles: 'basic', permissions: 'Read/Write', lastLogin: '2023-01-12 01:30 PM' },
    { id: 13, username: 'ryan_martin', email: 'ryan@example.com', roles: 'basic', permissions: 'Full Access', lastLogin: '2023-01-13 11:45 AM' },
    { id: 14, username: 'lily_baker', email: 'lily@example.com', roles: 'basic', permissions: 'Read Only', lastLogin: '2023-01-14 08:00 AM' },
    { id: 15, username: 'jason_king', email: 'jason@example.com', roles: 'basic', permissions: 'Read/Write', lastLogin: '2023-01-15 06:15 PM' },
  ];

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 150,
      type: 'singleSelect',
      valueOptions: ['basic', 'editor', 'admin'],
      editable: (params) => params.id === rowId,
    },
    {
      field: 'permissions',
      headerName: 'Permissions',
      width: 150,
      type: 'boolean',
      editable: (params) => params.id === rowId,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <UserActions
            rowId={rowId}
            setRowId={setRowId}
            handleSave={handleSave}
            loading={loading}
            success={success}
          />
      ),
    },
  ];
  return (
   <div>
      <BoilerPlate>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-center',
        marginTop:'2rem'
        
      }}>
        <Button variant="contained" color="primary" onClick={handleAddUser}
        sx={{backgroundColor:"black", display:'flex', alignSelf:"center"}}
        >
          Add User
        
        </Button>
        
      </Box>
        <Box display="" mx="" my="" sx="">
        <Typography variant="body1" color="initial" sx={{marginLeft:"2rem", fontSize:"40px", mt:3}}>Manage Users</Typography>
        

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
         <TextField
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleModalSave}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
          
        </Box>
        <Box sx={{
          height: 400,
          width: '100%',
        }}>
          
          <DataGrid
            columns={columns}
            rows={rows}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            pageSizeOptions={[5, 10, 15]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5, // set your default page size here
                },
              },
            }}
            onCellEditCommit={(params) => {
              setRowId(params.id);
              setEditedRows({ ...editedRows, [params.id]: params.data });
            }}
            components={{
              Toolbar: () => (
                <GridToolbar>
                  <Fab
                    color="primary"
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                    disabled={!Object.keys(editedRows).length || loading}
                    onClick={handleSave}
                  >
                    {success ? <CheckIcon /> : <SaveIcon />}
                  </Fab>
                  {loading && (
                    <CircularProgress
                      size={52}
                      sx={{
                        color: 'green[500]',
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                  )}
                </GridToolbar>
              ),
            }}
          />
          
        </Box>
      </BoilerPlate>
    </div>
  );
};

export default User;