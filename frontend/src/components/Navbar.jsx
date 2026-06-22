import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  // Sync search input box visibility with current path
  useEffect(() => {
    if (location.pathname === '/search') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Side: Logo and Location */}
        <Link to="/" className="left">
          <img src="/asset/image/logo_192x192.png" alt="Swiggy Logo" className="logo-img" />
          <div className="location-selector">
            <span className="location-main">Other</span>
            <i className="fa-solid fa-angle-down arrow-icon"></i>
          </div>
        </Link>

        {/* Right Side: Navigation Links */}
        <div className="right">
          {/* Swiggy Corporate */}
          <Link to="/corporate" className={`nav-item ${location.pathname === '/corporate' ? 'active-link' : ''}`}>
            <i className="fa-solid fa-briefcase"></i>
            <span>Swiggy Corporate</span>
          </Link>

          {/* Dynamic Search Box */}
          <div className={`nav-item search-item ${showSearch ? 'active' : ''}`}>
            <i className="fa-solid fa-magnifying-glass" onClick={() => { setShowSearch(true); navigate('/search'); }}></i>
            {showSearch ? (
              <input
                type="text"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (location.pathname !== '/search') {
                    navigate('/search');
                  }
                }}
                className="search-input"
                autoFocus
              />
            ) : (
              <span onClick={() => {
                setShowSearch(true);
                navigate('/search');
              }}>Search</span>
            )}
            {showSearch && searchQuery && (
              <i className="fa-solid fa-xmark clear-search-icon" onClick={() => setSearchQuery("")}></i>
            )}
          </div>

          {/* Offers */}
          <Link to="/offers" className={`nav-item ${location.pathname === '/offers' ? 'active-link' : ''}`}>
            <i className="fa-solid fa-tag"></i>
            <span>
              Offers
              <sup className="new-badge">NEW</sup>
            </span>
          </Link>

          {/* Help */}
          <Link to="/help" className={`nav-item ${location.pathname === '/help' ? 'active-link' : ''}`}>
            <i className="fa-regular fa-life-ring"></i>
            <span>Help</span>
          </Link>

          {/* Sign In */}
          <Link to="/login" className={`nav-item ${location.pathname === '/login' ? 'active-link' : ''}`}>
            <i className="fa-solid fa-circle-user"></i>
            <span>Sign In</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className={`nav-item cart-btn ${location.pathname === '/cart' ? 'active-link' : ''}`}>
            <div className="cart-icon-container">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
