import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const RestaurantCard = ({ restaurant }) => {
  const { addToCart } = useCart();
  const [showMenuSelect, setShowMenuSelect] = useState(false);

  const handleQuickAdd = (item, e) => {
    e.stopPropagation(); // Prevent card clicks from doing other things
    addToCart(item, restaurant.name);
    
    // Simple temporary success animation state
    const btn = e.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = "<i class='fa-solid fa-check'></i> Added";
    btn.classList.add('added-success');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('added-success');
    }, 1500);
  };

  return (
    <div className="restaurant-card-wrapper">
      <div 
        className="child" 
        onMouseEnter={() => setShowMenuSelect(true)}
        onMouseLeave={() => setShowMenuSelect(false)}
      >
        {/* Card Header with image background & offer text */}
        <div 
          className="restaurant-header-img common" 
          style={{ backgroundImage: `url(${restaurant.image})` }}
        >
          <div className="discount-overlay">
            <h2>{restaurant.offer}</h2>
          </div>
        </div>

        {/* Card Description */}
        <div className="desc">
          <h4 className="restaurant-name">{restaurant.name}</h4>
          
          <div className="restaurant-meta">
            <span className="rating-badge">
              <i className="fa-solid fa-star star-icon"></i>
              {restaurant.rating}
            </span>
            <span className="delivery-time-badge">• {restaurant.deliveryTime}</span>
          </div>
          
          <p className="cuisines-text">{restaurant.cuisines.join(', ')}</p>
          <p className="location-text">{restaurant.location}</p>

          {/* Quick Add Menu Overlay */}
          <div className={`quick-add-panel ${showMenuSelect ? 'visible' : ''}`}>
            <div className="quick-add-title">Quick Add Menu</div>
            <div className="quick-add-items">
              {restaurant.menu.map((item) => (
                <div key={item.id} className="menu-item-row">
                  <span className="menu-item-name">{item.name}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={(e) => handleQuickAdd(item, e)}
                  >
                    Add ₹{item.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
