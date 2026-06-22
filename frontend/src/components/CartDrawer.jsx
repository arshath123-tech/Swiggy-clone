import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    addToCart, 
    removeFromCart, 
    cartTotal, 
    clearCart 
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'processing', 'success'

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setCheckoutStep('cart');
      }, 3000);
    }, 2000);
  };

  const deliveryFee = cartTotal > 0 ? (cartTotal > 250 ? 0 : 30) : 0;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <h3>Shopping Cart</h3>
          <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content Area */}
        <div className="cart-drawer-content">
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <div className="empty-cart-icon">
                    <i className="fa-solid fa-basket-shopping"></i>
                  </div>
                  <h4>Your cart is empty</h4>
                  <p>Add items from restaurants to start a new order!</p>
                  <button className="start-shopping-btn" onClick={() => setIsCartOpen(false)}>
                    Browse Restaurants
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-restaurant">{item.restaurantName}</span>
                        <span className="cart-item-price">₹{item.price}</span>
                      </div>
                      
                      <div className="cart-quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => addToCart(item, item.restaurantName)}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="order-summary-box">
                    <div className="summary-row">
                      <span>Item Total</span>
                      <span>₹{cartTotal}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="free-delivery">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <hr className="summary-divider" />
                    <div className="summary-row grand-total-row">
                      <span>Grand Total</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  <button className="checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout (₹{grandTotal})
                  </button>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'processing' && (
            <div className="checkout-processing-view">
              <div className="loader-spinner"></div>
              <h4>Processing Your Order...</h4>
              <p>Please wait while we connect with the restaurant.</p>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="checkout-success-view">
              <div className="success-icon-wrapper">
                <i className="fa-solid fa-circle-check animate-bounce"></i>
              </div>
              <h4>Order Placed Successfully!</h4>
              <p>Your food is being prepared. Bon appétit!</p>
              <div className="delivery-track-animation">
                <i className="fa-solid fa-motorcycle bike-icon"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
