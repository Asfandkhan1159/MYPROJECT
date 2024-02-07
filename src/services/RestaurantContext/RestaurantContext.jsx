import React, { createContext, useContext, useState, useCallback } from "react";


const RestaurantContext = createContext();

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const [restaurants] = useState([
    {
      id: 1,
      name: "Jpan, University Town Center",
      location: { lat: 27.38489085495185, lng: -82.45679914103285}, 
    // 27.38489085495185, -82.45679914103285
      weeklyStats: {
        purchases: "30",
        profit: "$20K",
        sales: "$33K",
        vendors: "50",
      },
      purchasingOverview: {
        purchases: "600",
        lowStock: "40",
        cost: "$900",
        costVariation: "2%",
      },
      inventory: [
        { name: "Onions", quantity: 75 },
        { name: "Carrots", quantity: 30 },
        // Add more inventory items...
      ],
      vendors: [
        { name: "Vendor1", products: ["Tomatoes", "Potatoes"] },
        { name: "Vendor3", products: ["Onions", "Carrots"] },
        // Add more vendor items...
      ],
    },
   
   ///
   
    {
      id: 2,
      name: "Piers 22",
      location: { lat: 27.50059339142959, lng: -82.57327098364001 },
      weeklyStats: {
        purchases: "30",
        profit: "$20K",
        sales: "$33K",
        vendors: "50",
      },
      purchasingOverview: {
        purchases: "600",
        lowStock: "40",
        cost: "$900",
        costVariation: "2%",
      },
      inventory: [
        { name: "Onions", quantity: 75 },
        { name: "Carrots", quantity: 30 },
        // Add more inventory items...
      ],
      vendors: [
        { name: "Vendor1", products: ["Tomatoes", "Potatoes"] },
        { name: "Vendor3", products: ["Onions", "Carrots"] },
        // Add more vendor items...
      ],
    },
    {
      id: 3,
      name: "Kore Steak house",
      location: { lat: 27.363462802058798, lng: -82.41675443297338}, 
    // 27.363462802058798, -82.41675443297338
      weeklyStats: {
        purchases: "30",
        profit: "$20K",
        sales: "$33K",
        vendors: "50",
      },
      purchasingOverview: {
        purchases: "600",
        lowStock: "40",
        cost: "$900",
        costVariation: "2%",
      },
      inventory: [
        { name: "Onions", quantity: 75 },
        { name: "Carrots", quantity: 30 },
        // Add more inventory items...
      ],
      vendors: [
        { name: "Vendor1", products: ["Tomatoes", "Potatoes"] },
        { name: "Vendor3", products: ["Onions", "Carrots"] },
        // Add more vendor items...
      ],
    },
    {
      id: 4,
      name: "Jpan, Tamiami Trail",
      location: { lat: 27.30024851921486, lng: -82.53200052416499}, 
    // 27.300212908234567, -82.53200873799395
    //, 27.300207569551684, -82.532006084657444
    //27.30024851921486, -82.53200052416499
      weeklyStats: {
        purchases: "30",
        profit: "$20K",
        sales: "$33K",
        vendors: "50",
      },
      purchasingOverview: {
        purchases: "600",
        lowStock: "40",
        cost: "$900",
        costVariation: "2%",
      },
      inventory: [
        { name: "Onions", quantity: 75 },
        { name: "Carrots", quantity: 30 },
        // Add more inventory items...
      ],
      vendors: [
        { name: "Vendor1", products: ["Tomatoes", "Potatoes"] },
        { name: "Vendor3", products: ["Onions", "Carrots"] },
        // Add more vendor items...
      ],
    },
    {
      id: 5,
      name: "The Grove",
      location: {
        lat: 27.39372626617711,
        lng: -82.43630308733465,
      },
      weeklyStats: {
        purchases: 23,
        profit: "$15K",
        sales: "$32.4K",
        vendors: 45,
      },
      purchasingOverview: {
        purchases: "507",
        lowStock: "34",
        cost: "$756",
        costVariation: "1%",
      },
      inventory: [
        { name: "Tomatoes", quantity: 100 },
        { name: "Potatoes", quantity: 50 },
        // Add more inventory items...
      ],
      vendors: [
        { name: "Vendor1", products: ["Tomatoes", "Potatoes"] },
        { name: "Vendor2", products: ["Onions", "Carrots"] },
        // Add more vendor items...
      ],
    },
    
    // Add more restaurant data...
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]);

  const updateSelectedRestaurant = useCallback((restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  const getSelectedRestaurantData = () => {
    return selectedRestaurant;
  };

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

