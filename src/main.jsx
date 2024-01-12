import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import SignupPage from './Screens/Signup.jsx';
import LoginForm from './components/Login.jsx';
import DashBoard from './Screens/DashBoard.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import AddMenuItem from './pages/AddMenuItem';
import Otp from './Screens/Otp';
import InventoryList from './components/Inventory/InventoryList';
import InventoryTable from './components/Inventory/InventoryTable';
import Sidebar from './components/SideBar';
import { Box } from '@mui/material';
import RestaurantStatistics from './pages/RestaurantStatistics';
import PurchasingAnalytics from './pages/PurchasingAnalytics';
import InventoryReport from './pages/InventoryReport';
import { InventoryDataProvider } from './components/Inventory/InventoryDataContext';
import { VendorDataProvider } from './components/Vendors/VendorsTable/VendorDataContext';
import { RestaurantProvider } from './services/RestaurantContext/RestaurantContext.jsx';
import Vendors from './pages/Vendors';
import GetRebates from './components/Vendors/VendorsTable/GetRebates/GetRebates.jsx';
import Reviews from './pages/Reviews.jsx';
import ReviewContainer from './components/ReviewsSources/ReviewContainer.jsx';
import CompareReviewsComponent from './components/ReviewsSources/ReviewsComparison.jsx';
import User from './components/Users/User.jsx';
import Post from './components/SocialMedia/Monitoring/Post.jsx';
import AI_Campaigns from './components/AI_Campaigns/SocialMediaCampaigns/AI_Campaigns.jsx';
import CustomerMosiacs from './components/AI_Campaigns/Customer_Mosiacs/CustomerMosiacs.jsx';
import { SettingsProvider } from './services/SettingsService/settingContext.jsx';
import App from './App';
import InventoryInsights from './components/Inventory/InventoryInsights.jsx';
import AI_Feedback from './components/AI_Feedback/AI_Feedback.jsx';
import SearchAndDisplayData from './components/Search&Display/Search&DisplayData.jsx';
// const MainLayout = ({ children }) => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <main style={{ flexGrow: 1, padding: '16px' }}>
//         {children}
//       </main>
//     </div>
//   );
// };

// export default MainLayout;
const router = createBrowserRouter([
  {
    path: '/dashboard',
    children: [
      {
        index: true, // Use index: true for the base route
        element: <DashBoard />,
      },
      {
        path: 'home', // Relative path, this matches /dashboard/home
        element: <Home />,
      }, {
        path: 'about', // Relative path, this matches /dashboard/home
        element: <About />,
      },
      {
        path:'Settings',
        element:<Settings/>
      },
      {
        path: 'AddMenuItem', // Relative path, this matches /dashboard/AddMenuItem
        element: <AddMenuItem />,
      },
      {
        path: 'restaurantstats', // Relative path, this matches /dashboard/AddMenuItem
        element: <RestaurantStatistics />,
      },
      {
        path:'purchasinganalytics',
        element:<PurchasingAnalytics/>
      },
      {
        path:'inventoryreport',
        element:<InventoryReport/>
      },
      {
        path: 'inventory', // Relative path, this matches /dashboard/AddMenuItem
        element: <InventoryTable/>,
      },
      {
        path:"vendors",
        element:<Vendors/>
      },
      {
        path:"getrebates",
        element:<GetRebates/>
      },
      {
        path:"searchitem",
        element:<SearchAndDisplayData/>
      },
      {
        path:"insights",
        element:<InventoryInsights/>
      },
      {
        path:"reviews",
        element:<Reviews/>
      },
      {
        path:"compareReviews",
        element:<CompareReviewsComponent/>
      },
      {
        path:"users",
        element:<User/>
      },
      {
        path:"post",
        element:<Post/>
      },
      {
        path:"AI_Campaigns",
        element:<AI_Campaigns/>
      },
      {
        path:"Customer_Mosiacs",
        element:<CustomerMosiacs/>
      },
      {
        path:"settings",
        element:<Settings/>
      },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {path:'/', element:<LoginForm/>},
  {
    path: '/Signup',
    element: <SignupPage />,
  },
  {
    path: '/Signup/OTPvalidation/:phoneNumber',
    element:<Otp/>
  },
  
 
]);
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <RestaurantProvider>
  <SettingsProvider>
    <InventoryDataProvider>
      <VendorDataProvider>
        <RouterProvider router={router} />
        <App/>
      </VendorDataProvider>
    </InventoryDataProvider>
  </SettingsProvider>
  </RestaurantProvider>
);