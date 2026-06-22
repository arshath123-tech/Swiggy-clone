import React from 'react';
import { useCart } from '../context/CartContext';
import { restaurantsData } from '../data/restaurants';
import CategoryMenu from './CategoryMenu';
import FilterBar from './FilterBar';
import RestaurantCard from './RestaurantCard';

const Home = () => {
  const { searchQuery, activeFilters } = useCart();

  // Filter restaurants based on query and active filter states
  const filteredRestaurants = restaurantsData.filter((restaurant) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = restaurant.name.toLowerCase().includes(query);
      const matchesCuisine = restaurant.cuisines.some((c) =>
        c.toLowerCase().includes(query)
      );
      if (!matchesName && !matchesCuisine) return false;
    }

    if (activeFilters.rating4 && restaurant.rating < 4.0) return false;
    if (activeFilters.foodIn10Min && !restaurant.foodIn10Min) return false;

    if (activeFilters.offers) {
      const hasBigOffer = restaurant.offer.includes('150') || restaurant.offer.includes('50%') || restaurant.offer.includes('20%');
      if (!hasBigOffer) return false;
    }

    if (activeFilters.range300to600) {
      if (restaurant.costForTwo < 300 || restaurant.costForTwo > 600) return false;
    }

    if (activeFilters.lessThan300 && restaurant.costForTwo >= 300) return false;
    if (activeFilters.pureVeg && !restaurant.isVeg) return false;
    if (activeFilters.nonVeg && restaurant.isVeg) return false;

    return true;
  });

  const topChains = restaurantsData.filter(r => r.rating >= 4.3).slice(0, 4);

  return (
    <div className="home-page-container">
      {/* Category Menu: "What's on your mind?" */}
      <CategoryMenu />

      {/* Top Restaurant Chains Slider Row */}
      {!searchQuery && (
        <div className="restaurants-section">
          <h3 className="section-title">Top Restaurant chains in Chennai</h3>
          <div className="restaurants-grid-container">
            {topChains.map((restaurant) => (
              <RestaurantCard key={`top-${restaurant.id}`} restaurant={restaurant} />
            ))}
          </div>
          <hr className="hr-line" />
        </div>
      )}

      {/* Main Delivery Grid */}
      <div className="restaurants-section" id="delivery-section">
        <h3 className="section-title">
          {searchQuery 
            ? `Search results for "${searchQuery}"`
            : "Restaurants with online food delivery in Chennai"
          }
        </h3>
        
        <FilterBar />

        {filteredRestaurants.length > 0 ? (
          <div className="restaurants-grid-container">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={`grid-${restaurant.id}`} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="empty-results-box" style={{ padding: '40px 0', textAlign: 'center' }}>
            <i className="fa-solid fa-circle-info" style={{ fontSize: '32px', color: 'var(--text-light)', marginBottom: '12px' }}></i>
            <h4>No restaurants match your filters</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Try resetting filters or searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
