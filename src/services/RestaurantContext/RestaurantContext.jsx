import React, { createContext, useContext, useState, useCallback } from 'react';

const RestaurantContext = createContext();

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'The Grove',
      location: {
        lat:27.39372626617711,
        lng:-82.43630308733465
      },
       
      weeklyStats: { purchases: 23, profit: '$15K', sales: '$32.4K', vendors: 45 },
      purchasingOverview: { purchases: '507', lowStock: '34', cost: '$756', costVariation: '1%' },
    },
    {
      id: 2,
      name: 'Piers 22',
      location: { lat:  27.50059339142959,
        lng: -82.57327098364001},
        
      weeklyStats: { purchases: '30', profit: '$20K', sales: '$33K', vendors: '50' },
      purchasingOverview: { purchases: '600', lowStock: '40', cost: '$900', costVariation: '2%' },
    },
    // Add more restaurant data...
  ]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0])
  const updateSelectedRestaurant = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);
  

  const getSelectedRestaurantData = () => {
    return selectedRestaurant;
  };
  
  console.log(selectedRestaurant)
  return (
    <RestaurantContext.Provider
      value={{
        selectedRestaurant,
        setSelectedRestaurant,
        updateSelectedRestaurant,
        restaurants,
        getSelectedRestaurantData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};