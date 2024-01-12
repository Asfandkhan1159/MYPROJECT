import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box, Grid,InputAdornment, MenuItem  } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import styled from 'styled-components'
import './IngredientsList.css'
import { Fragment } from "react";
import { useInventoryData } from "../Inventory/InventoryDataContext";






const EditIcon = styled(Edit)`
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteIcon = styled(Delete)`
  cursor: pointer;
`;

  const NextButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    
  });
  const IngredientsList = ({ onFormDataChange, onNext, activeStep }) => {
    const [ingredient, setIngredient] = useState({ name: "", quantity: "" });
    const [unit, setUnit] = useState("kg");
    const [ingredientsList, setIngredientsList] = useState([]);
    const { rows } = useInventoryData();
    const [maxQuantity, setMaxQuantity] = useState()

    const handleIngredientChange = (event) => {
      const selectedIngredientName = event.target.value;
      const selectedRow = rows.find((row) => row.itemName === selectedIngredientName);
      const maxAvailableQuantity = selectedRow ? selectedRow.quantity : 0;
      
    
      setIngredient({
        name: selectedIngredientName,
        quantity: "",  // Clear the quantity when a new ingredient is selected
        unit: unit,
      });
      setMaxQuantity(maxAvailableQuantity);  // You can store the max quantity in a separate state for validation
    };
    const handleUnitChange = (event) => {
      setUnit(event.target.value);
    };
  
    const handleAddIngredient = () => {
      if (ingredient.name && ingredient.quantity && parseFloat(ingredient.quantity) > 0) {
        setIngredientsList([
          ...ingredientsList,
          {
            name: ingredient.name,
            quantity: parseFloat(ingredient.quantity),
            unit: unit,
            id: Date.now(),
          },
        ]);
  
        // Clear the ingredient state for the next entry
        setIngredient({ name: "", quantity: "" });
      }
    };
  

    const handleInputChange = (event) => {
      setIngredient(event.target.value);
    };

    // const handleUnitChange = (event) => {
    //   setUnit(event.target.value);
    // };
    const handleNextButtonClick = () => {
      onNext(); // Call the passed callback
    };
    // const handleAddIngredient = () => {
    //   if (ingredient.trim()) {
    //     setIngredientsList([
    //       { name: ingredient, unit: unit, id: Date.now() },
    //       ...ingredientsList,
    //     ]);
        
    //   }
    // };

    const handleRemoveIngredient = (id) => {
      setIngredientsList(ingredientsList.filter((prevItem) => prevItem.id !== id));
     
    };
    useEffect(() => {
      onFormDataChange(ingredientsList);
      console.log(ingredientsList)
    }, [ingredientsList],[]);
    return (
      <div>
      <Box margin="3rem 0">
     
      <Grid container spacing={4} alignItems="center">
    {ingredientsList.map((item) => (
      <Fragment key={item.id}>
        <Grid item xs={10} md={5}>
          <TextField
          disabled
            fullWidth
            value={item.name}
            onChange={(e) => console.log(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">{item.quantity}{item.unit}</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={1} md={0.5}>
          <EditIcon onClick={() => console.log(item.id)} />
        </Grid>
        <Grid item xs={1} md={0.5}>
          <DeleteIcon onClick={() => handleRemoveIngredient(item.id)} />
        </Grid>
      </Fragment>
    ))}
 </Grid>
      </Box>
        <Box height={80} />
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <TextField
  label="Ingredient"
  variant="outlined"
  select
  value={ingredient.name}
  onChange={handleIngredientChange}
  style={{ width: "974px" }}
>
  {rows.map((item) => (
    <MenuItem key={item.id} value={item.itemName}>
      {`${item.itemName} (${item.quantity} ${item.unit} available)`}
    </MenuItem>
  ))}
</TextField>

        <TextField
          select
          label="Unit"
          variant="outlined"
          value={unit}
          onChange={handleUnitChange}
          style={{ width: "80px", marginLeft: "16px" }}
        >
          <option value="kg">kg</option>
          <option value="g">g</option>
          <option value="lb">lb</option>
        </TextField>
        <TextField
          type="number"
          label="Quantity"
          variant="outlined"
          value={ingredient.quantity}
          onChange={(e) => setIngredient({ ...ingredient, quantity: e.target.value })}
          style={{ width: "120px", marginLeft: "16px" }}
        />
          <Button variant="contained" color="primary" onClick={handleAddIngredient}>
            Add
          </Button>
          {activeStep === 1 && ( // Only show Next button on the first step
        <NextButton onClick={handleNextButtonClick} style={{ width: "173.7718px", height: "55.165px" }}>Next</NextButton>
      )}
        </Box>
      </div>
    );
  };

  export default IngredientsList;

