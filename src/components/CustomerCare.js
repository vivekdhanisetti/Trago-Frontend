import React from "react";
import "./CustomerCare.css";

const CustomerCare = () => {
  const contacts = [
    { title: "✈️ Flights", phone: "1800-111-222", email: "flights@support.com" },
    { title: "🚆 Trains", phone: "1800-333-444", email: "trains@support.com" },
    { title: "🚌 Buses", phone: "1800-555-666", email: "buses@support.com" },
    { title: "🏨 Hotels", phone: "1800-777-888", email: "hotels@support.com" },
    { title: "🚖 Cabs", phone: "1800-999-000", email: "cabs@support.com" },
  ];

  const faqs = [
    { q: "How do I cancel my booking?", a: "Go to My Bookings → Select Booking → Cancel." },
    { q: "How do I get a refund?", a: "Refunds are processed within 5–7 business days." },
    { q: "How to contact support?", a: "Call our 24x7 helpline or email us." },
  ];

  return (
    <div className="customer-care-page">
      {/* Banner */}
      <div className="cc-banner">
        <h1>📞 Customer Care</h1>
        <p>We’re here to help you 24x7</p>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Helpline Numbers</h2>
        <div className="contact-cards">
          {contacts.map((item, index) => (
            <div key={index} className="contact-card">
              <h3>{item.title}</h3>
              <p>📞 {item.phone}</p>
              <p>📧 {item.email}</p>
              <button
                className="call-btn"
                onClick={() => (window.location.href = `tel:${item.phone}`)}
              >
                Call Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Chat */}
      <div className="chat-section">
        <h2>💬 Need More Help?</h2>
        <button
          className="chat-btn"
          onClick={() => alert("Live chat coming soon!")}
        >
          Start Live Chat
        </button>
      </div>
    </div>
  );
};

export default CustomerCare;
