import React from 'react';
import { restaurantsData } from '../data/restaurants';
import RestaurantCard from './RestaurantCard';

const Offers = () => {
  const promoBanners = [
    { title: "TRYNEW", desc: "60% off up to ₹120 | Use code TRYNEW" },
    { title: "WELCOMEBACK", desc: "Flat ₹100 off on orders above ₹299" },
    { title: "DEALOFTHEDAY", desc: "Extra 15% off at select top brands" }
  ];

  return (
    <div className="page-container offers-page-container">
      <h2 className="page-title">Offers for You</h2>
      <p className="page-desc">Explore pocket-friendly deals, coupon codes, and flat discounts from restaurants near you.</p>

      {/* Promos Row */}
      <div className="promo-coupons-row">
        {promoBanners.map((promo, idx) => (
          <div key={idx} className="promo-card">
            <div className="promo-code-badge">{promo.title}</div>
            <p className="promo-desc">{promo.desc}</p>
          </div>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="restaurants-section">
        <h3 className="section-title">Deals from Top Restaurant Chains</h3>
        <br />
        <div className="restaurants-grid-container">
          {restaurantsData.map((res) => (
            <RestaurantCard key={`offers-grid-${res.id}`} restaurant={res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
