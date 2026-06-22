import React, { useState } from 'react';

const Corporate = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    teamSize: '10-50',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        teamSize: '10-50',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="corporate-container">
      {/* Hero Header Banner */}
      <div className="corporate-hero">
        <div className="corp-hero-overlay">
          <h1>Swiggy Corporate</h1>
          <p>Elevate your workspace with customized corporate food solutions, team meals, and event catering.</p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="corporate-benefits">
        <h2 className="corp-section-title">What We Offer</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fa-solid fa-mug-hot"></i>
            </div>
            <h3>Daily Team Lunches</h3>
            <p>Treat your employees to curated, nutritious daily meals delivered directly to your office. Flexible subscription plans available.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fa-solid fa-champagne-glasses"></i>
            </div>
            <h3>Events & Catering</h3>
            <p>Organize seamless corporate events, meetings, or festive celebrations with premium catering options from top-tier local restaurants.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon">
              <i className="fa-solid fa-gift"></i>
            </div>
            <h3>Corporate Gifting</h3>
            <p>Reward your teams, clients, and partners with personalized Swiggy Gift Cards and food vouchers to celebrate milestones.</p>
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div className="corporate-inquiry">
        <div className="inquiry-info">
          <h2>Partner with Swiggy Corporate</h2>
          <p>Fill out the form and our Corporate Relations manager will reach out within 24 hours to design a customized plan for your company.</p>
          <div className="contact-details">
            <div className="contact-item">
              <i className="fa-solid fa-envelope"></i>
              <span>corporate-support@swiggy.com</span>
            </div>
            <div className="contact-item">
              <i className="fa-solid fa-phone"></i>
              <span>1800-419-5432 (Toll Free)</span>
            </div>
          </div>
        </div>

        <div className="inquiry-form-card">
          {isSubmitted ? (
            <div className="inquiry-success-view">
              <i className="fa-solid fa-circle-check success-check-icon"></i>
              <h3>Request Submitted!</h3>
              <p>Thank you for reaching out. A corporate representative will email or call you shortly.</p>
              <button className="reset-form-btn" onClick={() => setIsSubmitted(false)}>
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="corp-form">
              <h3>Get a Free Quote</h3>
              
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company Name *</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="teamSize">Estimated Team Size</label>
                <select 
                  id="teamSize" 
                  name="teamSize" 
                  value={formData.teamSize}
                  onChange={handleChange}
                >
                  <option value="10-50">10 - 50 Employees</option>
                  <option value="50-200">50 - 200 Employees</option>
                  <option value="200-500">200 - 500 Employees</option>
                  <option value="500+">500+ Employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Requirement Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your needs..."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="corp-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner-small"></span> Submitting...
                  </>
                ) : "Contact Sales"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Corporate;
