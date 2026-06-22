import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import MobileNavBar from './components/MobileNavBar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

// Page imports
import Home from './components/Home';
import Search from './components/Search';
import Offers from './components/Offers';
import Corporate from './components/Corporate';
import Help from './components/Help';
import Login from './components/Login';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content based on URL route */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            {/* Fallback: redirect unknown paths to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart side drawer */}
        <CartDrawer />

        {/* Mobile bottom navigation */}
        <MobileNavBar />
      </div>
    </CartProvider>
  );
}

export default App;
