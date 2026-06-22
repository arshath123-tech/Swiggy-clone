import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MobileNavBar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mobile-bottom-nav">
      <Link 
        to="/" 
        className={`mobile-nav-item ${currentPath === '/' ? 'active' : ''}`}
      >
        <i className="fa-solid fa-house"></i>
        <span>Home</span>
      </Link>

      <Link 
        to="/search" 
        className={`mobile-nav-item ${currentPath === '/search' ? 'active' : ''}`}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
        <span>Search</span>
      </Link>

      <Link 
        to="/offers" 
        className={`mobile-nav-item ${currentPath === '/offers' ? 'active' : ''}`}
      >
        <i className="fa-solid fa-tag"></i>
        <span>Offers</span>
      </Link>

      <Link 
        to="/cart" 
        className={`mobile-nav-item mobile-cart-item ${currentPath === '/cart' ? 'active' : ''}`}
      >
        <div className="mobile-cart-icon-wrapper">
          <i className="fa-solid fa-cart-shopping"></i>
          {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
        </div>
        <span>Cart</span>
      </Link>

      <Link 
        to="/login" 
        className={`mobile-nav-item ${currentPath === '/login' ? 'active' : ''}`}
      >
        <i className="fa-solid fa-circle-user"></i>
        <span>Account</span>
      </Link>
    </div>
  );
};

export default MobileNavBar;
