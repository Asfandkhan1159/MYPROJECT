// api.js
export const fetchNutritionalInfo = async (query) => {
    const API_KEY = import.meta.env.VITE_FOOD_API_KEY // Replace with your FDC API key
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error fetching data. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nutritional info:', error.message);
      return null;
    }
  };
  