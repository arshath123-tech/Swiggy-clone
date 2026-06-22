import React, { useState } from 'react';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    company: false,
    contact: false,
    legal: false,
    cities: false,
    life: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="footer-wrapper">
      {/* App Download Banner */}
      <div className="footer-app-banner">
        <h2>For Better Experience, Download The App Now</h2>
        <div className="app-badges">
          <img src="/asset/image/google_play.avif" alt="Google Play" />
          <img src="/asset/image/app_store.avif" alt="App Store" />
        </div>
      </div>
      
      <hr className="footer-divider" />

      {/* Main Footer Links */}
      <div className="footer-columns-container">
        {/* Brand Column */}
        <div className="footer-column brand-col">
          <img src="/asset/image/logo.png" alt="Swiggy" className="footer-logo" />
          <p>© 2026 Swiggy Limited</p>
        </div>

        {/* Company Links */}
        <div className={`footer-column ${openSections.company ? 'mobile-open' : ''}`}>
          <h3 onClick={() => toggleSection('company')}>
            Company
            <i className="fa-solid fa-chevron-down mobile-toggle-arrow"></i>
          </h3>
          <ul className="footer-links-list">
            <li>About Us</li>
            <li>Swiggy Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swiggy One</li>
            <li>Swiggy Instamart</li>
            <li>Swiggy Dineout</li>
            <li>Swiggy Genie</li>
            <li>Minis</li>
          </ul>
        </div>

        {/* Contact & Legal Combined for Mobile Layout Convenience */}
        <div className="footer-column-group">
          {/* Contact */}
          <div className={`footer-column ${openSections.contact ? 'mobile-open' : ''}`}>
            <h3 onClick={() => toggleSection('contact')}>
              Contact Us
              <i className="fa-solid fa-chevron-down mobile-toggle-arrow"></i>
            </h3>
            <ul className="footer-links-list">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>

          {/* Legal */}
          <div className={`footer-column ${openSections.legal ? 'mobile-open' : ''}`}>
            <h3 onClick={() => toggleSection('legal')}>
              Legal
              <i className="fa-solid fa-chevron-down mobile-toggle-arrow"></i>
            </h3>
            <ul className="footer-links-list">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
            </ul>
          </div>
        </div>

        {/* Cities Column */}
        <div className={`footer-column ${openSections.cities ? 'mobile-open' : ''}`}>
          <h3 onClick={() => toggleSection('cities')}>
            Available in:
            <i className="fa-solid fa-chevron-down mobile-toggle-arrow"></i>
          </h3>
          <ul className="footer-links-list">
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Chennai</li>
          </ul>
        </div>

        {/* Life at Swiggy & Social */}
        <div className="footer-column-group-end">
          <div className={`footer-column ${openSections.life ? 'mobile-open' : ''}`}>
            <h3 onClick={() => toggleSection('life')}>
              Life at Swiggy
              <i className="fa-solid fa-chevron-down mobile-toggle-arrow"></i>
            </h3>
            <ul className="footer-links-list">
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackable</li>
            </ul>
          </div>

          <div className="footer-column social-col">
            <h3>Social links</h3>
            <ul className="social-links-list">
              <li><i className="fa-brands fa-instagram"></i></li>
              <li><i className="fa-brands fa-linkedin"></i></li>
              <li><i className="fa-brands fa-facebook-f"></i></li>
              <li><i className="fa-brands fa-pinterest"></i></li>
              <li><i className="fa-brands fa-twitter"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
