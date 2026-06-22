import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    cartTotal, 
    clearCart
  } = useCart();

  const [address, setAddress] = useState('Home'); // 'Home', 'Office', 'New'
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'COD'
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'processing', 'success'

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SWIGGY50') {
      const discount = Math.round(cartTotal * 0.5);
      setDiscountAmount(discount);
      setAppliedCoupon('SWIGGY50');
      setCouponCode('');
    } else if (code === 'FLAT100') {
      if (cartTotal >= 299) {
        setDiscountAmount(100);
        setAppliedCoupon('FLAT100');
        setCouponCode('');
      } else {
        alert("FLAT100 is only applicable for orders above ₹299.");
      }
    } else {
      alert("Invalid coupon code. Try SWIGGY50 or FLAT100!");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
  };

  const handlePlaceOrder = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setTimeout(() => {
        clearCart();
        setCheckoutStep('cart');
        handleRemoveCoupon();
        navigate('/');
      }, 3000);
    }, 2000);
  };

  const deliveryFee = cartTotal > 0 ? (cartTotal > 250 ? 0 : 30) : 0;
  const gst = cartTotal > 0 ? Math.round(cartTotal * 0.05) : 0; // 5% GST
  const grandTotal = cartTotal + deliveryFee + gst - discountAmount;

  if (checkoutStep === 'processing') {
    return (
      <div className="checkout-processing-view full-page-checkout-loader">
        <div className="loader-spinner"></div>
        <h4>Securing Your Feast...</h4>
        <p>Sending details to the restaurant kitchen. Please do not close this window.</p>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="checkout-success-view full-page-checkout-loader">
        <div className="success-icon-wrapper">
          <i className="fa-solid fa-circle-check animate-bounce"></i>
        </div>
        <h4>Order Placed Successfully!</h4>
        <p>Your delivery partner has been assigned and is heading to the restaurant.</p>
        <div className="delivery-track-animation">
          <i className="fa-solid fa-motorcycle bike-icon"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="full-cart-page-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart-page">
          <div className="empty-cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <h2>Your cart is empty</h2>
          <p>You can go to the home page to view more restaurants and delicious meals.</p>
          <button className="browse-btn" onClick={() => navigate('/')}>
            SEE RESTAURANTS NEAR YOU
          </button>
        </div>
      ) : (
        <div className="cart-checkout-layout">
          {/* Left Side: Address & Payments */}
          <div className="checkout-left-pane">
            
            {/* 1. Address Section */}
            <div className="checkout-section-card">
              <div className="section-title-row">
                <span className="step-number">1</span>
                <h3>Select Delivery Address</h3>
              </div>
              <div className="options-grid">
                <div 
                  className={`option-card ${address === 'Home' ? 'selected' : ''}`}
                  onClick={() => setAddress('Home')}
                >
                  <i className="fa-solid fa-house"></i>
                  <h4>Home</h4>
                  <p>123, London Street, Perambur, Chennai - 600011</p>
                </div>
                <div 
                  className={`option-card ${address === 'Office' ? 'selected' : ''}`}
                  onClick={() => setAddress('Office')}
                >
                  <i className="fa-solid fa-briefcase"></i>
                  <h4>Office</h4>
                  <p>Building 4B, Tech Park, OMR, Chennai - 600096</p>
                </div>
              </div>
            </div>

            {/* 2. Payment Options Section */}
            <div className="checkout-section-card">
              <div className="section-title-row">
                <span className="step-number">2</span>
                <h3>Choose Payment Method</h3>
              </div>
              <div className="options-grid">
                <div 
                  className={`option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('UPI')}
                >
                  <i className="fa-solid fa-mobile-screen-button"></i>
                  <h4>BHIM UPI</h4>
                  <p>Pay instantly using any UPI app (GPay/PhonePe)</p>
                </div>
                <div 
                  className={`option-card ${paymentMethod === 'Card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('Card')}
                >
                  <i className="fa-solid fa-credit-card"></i>
                  <h4>Credit / Debit Card</h4>
                  <p>Visa, MasterCard, RuPay cards supported</p>
                </div>
                <div 
                  className={`option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <i className="fa-solid fa-money-bill-wave"></i>
                  <h4>Cash On Delivery</h4>
                  <p>Pay in cash or digital code upon delivery</p>
                </div>
              </div>
            </div>

            {/* 3. Items Review Section */}
            <div className="checkout-section-card">
              <div className="section-title-row">
                <span className="step-number">3</span>
                <h3>Review Items</h3>
              </div>
              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item-row">
                    <div className="item-detail">
                      <span className="item-name-bold">{item.name}</span>
                      <span className="item-rest-sub">{item.restaurantName}</span>
                    </div>
                    
                    <div className="cart-quantity-controls">
                      <button className="qty-btn" onClick={() => removeFromCart(item.id)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => addToCart(item, item.restaurantName)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>

                    <span className="item-total-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Bill Details & Promo */}
          <div className="checkout-right-pane">
            <div className="bill-summary-card">
              <h3>Bill Details</h3>
              
              {/* Promo Coupon Form */}
              {appliedCoupon ? (
                <div className="applied-coupon-box">
                  <div className="coupon-info">
                    <i className="fa-solid fa-tag"></i>
                    <span>Code <strong>{appliedCoupon}</strong> Applied</span>
                  </div>
                  <button className="remove-coupon-btn" onClick={handleRemoveCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form-group">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (SWIGGY50)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit">APPLY</button>
                </form>
              )}

              <hr className="bill-divider" />

              <div className="bill-rows">
                <div className="bill-row">
                  <span>Item Total</span>
                  <span>₹{cartTotal}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="bill-row coupon-discount-row">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}

                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="free-delivery">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="bill-row">
                  <span>GST & Restaurant Charges (5%)</span>
                  <span>₹{gst}</span>
                </div>

                <hr className="bill-divider" />

                <div className="bill-row grand-total-bill">
                  <span>To Pay</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                PLACE ORDER (₹{grandTotal})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
