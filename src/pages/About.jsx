import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideNav from '../components/SideBar';
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Edit   from '../assets/modifyICons/edit.svg';
import Delete from '../assets/modifyICons/Delete.svg';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import BoilerPlate from '../components/BoilerPlate/BoilerPlate';
import AI_Feedback from '../components/AI_Feedback/AI_Feedback';
import { useTheme,
  useMediaQuery,
  } from '@mui/material'
const EditIcon = styled('img')({
  width: "100%",
height: "20px"
});
const DeleteIcon = styled('img')({
  width: "100%",
height: "20px"
});
const MenuItemCard = styled(Card)`
  display: flex;
  flex-direction: row;
  width: 559px;
  margin: 0 auto;
  justify-content:space-between;
  
  @media (max-width: 600px) {
    flex-direction: column;

  }
`;

const MenuItemImage = styled(CardMedia)`
  max-width: 144px;
  height: 100px;
  border-radius: 50%;
  margin: 0.6rem;
`;

const MenuItemContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  width:100%;

  .description {
    overflow: hidden;
    width:371;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Number of lines to show */
    -webkit-box-orient: vertical;
  }
  
  
`;

const MenuItemName = styled(Typography)`
  display: flex;
  align-items: center;
`;

const CategoryAndPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content:space-between;
`;

const Price = styled(Typography)`
  // margin-left: 20px;
`;

const Category = styled(Typography)`
  margin-right: 20px;
`;

const EditDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;
const sampleMenuItems = [
  {
    id: 1,
    productName: 'Sample Item 1',
    productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'Main Course',
    Price: 12.99,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    id: 2,
    productName: 'Sample Item 2',
    productDescription: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Dessert',
    Price: 8.99,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  // Add more sample items as needed
];

function About() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formDataList, setFormDataList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };
  const uniqueCategoriesSet = new Set();
formDataList.forEach(formData => {
  console.log(formData.image)
  // Ensure formData.category is an array before using forEach
  const categories = Array.isArray(formData.category) ? formData.category : [formData.category];
  const imageUrl = formData.image.startsWith('data:image') ? formData.image : '';
  categories.forEach(cat => uniqueCategoriesSet.add(cat)); // Add each category to the Set
});

const uniqueCategories = Array.from(uniqueCategoriesSet);

console.log('uniqueCategories:',uniqueCategories)
  const filteredFormDataList = searchValue
    ? formDataList.filter(formData =>
        formData.productName.toLowerCase().includes(searchValue.toLowerCase()) &&
        (selectedCategory === '' || formData.category.includes(selectedCategory))
        
    )
    : formDataList;

  useEffect(() => {
    if (location.state && location.state.formDataList) {
      setFormDataList(location.state.formDataList);
     
    
    } else {
      const storedFormDataList = JSON.parse(localStorage.getItem('formDataList')) || [];
      setFormDataList(storedFormDataList);
    }
  }, [location.state]);
 
  const handleDeleteClick = formDataToDelete => {
    const updatedFormDataList = formDataList.filter(formData => formData.id !== formDataToDelete.id);
    setFormDataList(updatedFormDataList);
    localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
    // ...
  };

  const handleEditClick = formData => {
    // Navigate to the edit step 0 route with the form data
    navigate('/dashboard/AddMenuItem', { state: { formData, isEditMode:true } });
    console.log(formData)
  };
  console.log(formDataList)

  const sampleMenuItems = [
    {
      id: 1,
      productName: 'Bacon Wrapped Stuffed Jalapeños',
      productDescription: 'bacon wrapped jalapeño stuffed with chorizo, three cheeses & drizzled with house bbq sauce (4 pc)',
      category: 'Main Course',
      Price: 12.99,
      image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dxprkqlo/d9efe98b-a8a7-49f8-9b96-b60c8da3ec03.jpg', // Placeholder image URL
    },
    {
      id: 2,
      productName: 'Lobster Mac & Cheese Bites',
      productDescription: 'lobster mac & cheese bites with roasted jalapeño-white Cheddar cheese dipping sauce (4 pc)',
      category: 'Fast Food',
      Price: 8.99,
      image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dxprkqlo/18967ec8-1134-4015-92b4-ed49e672f3c7.jpg', // Placeholder image URL
    },
    {
      id: 3,
      productName: 'Annalida’s Hot',
      productDescription: 'roasted chicken wings in tangy Annalida’s hot sauce, crumbled blue cheese & scallion (5 pc)',
      category: 'Fast Food',
      Price: 8.99,
      image: 'https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/dxprkqlo/93e2514d-55cd-4f9b-8329-d2591996cde1.jpg', // Placeholder image URL
    },
    // Add more sample items as needed
  ];

  const NextButtonContainer = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
   
  });
  const NextButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    
  });
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + '...';
    }
  };
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <div>
        <BoilerPlate>
        <Box sx={{ display: smScreen ? 'block' : 'block', width: 'auto' }}>

       
        <Box
  component="main"
  
  flexDirection={smScreen ? 'row' : 'row'}
  justifyContent={smScreen ? 'space-between' : 'start'}
  alignItems={smScreen ? 'start' : 'start'}
  sx={{ flexGrow: 1, mt: 8 }}
>
      <Box sx={{display: smScreen ? 'block' : 'flex', flexDirection:smScreen ? 'column' : 'row', justifyContent:'space-between'}}>
            <h1>Add Menu Item</h1>
            <Autocomplete
            sx={{width:"700px"}}
              value={searchValue}
              onChange={handleSearchChange}
              options={formDataList.map(formData => formData.productName)}
              renderInput={params => <TextField {...params} label="Search by title..." variant="outlined" />}
            />
            <Link to={{
  pathname: '/dashboard/AddMenuItem',
  state: { formData:{},
  isEditMode: false,

}

}}

>
<Button sx={{
  backgroundColor: "black",
  color: "white",
}}>Add  menu item</Button>
</Link>
</Box>
        </Box>
          <div style={{display:'flex', justifyContent:"center"}}>
          <button onClick={() => setSelectedCategory('')}>
          All
        </button>
        {uniqueCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat); // Set the selected category
              setSearchValue(''); // Clear the search value
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


        {/* Static Data */}
        <Grid container spacing={6} sx={{ marginTop: '2rem', display: 'flex', alignItems: 'center' }}>
          {sampleMenuItems.map((menuItem) => (
            <Grid item xs={12} sm={6} md={5.5} key={menuItem.id}>
              <MenuItemCard>
                <MenuItemImage component="img" src={menuItem.image} alt="Menu Item Image" />
                <MenuItemContent>
                  <MenuItemName variant="h6">{menuItem.productName}</MenuItemName>
                  <Typography variant="body2" className="description" sx={{ width: '100%' }}>
                {truncateDescription(menuItem.productDescription, 60)} {/* Adjust 100 to your desired character limit */}
              </Typography>
                  <CategoryAndPrice>
                    <Category variant="body2">Category: <b>{menuItem.category}</b></Category>
                    <Price variant="body2">Price: <b>${menuItem.Price}</b></Price>
                  </CategoryAndPrice>
                </MenuItemContent>
                <EditDeleteContainer>
                  <IconButton>
                    <EditIcon alt="" src={Edit} />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon alt="" src={Delete} />
                  </IconButton>
                </EditDeleteContainer>
              </MenuItemCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{display:"flex", width:"100%", alignItems:"center", justifyContent:"end"}}>
        <AI_Feedback/>
        </Box>
        </Box>
        </BoilerPlate>
    </div>
  );
}

export default About;
