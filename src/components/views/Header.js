import React, { useState } from 'react';
import '../../styles/views/Header.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const token = localStorage.getItem('access_token');

  const navigateToHome = () => {
    navigate(token ? "/dashboard" : "/");
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">AppliedJobTracker</div>
        <nav className={isMobileMenuOpen ? 'open' : ''}>
          <ul>
            <li><span onClick={() => { navigateToHome(); closeMobileMenu(); }}>Home</span></li>
            <li><span onClick={() => { navigate("/features"); closeMobileMenu(); }}>Features</span></li>
            <li><span onClick={() => { navigate("/testimonials"); closeMobileMenu(); }}>Testimonials</span></li>
            <li><span onClick={() => { navigate("/contact"); closeMobileMenu(); }}>Contact</span></li>
            {token && (
              <>
                <li><span onClick={() => { navigate("/account"); closeMobileMenu(); }}>Account Management</span></li>
                <li><span onClick={() => { closeMobileMenu(); handleLogout(); }}>Logout</span></li>
              </>
            )}
          </ul>
        </nav>
        <div className="auth-buttons">
          {!token && (
            <>
              <span onClick={() => navigate("/register")} className="register-btn">Register</span>
              <span onClick={() => navigate("/login")} className="login-btn">Login</span>
            </>
          )}
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>
      </div>
    </header>
  );
};

export default Header;

