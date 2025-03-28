import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Component/Navbar/Navbar';

import HomePage from './Pages/Home'
// Mr. Ravinders files
import { WomenSection, MenSection, KidsSection } from './Component/ProductSection/Sections'; // Adjust the import path based on your project structure
import Product from './Pages/Product';

import AdminRegister from './Component/Admin/AdminRegister'
import AdminLogin from './Component/Admin/AdminLogin';
import AdminDashboard from './Component/Admin/AdminDashboard';

import Modal from './Component/Modal/Modal';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserProfile from './Component/UserProfile/UserProfile';
import WishList from './Pages/WishlistPage';
// import WishListCard from './Component/WishListCard/WishListCard'

import About from './Pages/About';
import Contact from './Pages/Contact';
import CompanyPolicy from './Pages/Policy';
import TermsAndConditions from './Pages/TermsAndConditions';
import PressRelease from './Pages/PressRelease';
import Careers from './Pages/Careers';
import Blogs from './Pages/Blogs';
import Employees from './Pages/Employees';

import Cancel from './Pages/Cancel';
import Success from './Pages/Success';

import CartItem from './Component/CartItem/CartItem';
import Checkout from './Pages/Checkout';
import Footer from './Component/Footer/Footer';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Function to check admin authentication
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://192.168.1.109:3000/api/admin/check-auth', {
        withCredentials: true,
      });

      console.log('Check auth response:', response);

      if (response.status === 200 && response.data.message === 'Authenticated') {
        setIsAuthenticated(true);
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking admin authentication:', error);
      setIsAuthenticated(false); // Force login if there's an error
    } finally {
      setLoading(false); // Loading finished
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // If still loading, show a loading indicator or prevent rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/women' element={<WomenSection />} />
          <Route path='/men' element={<MenSection />} />
          <Route path='/kids' element={<KidsSection />} />
          <Route path='/products/:id' element={<Product />} />


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/wishlist' element={< WishList/>} />


          <Route path='/adminlogin' element={<AdminLogin />} /> 
          <Route
            path='/adminregister'
            element={isAuthenticated ? <AdminRegister /> : <Navigate to="/adminlogin" />}
          />
          <Route
            path='/admin/dashboard'
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/adminlogin" />}
          />


          <Route path='/cart' element={<CartItem />} />
          <Route path='/checkout' element={<Checkout />} />


          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<CompanyPolicy />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/press-releases' element={<PressRelease />} />
          <Route path='/careers' element={<Careers />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/employees' element={<Employees />} />


          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;