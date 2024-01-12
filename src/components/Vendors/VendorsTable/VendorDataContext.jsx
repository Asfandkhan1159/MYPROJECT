import React, { createContext, useContext, useState } from 'react';
import PFGLOGO from '../../../assets/VendorIcons/Group 1000002814.svg'
import GordonLOGO from '../../../assets/VendorIcons/Group 1000002816.svg'
import SyscoLOGO from  '../../../assets/VendorIcons/Rectangle 5516.svg'
import HTLOGO from '../../../assets/VendorIcons/Rectangle 5519.svg'
import KEHELOGO from '../../../assets/VendorIcons/Rectangle 5520.svg'
const VendorDataContext = createContext();

export function VendorDataProvider({ children }) {
  const [vendorData, setVendorData] = useState([
    {
        id: 1,
        name: "Sysco",
        logo: SyscoLOGO,
        date: "10/29/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$16.99",
        category:"Spices"
      },
      {
        id: 2,
        name: "PFG",
        logo: PFGLOGO,
        date: "10/28/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$9.99",
        category:"vegetable"
      },
      {
        id: 3,
        name: "Gordon",
        logo: GordonLOGO,
        date: "10/27/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$75.00",
        category:"Dairy Products"
      },
      {
        id: 4,
        name: "H.T Heckney",
        logo: HTLOGO,
        date: "10/26/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$50.00",
        category:"vegetable"
      },
      {
        id: 5,
        name: "KeHE",
        logo: KEHELOGO,
        date: "10/25/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$25.00",
        category:"fruit"
      },
      {
        id: 6,
        name: "Consolidated Concepts",
        logo: PFGLOGO,
        date: "10/24/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$10.00",
        category:"Spices"
      },
      // Add more rows to match the previous count
      {
        id: 7,
        name: "Sysco",
        logo: SyscoLOGO,
        date: "10/23/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$60.00",
        category:"vegetable"
      },
      {
        id: 8,
        name: "Buyers Edge",
        logo: PFGLOGO,
        date: "10/22/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$35.00",
        category:"vegetable"
      },
      {
        id: 9,
        name: "Thomasnet",
        logo: PFGLOGO,
        date: "10/21/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$80.00",
        category:"vegetable"
      },
      {
        id: 10,
        name: "BlueCart",
        logo: PFGLOGO,
        date: "10/20/2023",
        quantity: Math.floor(Math.random() *500)+1,
        amount: "$22.00",
        category:"vegetable"
      }
  ]);

  return (
    <VendorDataContext.Provider value={{ vendorData, setVendorData}}>
      {children}
    </VendorDataContext.Provider>
  );
}

export function useVendorData() {
    return useContext(VendorDataContext);
   
}