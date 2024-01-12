import React, { useState,useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Stepper,
  Step,
  StepLabel,
  StepIcon,
  Button,
  Typography,
  Box,
  Grid
} from "@mui/material";
import Step1Icon from '../assets/stepIcons/Bg.svg'
import firstStepDone from '../assets/stepIcons/completed.svg'
import Step2Icon from '../assets/stepIcons/Subtract.svg'
import CompletedStep2Icon from '../assets/completedSubtract.svg'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Step1 from "./AddMenu/Addinfo";
import IngredientsList from "./AddMenu/IngredientsList";
import ComparePrices from "./AddMenu/ComparePrices";
const FormContainer = styled("div")({
  width: "100%", // Use 100% to take the available width
  alignSelf: "start",
  justifySelf:"start",
  padding: "20px",
});

const StepIconWrapper = styled("div")({
  width: "144.8px",
  height: "36px",
  fontSize:"10px",
  background: "#f4461f",
  margin:"0 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const CustomStepIcon = ({ active, completed, icon }) => {
  const stepIcons = {
      "Add info": active ? `url(${Step1Icon})` : completed ? `url(${firstStepDone})` : `url(${Step1Icon})`,

    "Add Ingrdients" : active ? `url(${Step2Icon})` : completed ? `url(${CompletedStep2Icon})` : `url(${Step2Icon})`,
    "Compare Prices" : active ? `url(${Step2Icon})` : completed ? `url(${CompletedStep2Icon})`  : `url(${Step2Icon})` ,
    "Done" : `url(${Step2Icon})`
    
  }
  const StepIconComponent = stepIcons[icon];
  return (
    <StepIconWrapper
    style={{
      background: StepIconComponent,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      color: active ? "rgba(244, 70, 31, 1)" : "black",
      
     width:"144.11px",
      height:"38px",
      padding:"0.4rem"

    }}
  >
      {completed && <CheckCircleOutlineOutlinedIcon />} {/* Use any icon you prefer for completed steps */}
        <Typography variant="subtitle3" style={{ color: completed ? "white" : "black", fontSize:"0.8rem"}}>{icon}</Typography>
    </StepIconWrapper>
  );
};
const StepContentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
 
});

const NextButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "auto",
 
});






const AddIngredientsWrapper = styled("div")({
 
  display: "flex",
  flexDirection: "row",
  padding: "0px 4.2276835441589355px",
  alignItems: "flex-center",
  justifyContent: "center",
});


const FlexContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between", // Align steps next to each other
  margin:"0",

});

const MultiStepForm = ({ initialFormData, isEditMode }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState( initialFormData);
  const [editMode, setEditMode] = useState(false); // Add editMode state

  const handleEditClick = () => {
    setEditMode(true);
    setActiveStep(0); // Reset step to the beginning when editing
  };
  const handleDeleteClick = (dataToDelete) => {
    // Retrieve the existing form data list from localStorage
    const formDataList = JSON.parse(localStorage.getItem('formDataList')) || [];
  
    // Filter out the item to delete based on the id
    const updatedFormDataList = formDataList.filter(item => item.id !== dataToDelete.id);
  
    // Update the form data list in localStorage
    localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
  
    // Navigate back to the About page or perform any other action
    navigate('/dashboard/About', { state: { formDataList: updatedFormDataList } });
  };
  
  
  const handleFormDataChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    
  };
  const handleNext = () => {
    if (activeStep === 2) {
      handleSubmit(); // Call handleSubmit without changing the active step
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({ productName: '',
    availablity: '',
    category: '', // Change this to an empty array
    itemOutOfStock:false,
    Price: 2,
    Tax: '',
    image:null,
  productDescription:''})
  };
  const customStepLabels = ["Add info", "Add Ingrdients", "Compare Prices", "Done"];
  const navigate = useNavigate();
  const handleSubmit = () => {
    // Retrieve existing form data list from localStorage
    const formDataList = JSON.parse(localStorage.getItem('formDataList')) || [];
  
    if (isEditMode) {
      // Find the index of the item to update based on productName
      const updatedIndex = formDataList.findIndex(item => item.id === formData.id);
  
      if (updatedIndex !== -1) {
        // Update the existing form data in the list
        formDataList[updatedIndex] = { ...formData, image: URL.createObjectURL(formData.image) };
  
        // Store the updated form data list back in localStorage
        localStorage.setItem('formDataList', JSON.stringify(formDataList));
  
        // Navigate back to the About page
        navigate('/dashboard/About', { state: { formDataList: formDataList } });
      }
    }
     else {
      // Add the new form data to the list
       const imageDataURL = formData.image ? URL.createObjectURL(formData.image) : null;
      const newItem = { ...formData, image: imageDataURL, id: uuidv4() };
      formDataList.push(newItem);
  
      // Store the updated form data list back in localStorage
      localStorage.setItem('formDataList', JSON.stringify(formDataList));
  
      // Navigate to the About page
      navigate('/dashboard/About', { state: { formDataList } });
    }
  };
  
 const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepConnector-root": {
    display: "none", // Hide the step connectors
    
  },
  "& .MuiStepLabel-root": {
    color: theme.palette.primary.main,
    display:"flex",
    justifyContent:"start",
    fontWeight: 500,
    margin:"0px",
  
    padding: 0, // Remove padding around the step label

  },
  "& .MuiStepLabel-active": {
    color: theme.palette.primary.main,
    fontWeight: 700,
    background: "rgba(220, 233, 229, 1)",
    
  },
  "& .MuiStepIcon-root.MuiStepIcon-active": {
    color: theme.palette.primary.main,
    
  },
  "& .MuiStep-root": {
    marginLeft: 0,
    display: "flex", // Display steps next to each other
    
  },
}));


  const steps = ["Add Info", "Add Ingredients", "Compare Prices", "Done"];
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
          <Box sx={{ marginTop: "3rem" }}>
              <Step1  onFormDataChange={handleFormDataChange}
              initialFormData={formData} 
              isEditMode={isEditMode}
              activeStep={activeStep}
              onNext={handleNext}
              />
           
          </Box>
        </div>
      );
      case 1:
        return (
          <div>
            
          <AddIngredientsWrapper>
          <IngredientsList onFormDataChange={handleFormDataChange}  
          activeStep={activeStep}
            onNext={handleNext} />
          </AddIngredientsWrapper>
      
       
        </div>
        
        );

      case 2:
        return (
       
          <Box sx={{ marginTop: "1rem" }}>
        <Typography variant="h6"> Your Menu Item</Typography>
      <ComparePrices 
        formData={formData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        activeStep={activeStep}
        onNext={handleNext}
        />
        
            </Box>
          
        );
      case 3:
        return (
          <div>
            <button onClick={handleSubmit}>Submit</button>
            {/* Add any buttons or navigation controls here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <FormContainer >
      <FlexContainer>
      <CustomStepper activeStep={activeStep} alternativeLabel>
  {steps.map((_, index) => (
    <Step key={index}>
      <StepLabel StepIconComponent={CustomStepIcon} icon={customStepLabels[index]}/>
    </Step>
  ))}
</CustomStepper>
      </FlexContainer>
    <div>
      {activeStep === steps.length ? (
        <div>
          <Typography variant="h6">All steps completed</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
        <StepContentContainer>
          {getStepContent(activeStep)}
        </StepContentContainer>
        <NextButtonContainer>
       
        </NextButtonContainer>
      </div>
       
      )}
    </div>
    
  </FormContainer>
  );
};

export default MultiStepForm;
