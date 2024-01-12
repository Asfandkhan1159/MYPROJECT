import React from 'react';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import Button from '@mui/material/Button';

const ComparePricesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content:start;
  width:auto;
  height:166px;
  border:1px solid black;
  margin-left:20px;
  
`;

const Image = styled.img`

  width: 105px;
  height: 105px;
  object-fit: cover;
  margin: 20px;
  margin-top:0;
  padding:10px;
  border-radius:50%;
  align-self:top;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div`
  font-size: 14.39px;
  font-weight: 600;
  color: #000;
  padding:1.2rem
`;

const Category = styled.div`
  font-size: 12.55px;
  color: var(--color-gray-100);
  padding:1.2rem
`;

const Description = styled.div`
  font-size: 12.55px;
  color: var(--color-gray-100);
  margin-top: 5px;
  width:711px;
  font-family: var(--font-poppins);
  
  margin-left:10rem;
  margin-Top:-4rem;

`;
const NextButton = styled(Button)({
  backgroundColor: "black",
  color: "white",
  
});
const ComparePrices = ({ formData,onEditClick,onDeleteClick, onNext, activeStep }) => {
  
  console.log('FormData in ComparePrices:', formData);
  const imageUrl = formData.image instanceof File ? URL.createObjectURL(formData.image) : '';


  const handleNextButtonClick = () => {
    onNext(); // Call the passed callback
  };
  return (
    <>
    <div  style={{border:"1px solid black", height:"auto"}}>
      
      <span>
        <div style={{display:"flex"}}>
        {imageUrl && <Image src={imageUrl} alt="Selected Image" />}
          <ProductName>{formData?.productName}</ProductName>
          <Category style={{margin:"0 auto"}}>Category : <b>{formData?.category}</b></Category>
          <EditIcon onClick={onEditClick}>✎</EditIcon>
          <DeleteIcon onClick={() => onDeleteClick(formData)} />
          {console.log('formData in compare Prices', formData)}
          <br></br>
         
         
        </div>
        <Description>{formData?.productDescription}</Description>
      </span>
    
    </div>
    {activeStep === 2 && ( // Only show Next button on the first step
        <NextButton onClick={handleNextButtonClick} style={{ width: "173.7718px", height: "55.165px" }}>Next</NextButton>
      )}
    </>
    
  );
};

export default ComparePrices;
