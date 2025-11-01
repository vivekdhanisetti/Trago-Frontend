import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Trains.css";
import { MOCK_TRAINS } from "./trainData";

const INDIAN_CITIES = [
  "Select Station",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Ahmedabad",
  "Kolkata",
  "Bengaluru",
  "Pune",
  "Jaipur",
];

const Trains = () => {
  const navigate = useNavigate();
  const initialForm = {
    from: "Select Station",
    to: "Select Station",
    date: "",
    passengers: 1,
    class: "Sleeper",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (form.from === "Select Station") errs.from = "Select departure station";
    if (form.to === "Select Station") errs.to = "Select destination station";
    if (!form.date) errs.date = "Select journey date";
    if (form.from !== "Select Station" && form.from === form.to) {
      errs.from = "Departure and destination must be different";
      errs.to = "Departure and destination must be different";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      const filtered = MOCK_TRAINS.filter(
        (t) =>
          t.from.toLowerCase() === form.from.toLowerCase() &&
          t.to.toLowerCase() === form.to.toLowerCase()
      );

      setLoading(false);

      navigate("/train-results", {
        state: {
          results: filtered,
          searchParams: { from: form.from, to: form.to, date: form.date, class: form.class },
        },
      });
    }, 800);
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
  };

  // ✅ New function to navigate to food page
  const handleOrderFood = () => {
    navigate("/train-food");
  };

  return (
    <div className="trains-root">
      <div className="trains-content-overlay">
        <section className="train-search-wrap">
          <div className="train-search-card glass-card">
            <h2 className="train-title">Find Your Perfect Train Journey 🚆</h2>
            <form className="train-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="field">
                  <span className="field-label">From</span>
                  <select name="from" value={form.from} onChange={handleChange}>
                    {INDIAN_CITIES.map((city) => (
                      <option key={city} value={city} disabled={city === "Select Station"}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.from && <small className="field-error">{errors.from}</small>}
                </label>

                <label className="field">
                  <span className="field-label">To</span>
                  <select name="to" value={form.to} onChange={handleChange}>
                    {INDIAN_CITIES.map((city) => (
                      <option key={city} value={city} disabled={city === "Select Station"}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.to && <small className="field-error">{errors.to}</small>}
                </label>

                <label className="field">
                  <span className="field-label">Journey Date</span>
                  <input type="date" name="date" value={form.date} onChange={handleChange} />
                  {errors.date && <small className="field-error">{errors.date}</small>}
                </label>

                <label className="field small">
                  <span className="field-label">Passengers</span>
                  <input type="number" min="1" name="passengers" value={form.passengers} onChange={handleChange} />
                </label>

                <label className="field">
                  <span className="field-label">Class</span>
                  <select name="class" value={form.class} onChange={handleChange}>
                    <option>Sleeper</option>
                    <option>AC 3 Tier</option>
                    <option>AC 2 Tier</option>
                    <option>AC First Class</option>
                    <option>Chair Car</option>
                  </select>
                </label>

                <div className="field actions">
                  <button type="submit" className="primary-btn" disabled={loading}>
                    {loading ? "Searching…" : "Search"}
                  </button>
                  <button type="button" className="link-btn" onClick={handleClear}>
                    Clear
                  </button>

                  {/* ✅ New Order Food button */}
                  <button
                    type="button"
                    className="secondary-btn"
                    style={{ marginLeft: "10px" }}
                    onClick={handleOrderFood}
                  >
                    🍱 Order Food
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Offers Section */}
<section className="train-offers fade-in">
  <h3>🌟 Train Booking Offers</h3>
  <div className="offers-carousel">
    {[
      {
        badge: "20% OFF",
        text: "First Train Booking",
        img: "/images/train1.jpg", // 📸 change names to your actual file names
      },
      {
        badge: "Flat ₹200",
        text: "With SBI Credit Card",
        img: "/images/tsbi.png",
      },
      {
        badge: "50% OFF",
        text: "Festive Rail Sale",
        img: "/images/strain.png",
      },
      {
        badge: "20% OFF",
        text: "Book with Trago",
        img: "/images/trago1.jpg",
      }
    ].map((offer, i) => (
      <div key={i} className="offer-card glass-card">
        <img src={offer.img} alt={offer.text} className="offer-img" />
        <div className="offer-info">
          <div className="offer-badge">{offer.badge}</div>
          <p>{offer.text}</p>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Why Choose Us */}
        <section className="train-why fade-in">
          <h3>🚉 Why Book Trains With Us?</h3>
          <div className="why-grid">
            {[
              "IRCTC Authorized Partner",
              "Secure Payments",
              "Quick Confirmations",
              "24/7 Support",
              "Easy Cancellations",
            ].map((text) => (
              <div key={text} className="why-card glass-card">
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="train-partners fade-in">
          <h3>🤝 Railway Partners</h3>
          <div className="partners-grid">
            {["IRCTC", "South Central Railway", "Northern Railway", "Eastern Railway", "Western Railway"].map(
              (p) => (
                <div key={p} className="partner glass-card">
                  {p}
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Trains;