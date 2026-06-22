import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Login = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'dashboard'
  const [timer, setTimer] = useState(30);
  const [userProfile, setUserProfile] = useState(null);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setStep('otp');
    setTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      alert("Please enter a 4-digit OTP. (Hint: Use 1234)");
      return;
    }
    
    // Simulate successful authentication
    setUserProfile({
      name: "Swiggy Foodie",
      phone: `+91 ${phoneNumber}`,
      email: "foodie@swiggyclone.com",
      memberSince: "June 2024",
      swiggyOne: true,
      orders: [
        { id: "TXN0981", date: "10 June 2026", restaurant: "McDonald's", items: "McSpicy Chicken Combo x 1", total: 299, status: "Delivered" },
        { id: "TXN0542", date: "05 June 2026", restaurant: "Sangeetha Veg", items: "Paper Masala Dosa x 2, Coffee x 1", total: 305, status: "Delivered" }
      ]
    });
    setStep('dashboard');
  };

  const handleLogout = () => {
    setPhoneNumber('');
    setOtp('');
    setUserProfile(null);
    setStep('phone');
  };

  return (
    <div className="login-page-container">
      {step === 'phone' && (
        <div className="login-card">
          <div className="login-header-block">
            <div className="login-title-wrapper">
              <h2>Login</h2>
              <p>or <span className="highlight-orange">create an account</span></p>
            </div>
            <img src="/asset/image/logo.png" alt="Swiggy" className="login-mini-logo" />
          </div>

          <form onSubmit={handleSendOtp} className="login-form">
            <div className="phone-input-group">
              <span className="prefix">+91</span>
              <input 
                type="tel" 
                maxLength="10"
                placeholder="Phone number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
              />
            </div>
            
            <button type="submit" className="login-submit-btn">
              LOGIN
            </button>
            <p className="login-terms">
              By clicking on Login, I accept Swiggy's Terms & Conditions & Privacy Policy
            </p>
          </form>
        </div>
      )}

      {step === 'otp' && (
        <div className="login-card">
          <div className="login-header-block">
            <div className="login-title-wrapper">
              <h2>Verify OTP</h2>
              <p>Enter OTP sent to <span className="highlight-orange">+91 {phoneNumber}</span></p>
            </div>
            <i className="fa-solid fa-lock otp-lock-icon"></i>
          </div>

          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="otp-input-group">
              <input 
                type="text" 
                maxLength="4"
                placeholder="Enter 4-digit OTP" 
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                autoFocus
              />
            </div>
            
            <button type="submit" className="login-submit-btn">
              VERIFY OTP
            </button>

            <div className="otp-timer-row">
              {timer > 0 ? (
                <span>Resend OTP in <span className="highlight-orange">0:{timer < 10 ? `0${timer}` : timer}</span></span>
              ) : (
                <button 
                  type="button" 
                  className="resend-otp-btn"
                  onClick={() => { setTimer(30); alert("Mock OTP Resent! (Use 1234)"); }}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button type="button" className="back-to-phone-btn" onClick={() => setStep('phone')}>
              Change Phone Number
            </button>
          </form>
        </div>
      )}

      {step === 'dashboard' && userProfile && (
        <div className="dashboard-wrapper">
          {/* User Profile Summary Card */}
          <div className="user-profile-header-card">
            <div className="profile-details-row">
              <div className="profile-large-avatar">
                <i className="fa-solid fa-circle-user"></i>
              </div>
              <div className="profile-info-block">
                <h2>{userProfile.name}</h2>
                <p>{userProfile.phone} | {userProfile.email}</p>
                <span className="join-date">Customer since {userProfile.memberSince}</span>
              </div>
            </div>

            {userProfile.swiggyOne && (
              <div className="swiggy-one-banner">
                <div className="swiggy-one-logo">
                  <span className="one-text">swiggy</span>
                  <span className="one-badge">ONE</span>
                </div>
                <p>You have active free delivery benefits! Save ₹30 on every order above ₹199.</p>
              </div>
            )}
            
            <button className="logout-btn" onClick={handleLogout}>
              Logout Account
            </button>
          </div>

          {/* Past Orders List */}
          <div className="past-orders-section">
            <h3>Past Orders</h3>
            <div className="orders-list">
              {userProfile.orders.map((order) => (
                <div key={order.id} className="order-history-card">
                  <div className="order-header-row">
                    <div>
                      <h4>{order.restaurant}</h4>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <span className="order-status-badge">
                      <i className="fa-solid fa-circle-check"></i> {order.status}
                    </span>
                  </div>
                  <div className="order-body-row">
                    <p className="order-items-summary">{order.items}</p>
                    <span className="order-price-bold">₹{order.total}</span>
                  </div>
                  <div className="order-actions-row">
                    <button className="reorder-btn" onClick={() => {
                      alert(`Reordered items from ${order.restaurant}! Added to cart.`);
                      navigate('/');
                    }}>
                      Reorder Items
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
