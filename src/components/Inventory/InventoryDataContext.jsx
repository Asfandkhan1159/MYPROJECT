/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const InventoryDataContext = createContext();

export function InventoryDataProvider({ children }) {
  const [rows, setRows] = useState([
    {
      id: 'INV-1234',
      itemName: 'Carrot',
      category: 'Vegetable',
      quantity: 20,
      location: 'Aisle 1, Shelf 2',
      expirationDate: 'Jan 6, 2024',
      status: 'outOfStock',
      historicalConsumption: [10, 12, 8, 15, 10],
    },
    {
      id: 'INV-1235',
      itemName: 'Apple',
      category: 'Fruit',
      quantity: 50,
      location: 'Aisle 2, Shelf 1',
      expirationDate: 'Nov 15, 2024',
      status: 'In Stock',
      historicalConsumption: [20, 2, 8, 18, 10],
    },
    {
      id: 'INV-1236',
      itemName: 'Chicken Breast',
      category: 'Meat',
      quantity: 30,
      location: 'Freezer',
      expirationDate: 'Oct 10, 2023',
      status: 'In Stock',
      historicalConsumption: [100, 12, 18, 15, 10],
    },
    {
      id: 'INV-1237',
      itemName: 'Rice',
      category: 'Grains',
      quantity: 80,
      location: 'Aisle 3, Shelf 4',
      expirationDate: 'Dec 5, 2023',
      status: 'In Stock',
      historicalConsumption: [0, 22, 8, 15, 10],
    },
    {
      id: 'INV-1238',
      itemName: 'Tomato',
      category: 'Vegetable',
      quantity: 60,
      location: 'Aisle 1, Shelf 3',
      expirationDate: 'Nov 20, 2023',
      status: 'In Stock',
      historicalConsumption: [30, 12, 12, 15, 10,20,80],
    },
    {
      id: 'INV-1239',
      itemName: 'Orange',
      category: 'Fruit',
      quantity: 40,
      location: 'Aisle 2, Shelf 2',
      expirationDate: 'Dec 10, 2023',
      status: 'In Stock',
      historicalConsumption: [11, 5, 13, 15, 10],
    },
    {
      id: 'INV-1240',
      itemName: 'Beef Steak',
      category: 'Meat',
      quantity: 20,
      location: 'Freezer',
      expirationDate: 'Oct 15, 2023',
      status: 'In Stock',
      historicalConsumption: [10, 12, 38, 25, 9],
    },
    {
      id: 'INV-1241',
      itemName: 'Quinoa',
      category: 'Grains',
      quantity: 70,
      location: 'Aisle 3, Shelf 1',
      expirationDate: 'Dec 8, 2023',
      status: 'In Stock',
      historicalConsumption: [11, 11, 18, 12, 10],
    },
    {
      id: 'INV-1242',
      itemName: 'Cucumber',
      category: 'Vegetable',
      quantity: 45,
      location: 'Aisle 1, Shelf 4',
      expirationDate: 'Nov 25, 2023',
      status: 'In Stock',
      historicalConsumption: [10, 12,28, 15, 10],
    },
    {
      id: 'INV-1243',
      itemName: 'Grapes',
      category: 'Fruit',
      quantity:200,
      location: 'Aisle 2, Shelf 3',
      expirationDate: 'Dec 12, 2023',
      status: 'inStock',
      historicalConsumption: [10, 12, 18, 15, 10],
    },
    // Add more inventory items...
  ]);

  return (
    <InventoryDataContext.Provider value={{ rows, setRows }}>
      {children}
    </InventoryDataContext.Provider>
  );
}export function useInventoryData() {
  return useContext(InventoryDataContext);
}
