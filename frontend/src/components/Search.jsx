import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { restaurantsData } from '../data/restaurants';
import RestaurantCard from './RestaurantCard';

const Search = () => {
  const { searchQuery, setSearchQuery, addToCart } = useCart();

  const popularSuggestions = [
    "Biryani", "Burger", "Pizza", "Noodles", "Dosa", "Desserts", "Shawarma"
  ];

  // 1. Filter restaurants matching the query
  const matchingRestaurants = searchQuery 
    ? restaurantsData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisines.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  // 2. Filter individual dishes matching the query across all restaurant menus
  const matchingDishes = searchQuery
    ? restaurantsData.flatMap(restaurant => 
        restaurant.menu
          .filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(dish => ({ ...dish, restaurantName: restaurant.name }))
      )
    : [];

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  const handleDishAdd = (dish, e) => {
    addToCart(dish, dish.restaurantName);
    
    // Quick success visual feedback
    const btn = e.target;
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.backgroundColor = "var(--star-green)";
    btn.style.color = "white";
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = "white";
      btn.style.color = "var(--star-green)";
    }, 1500);
  };

  return (
    <div className="page-container search-page-container">
      <h2 className="page-title">Search</h2>
      <p className="page-desc">Search for your favorite restaurants, dishes, or cuisines.</p>
      
      {/* Search Input */}
      <div className="page-mock-search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text" 
          placeholder="Search for restaurants and food..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        {searchQuery && (
          <i className="fa-solid fa-xmark clear-search-icon" onClick={() => setSearchQuery("")}></i>
        )}
      </div>

      {/* Popular Suggestions */}
      {!searchQuery && (
        <div className="popular-suggestions-box">
          <h4>Popular Cuisines</h4>
          <div className="suggestion-pills">
            {popularSuggestions.map((suggestion, i) => (
              <span 
                key={i} 
                className="suggestion-pill"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="search-results-wrapper">
          {/* Restaurants Results */}
          {matchingRestaurants.length > 0 && (
            <div className="results-section">
              <h3 className="section-title">Restaurants</h3>
              <br />
              <div className="restaurants-grid-container">
                {matchingRestaurants.map((res) => (
                  <RestaurantCard key={`search-res-${res.id}`} restaurant={res} />
                ))}
              </div>
            </div>
          )}

          {/* Dishes Results */}
          {matchingDishes.length > 0 && (
            <div className="results-section dishes-results">
              <h3 className="section-title">Dishes</h3>
              <br />
              <div className="dishes-results-grid">
                {matchingDishes.map((dish) => (
                  <div key={dish.id} className="dish-search-card">
                    <div className="dish-card-left">
                      <span className="dish-rest-title">{dish.restaurantName}</span>
                      <h4 className="dish-item-name">{dish.name}</h4>
                      <span className="dish-item-price">₹{dish.price}</span>
                    </div>
                    <div className="dish-card-right">
                      <button 
                        className="dish-add-to-cart-btn"
                        onClick={(e) => handleDishAdd(dish, e)}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingRestaurants.length === 0 && matchingDishes.length === 0 && (
            <div className="empty-results">
              <i className="fa-solid fa-face-frown empty-search-face"></i>
              <h4>No results found</h4>
              <p>We couldn't find any restaurant or dish matching "{searchQuery}". Please check your spelling or try another keyword.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
