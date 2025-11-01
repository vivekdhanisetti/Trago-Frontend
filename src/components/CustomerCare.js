import React, { useState } from "react";
import "./CustomerCare.css";

const CustomerCare = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    alert("✅ Thank you for contacting us! We’ll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="customer-care-section">
      <div className="contact-container">
        <h2 className="contact-title">📞 Customer Care Support</h2>
        <p className="contact-desc">
          Need help with bookings, cancellations, or travel inquiries?  
          Our support team is here 24/7 to assist you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Describe your issue or feedback..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="contact-btn">
            ✉️ Submit Request
          </button>
        </form>
      </div>

      <div className="support-info">
        <h3>Other Ways to Reach Us</h3>
        <ul>
          <li>📧 Email: support@flyeasy.com</li>
          <li>📞 Toll-Free: 1800-123-4567</li>
          <li>💬 Live Chat: Available 24/7 on our website</li>
        </ul>

        <h3>Office Address</h3>
        <p>
          FlyEasy Pvt. Ltd. <br />
          3rd Floor, Tech Park, Bangalore, India <br />
          PIN: 560001
        </p>
      </div>
    </div>
  );
};

export default CustomerCare;
