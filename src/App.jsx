// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import SignupPage from './Screens/Signup';
import Dashboard from './Screens/DashBoard';
import AI_Feedback from './components/AI_Feedback/AI_Feedback';
import SearchAndDisplayData from './components/Search&Display/Search&DisplayData';

// import MainLayout from './main';



function App() {

  return (
    <div>
      
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/dashboard/*" element={<MainLayout />} /> */}
      </Routes>
      
    </Router>
    

    </div>
  );
}

export default App;
