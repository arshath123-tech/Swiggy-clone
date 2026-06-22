import React from 'react';
import { useCart } from '../context/CartContext';

const FilterBar = () => {
  const { activeFilters, toggleFilter, resetFilters } = useCart();

  const filterItems = [
    { key: 'foodIn10Min', label: 'Food in 10 Min' },
    { key: 'offers', label: 'Offers' },
    { key: 'rating4', label: 'Rating 4.0+' },
    { key: 'range300to600', label: 'Rs. 300 - Rs. 600' },
    { key: 'lessThan300', label: 'Less Than Rs.300' },
    { key: 'pureVeg', label: 'Pure Veg' },
    { key: 'nonVeg', label: 'Non Veg' },
  ];

  const hasActiveFilters = Object.values(activeFilters).some(value => value === true);

  return (
    <div className="filter-container">
      <div className="filter-header-row">
        <div className="filter-static">
          <span>Filter</span>
          <i className="fa-solid fa-sliders"></i>
        </div>
        
        <ul className="filter-list">
          {filterItems.map((item) => {
            const isActive = activeFilters[item.key];
            return (
              <li 
                key={item.key} 
                className={`filter-item ${isActive ? 'active-filter' : ''}`}
                onClick={() => toggleFilter(item.key)}
              >
                {item.label}
                {isActive && <i className="fa-solid fa-xmark filter-clear-icon"></i>}
              </li>
            );
          })}
        </ul>

        {hasActiveFilters && (
          <button className="clear-all-filters-btn" onClick={resetFilters}>
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
