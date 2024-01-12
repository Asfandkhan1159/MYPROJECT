// RootLayout.jsx
import React from 'react';
import SideNav from '../SideBar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <SideNav />
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
};

export default RootLayout;
