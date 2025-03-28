import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from "../../Pages/Login";
import Signup from "../../Pages/Signup";
import "./Navbar.css";

import logo from '../Assets/images/Logo.png';
import straightLine from '../Assets/images/line.png';
import searchIcon from '../Assets/images/search.png';
import personIcon from '../Assets/images/Person.png';
import cartIcon from '../Assets/images/Cart.png';

function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown state
  const [loginModalVisible, setLoginModalVisible] = useState(false); // Login Modal state
  const [signupModalVisible, setSignupModalVisible] = useState(false); // Signup Modal state

  const navigate = useNavigate();

  // UseRefs to track dropdown and modal
  const dropdownRef = useRef(null);
  const loginModalRef = useRef(null);
  const signupModalRef = useRef(null);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleLoginModal = () => {
    setLoginModalVisible(!loginModalVisible);
    setDropdownVisible(false); // Close the dropdown when modal opens
  };

  const toggleSignupModal = () => {
    setSignupModalVisible(!signupModalVisible);
    setDropdownVisible(false); // Close the dropdown when modal opens
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://192.168.1.109:3000/api/user/profile', { withCredentials: true });
        if (response.data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.109:3000/api/user/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to close dropdown or modals if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
      // Detect outside click for login modal
      if (loginModalRef.current && loginModalVisible && !loginModalRef.current.contains(event.target)) {
        setLoginModalVisible(false);
      }
      // Detect outside click for signup modal
      if (signupModalRef.current && signupModalVisible && !signupModalRef.current.contains(event.target)) {
        setSignupModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, loginModalRef, signupModalRef, loginModalVisible, signupModalVisible]);

  return (
    <header className={`header ${navbarBg ? 'navbar-scrolled' : ''}`}>
      <Link to="/"><img className="logo" alt="hubooze logo" src={logo} /></Link>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li><Link className="main-nav-link" to="/">Home</Link></li>
          <li><Link className="main-nav-link" to="/men">Men</Link></li>
          <li><Link className="main-nav-link" to="/women">Women</Link></li>
          <li><Link className="main-nav-link" to="/kids">Kids</Link></li>
          <li><img className="straight-line main-nav-img" alt="straight-line" src={straightLine} /></li>
          <li>
            <div id="search-container" className={`search-container ${searchVisible ? 'visible' : 'hidden'}`}>
              <input type="text" placeholder="Search..." />
            </div>
          </li>
          <li><img className="search main-nav-img" id="search-icon" alt="search-icon" src={searchIcon} onClick={toggleSearch} /></li>
          
          {/* Person Icon with dropdown */}
          <li>
            <img
              className="person main-nav-img"
              alt="Person-icon"
              src={personIcon}
              onClick={toggleDropdown}
            />
            
            {dropdownVisible && (
              <div className="dropdown" ref={dropdownRef}>
                <ul>
                  {!isAuthenticated ? (
                    <>
                      <li><a href="#" onClick={toggleSignupModal}>SIGN UP</a></li>
                      <li><a href="#" onClick={toggleLoginModal}>LOGIN</a></li>
                    </>
                  ) : (
                    <>
                      <li><Link to="/profile">PROFILE</Link></li>
                      <li><Link to="/wishlist">WISHLIST</Link></li>
                      <li><a href="#" onClick={handleLogout}>LOGOUT</a></li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </li>

          <li><img className="cart-home-page main-nav-img" alt="Cart-icon" src={cartIcon} /></li>
        </ul>
      </nav>

      {/* Render Login Modal */}
      {loginModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" ref={loginModalRef}>
            <Login closeModal={toggleLoginModal} />
          </div>
        </div>
      )}
      
      {/* Render Signup Modal */}
      {signupModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content" ref={signupModalRef}>
            <Signup closeModal={toggleSignupModal} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

