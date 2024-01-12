import React, { useEffect } from 'react';
import {
  Input,
  InputAdornment,
  InputLabel,
  FormControlLabel,
  Switch,
  ListItemText,
  Checkbox,
  OutlinedInput,
  Select,
  MenuItem,
  TextField,
  Grid,
  Box,
  FormControl,
  Button
} from '@mui/material';
import useFormFields from './FormFields';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, useTheme } from "@mui/material/styles";
import validationSchema from '../Validations';

const theme = createTheme({
  label:{
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: '#232323',
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },  
};
const NextButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "auto",
 
});
const NextButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  
});

const Step1 = ({ onFormDataChange, initialFormData = {}, isEditMode, onNext, activeStep  }) => {
  
 
  const {
    fields, handleChange,register,handleSubmit,errors
} = useFormFields({
  
    productName: '',
    category: [], // Initialize as an empty array
    availablity: [], // Initialize as an empty array
    itemOutOfStock: false,
    Price: 0,
    Tax: '0',
    productDescription: '',
    image:"",
    ...initialFormData // Merge with provided initialFormData if available
  }, onFormDataChange);
  useEffect(() => {
    if (isEditMode) {
      handleChange({ target: { name: 'productName', value: initialFormData.productName } });
      
      // Populate other fields similarly...
    }
  }, [isEditMode]);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    handleChange({ target: { name: 'image', value: imageFile } });
  };

  useEffect(() => {
    onFormDataChange(fields);
  }, [fields]);


 const Submit = async () => {
  try {
    // Map single selected category back to array
    const selectedCategory = fields.category ? [fields.category] : [];
    const selectedAvailablity = fields.availablity ? [fields.availablity] : [];
    
    const formDataWithMappedCategory = {
      ...fields,
      category: selectedCategory,
      availablity:selectedAvailablity,
    };

    await validationSchema.validate(formDataWithMappedCategory, { abortEarly: false });
    await onNext();
  } catch (err) {
    console.log('Validation errors:', err.errors);
    console.log(err);
  }
};

 
  const categories = ['Traditional', 'Fast Food', 'Drinks', 'Appetizers'];

  const availablity = ['All Day', 'Lunch', 'AfterNoon'];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
        <form onSubmit={handleSubmit(Submit)}>
          <div>
            <Grid container spacing={2} sx={{ width: '1000px' }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <label>Product Name
                 <span style={{ color: 'red' }}>*</span>
                  </label>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="productName"
                    value={fields.productName}
                    onChange={handleChange}
                    inputRef={register('productName', { required: true })}
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                  />
                  {errors.productName && (
                      <p>{errors.productName.message}</p>
                    )}

                 
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <label id="demo-select-large-label">Category</label>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                  
                    value={fields.category}

                    label="Age"
                    name="category"
                    onChange={handleChange}
                    inputRef={register('category', { required: true })}
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="Category" />}
                    renderValue={(selected) => selected}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        <Checkbox checked={fields.category.indexOf(cat) > -1} />
                        <ListItemText primary={cat} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
    <p>{errors.category.message}</p>
  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <label id="demo-select-large-label">availablity</label>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    {...fields}
                    value={fields.availablity}
                    label="Age"
                    name="availablity"
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label="Availablity" />}
                    renderValue={(selected) => selected}
                  >
                    {availablity.map((ava) => (
                      <MenuItem key={ava} value={ava}>
                        <Checkbox checked={fields.availablity.indexOf(ava) > -1} />
                        <ListItemText primary={ava} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ alignSelf: 'center', mt: '2rem' }}>
                <FormControl>
                  <FormControlLabel
                    value={fields.itemOutOfStock}
                    {...fields}
                    control={<Switch color="primary" />}
                    label="Item Out of Stock"
                    labelPlacement="start"
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <label htmlFor="Price">Price</label>
                  <TextField
                   
                  
                    name="Price"
                    {...fields}
                    value={fields.Price}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <label htmlFor="Tax">Tax</label>
                  <TextField
                    name="Tax"
                    {...fields}
                    value={fields.Tax}
                    onChange={handleChange}
                    InputProps={{
                      
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={12}>
                <FormControl>
                  <label>Description</label>
                  <TextField
                  multiline
                     rows={4}
                     id="outlined-multiline-static"
                      fullWidth
                      label="Product Description"
                      name="productDescription"
                      value={fields.productDescription}
                      
                      onChange={handleChange}
                      inputRef={register('productDescription', { required: true })}
                      error={!!errors.productDescription}
                      helperText={errors.productDescription?.message}

                      sx={{
                        width: '40rem',
                      }}
  
                    />

                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                <input
  type="file"
  accept="image/*"
  {...fields}
  name="image"
  onChange={handleImageChange}
  // 100 MB in bytes
/>
    {fields.image && (
      <img
        src={fields.image}
        alt="Product"
        style={{ maxWidth: '100%', marginTop: '1rem' }}
      />
    )}
                </FormControl>
              </Grid>
            </Grid>
            {activeStep === 0 && ( // Only show Next button on the first step
            <NextButtonContainer>
        <NextButton onClick={Submit} style={{ width: "173.7718px", height: "55.165px" }}>Next</NextButton>
        </NextButtonContainer>
      )}
          </div>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Step1;