import React, { useState } from 'react';

const faqData = [
  {
    category: 'general',
    question: 'Can I edit my delivery address after placing an order?',
    answer: 'Once an order is placed, the address cannot be changed directly via the app. Please chat with our Support Executive immediately, and they will coordinate with the delivery partner if the order has not been dispatched yet.'
  },
  {
    category: 'general',
    question: 'What are the customer support hours?',
    answer: 'Our customer support operates 24/7. You can reach out to us at any time using the live chat support tool or by calling our helpline.'
  },
  {
    category: 'general',
    question: 'Can I schedule orders in advance?',
    answer: 'Yes, select restaurants support preorder scheduling. During checkout, look for the "Schedule Order" option to select your preferred delivery window.'
  },
  {
    category: 'refund',
    question: 'How do I claim a refund for my cancelled order?',
    answer: 'Refunds for orders cancelled by the restaurant or due to delivery issues are initiated automatically. For UPI/Net banking payments, the refund takes 3-5 business days to reflect in your account. Card refunds can take up to 7-10 business days.'
  },
  {
    category: 'refund',
    question: 'Can I cancel my order for a full refund?',
    answer: 'Orders can only be cancelled with a full refund within 60 seconds of placing them. After 60 seconds, a cancellation fee of 100% will apply since the restaurant starts preparing the fresh ingredients.'
  },
  {
    category: 'partner',
    question: 'How can I register my restaurant on Swiggy?',
    answer: 'To partner with us, head over to the Swiggy Partner Portal (partner.swiggy.com) and click "Register Your Restaurant". You will need your FSSAI license, GST registration details, and bank statements.'
  },
  {
    category: 'partner',
    question: 'What are the charges for restaurant partnerships?',
    answer: 'Registration is free. Swiggy charges a nominal commission fee on each order processed through the platform. Detailed slab rates will be shared during document verification.'
  }
];

const Help = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Filter FAQs based on active tab and search query
  const filteredFaqs = faqData.filter(faq => {
    const matchesTab = faq.category === activeTab;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (searchQuery) {
      return matchesSearch; // Ignore tab restrictions during active search
    }
    return matchesTab;
  });

  return (
    <div className="help-container">
      {/* Search Header */}
      <div className="help-header">
        <h1>Help & Support</h1>
        <p>Let's resolve your queries. Search FAQs or contact our support team.</p>
        <div className="help-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search for questions, keywords, refunds..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <i className="fa-solid fa-xmark clear-faq-search" onClick={() => setSearchQuery('')}></i>
          )}
        </div>
      </div>

      {/* Main Support Layout */}
      <div className="help-content-wrapper">
        {/* Sidebar Tabs */}
        {!searchQuery && (
          <div className="help-tabs-sidebar">
            <button 
              className={`help-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => { setActiveTab('general'); setExpandedFaq(null); }}
            >
              <i className="fa-solid fa-circle-question"></i>
              <span>General Queries</span>
            </button>
            <button 
              className={`help-tab-btn ${activeTab === 'refund' ? 'active' : ''}`}
              onClick={() => { setActiveTab('refund'); setExpandedFaq(null); }}
            >
              <i className="fa-solid fa-receipt"></i>
              <span>Payments & Refunds</span>
            </button>
            <button 
              className={`help-tab-btn ${activeTab === 'partner' ? 'active' : ''}`}
              onClick={() => { setActiveTab('partner'); setExpandedFaq(null); }}
            >
              <i className="fa-solid fa-handshake"></i>
              <span>Partner Support</span>
            </button>
          </div>
        )}

        {/* FAQs List Accordion */}
        <div className="help-faqs-accordion">
          <h2>
            {searchQuery 
              ? `Search Results for "${searchQuery}"`
              : activeTab === 'general' ? 'General Queries' : activeTab === 'refund' ? 'Payments & Refunds' : 'Partner Support'
            }
          </h2>

          {filteredFaqs.length > 0 ? (
            <div className="faq-list">
              {filteredFaqs.map((faq, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div key={index} className={`faq-card ${isExpanded ? 'open' : ''}`}>
                    <div className="faq-question-header" onClick={() => toggleFaq(index)}>
                      <h4>{faq.question}</h4>
                      <i className="fa-solid fa-angle-down faq-arrow"></i>
                    </div>
                    <div className="faq-answer-body">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="faq-empty-state">
              <i className="fa-solid fa-face-frown"></i>
              <h3>No matching FAQs found</h3>
              <p>Try searching using different terms, or write to our support desk.</p>
            </div>
          )}

          {/* Quick Contact Info */}
          <div className="help-quick-contact">
            <h3>Still need help?</h3>
            <div className="contact-buttons-row">
              <button className="support-btn chat-btn" onClick={() => alert("Connecting you with our support chatbot...")}>
                <i className="fa-solid fa-comments"></i> Chat With Support
              </button>
              <button className="support-btn call-btn" onClick={() => alert("Calling Helpline at 1-800-SWIGGY-HELP...")}>
                <i className="fa-solid fa-phone"></i> Call helpline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
