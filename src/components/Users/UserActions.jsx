import React, { useEffect, useState } from 'react';
import { Box, Fab, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

const UserActions = ({ rowId, setRowId, handleSave, loading, success }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(false);

  const handleChange = (newValue, columnField) => {
    console.log("KARDIA", newValue, columnField);
    // Your logic to handle local changes
  };

  const handleLocalSave = () => {
    setLocalLoading(true);
    // Simulate saving changes
    setTimeout(() => {
      setLocalLoading(false);
      setLocalSuccess(true);
      setTimeout(() => {
        
      }, 2000);
    }, 2000);
    setLocalSuccess(false);
  };

  const isDisabled = () => {
    // Add your logic to determine if the save button should be disabled
    return false; // Example: always enabled
  };
 useEffect(() =>{
  
 })
  return (
    <div>
      <Box
        sx={{
          m: 1,
          position: 'relative',
        }}
      >
        {localSuccess ? (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'green', // Assuming you have a green color defined
              '&:hover': { bgcolor: 'green[700]' },
            }}
          >
            <CheckIcon />
          </Fab>
        ) : (
          <Fab
            color="primary"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'black',
            }}
            disabled={isDisabled() || localLoading}
            onClick={() => {
              handleChange(/* pass your parameters */);
              handleLocalSave();
            }}
          >
            <SaveIcon />
          </Fab>
        )}
        {localLoading && (
          <CircularProgress
            size={52}
            sx={{
              color: 'black',
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default UserActions;
