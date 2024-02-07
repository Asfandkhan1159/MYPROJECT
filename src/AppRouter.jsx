import React from 'react';
import {
  HashRouter  as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
// import Sidebar from './components/SideBar';
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
import { Outlet } from 'react-router-dom';
import CustomerSegmentation from './components/AI_Campaigns/CustomerSegmentation.jsx';
import MainContent from './components/MainContent.jsx';
import Sidebar from './components/SideBar';
const DashboardRoutes = () => {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="settings" element={<Settings />} />
        <Route path="addmenuitem" element={<AddMenuItem />} />
        <Route path="restaurantstats" element={<RestaurantStatistics />} />
        <Route path="purchasinganalytics" element={<PurchasingAnalytics />} />
        <Route path="inventoryreport" element={<InventoryReport />} />
        <Route path="inventory" element={<InventoryTable />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="getrebates" element={<GetRebates />} />
        <Route path="searchitem" element={<SearchAndDisplayData />} />
        <Route path="insights" element={<InventoryInsights />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="comparereviews" element={<CompareReviewsComponent />} />
        <Route path="users" element={<User />} />
        <Route path="post" element={<Post />} />
        <Route path="ai_campaigns" element={<AI_Campaigns />} />
        <Route path="customer_mosiacs" element={<CustomerMosiacs />} />
        <Route path="customersegmentation" element={<CustomerSegmentation/>}/>
      </Routes>
    );
  };
  
  const AppRouter = () => {
    return (
      <Router>
        <Routes>
        <Route
          path="/dashboard/*"
          element={
            <Sidebar>
              <DashboardRoutes />
            </Sidebar>
          }
        />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/otpvalidation/:phoneNumber" element={<Otp />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;