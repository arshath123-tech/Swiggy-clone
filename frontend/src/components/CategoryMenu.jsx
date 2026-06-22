import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mindCategories } from '../data/restaurants';
import { useCart } from '../context/CartContext';

const CategoryMenu = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { setSearchQuery } = useCart();

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName);
    navigate('/'); // Route back to storefront

    // Let the home page mount before triggering scroll
    setTimeout(() => {
      const element = document.getElementById('delivery-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="hero-section category-section">
      <div className="category-header">
        <h3 className="section-title">What's on your mind?</h3>
        <div className="scroll-buttons">
          <button className="scroll-btn" onClick={() => handleScroll('left')}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="scroll-btn" onClick={() => handleScroll('right')}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      
      <div className="category-scroll-container" ref={scrollRef}>
        {mindCategories.map((category) => (
          <div 
            key={category.id} 
            className="category-item"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="category-img-wrapper">
              <img src={category.image} alt={category.name} className="category-img" />
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
      <hr className="hr-line" />
    </div>
  );
};

export default CategoryMenu;
