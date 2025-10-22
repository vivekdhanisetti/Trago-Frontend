import React, { useState } from "react";
import "./Trains.css";

const MOCK_TRAINS = [
  {
    id: 1,
    name: "Shatabdi Express",
    number: "12009",
    from: "Mumbai",
    to: "Ahmedabad",
    departure: "06:30",
    arrival: "12:45",
    duration: "6h 15m",
    price: "₹850",
    class: "AC Chair Car",
  },
  {
    id: 2,
    name: "Rajdhani Express",
    number: "12951",
    from: "Delhi",
    to: "Mumbai",
    departure: "16:30",
    arrival: "08:00",
    duration: "15h 30m",
    price: "₹2,450",
    class: "AC 2 Tier",
  },
  {
    id: 3,
    name: "Duronto Express",
    number: "12245",
    from: "Hyderabad",
    to: "Chennai",
    departure: "22:30",
    arrival: "06:00",
    duration: "7h 30m",
    price: "₹1,050",
    class: "Sleeper / AC 3 Tier",
  },
];

const Trains = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    class: "Sleeper",
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.from.trim()) errs.from = "Enter departure station";
    if (!form.to.trim()) errs.to = "Enter destination station";
    if (!form.date) errs.date = "Select journey date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      const filtered = MOCK_TRAINS.filter(
        (t) =>
          t.from.toLowerCase().includes(form.from.toLowerCase()) &&
          t.to.toLowerCase().includes(form.to.toLowerCase())
      );
      setResults(filtered.length ? filtered : MOCK_TRAINS);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="trains-root">
      {/* Search */}
      <section className="train-search-wrap">
        <div className="train-search-card">
          <form className="train-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="field">
                <span className="field-label">From</span>
                <input
                  name="from"
                  placeholder="Enter departure station"
                  value={form.from}
                  onChange={handleChange}
                />
                {errors.from && <small className="field-error">{errors.from}</small>}
              </label>

              <label className="field">
                <span className="field-label">To</span>
                <input
                  name="to"
                  placeholder="Enter destination station"
                  value={form.to}
                  onChange={handleChange}
                />
                {errors.to && <small className="field-error">{errors.to}</small>}
              </label>

              <label className="field">
                <span className="field-label">Journey Date</span>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && <small className="field-error">{errors.date}</small>}
              </label>

              <label className="field small">
                <span className="field-label">Passengers</span>
                <input
                  type="number"
                  min="1"
                  name="passengers"
                  value={form.passengers}
                  onChange={handleChange}
                />
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
                <button type="submit" className="primary-btn">
                  {loading ? "Searching…" : "Search"}
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setForm({ from: "", to: "", date: "", passengers: 1, class: "Sleeper" });
                    setResults(null);
                    setErrors({});
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Offers */}
      <section className="train-offers">
        <h3>Train Booking Offers</h3>
        <div className="offers-carousel">
          <div className="offer-card">
            <div className="offer-badge">20% OFF</div>
            <p>First Train Booking</p>
          </div>
          <div className="offer-card">
            <div className="offer-badge">Flat ₹200</div>
            <p>With SBI Credit Card</p>
          </div>
          <div className="offer-card">
            <div className="offer-badge">50% OFF</div>
            <p>Festive Rail Sale</p>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="train-results">
        <h3>Available Trains</h3>
        {loading && <div className="loader">Searching trains…</div>}

        {!loading && results && (
          <div className="results-grid">
            {results.map((t) => (
              <div key={t.id} className="train-card">
                <div className="train-header">
                  <h4>{t.name}</h4>
                  <span className="number">#{t.number}</span>
                </div>
                <div className="train-route">
                  <span>{t.from}</span> ➝ <span>{t.to}</span>
                </div>
                <div className="train-time">
                  <span>Dep: {t.departure}</span>
                  <span>Arr: {t.arrival}</span>
                  <span>{t.duration}</span>
                </div>
                <div className="train-footer">
                  <span className="class">{t.class}</span>
                  <span className="price">{t.price}</span>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="train-why">
        <h3>Why Book Trains With Us?</h3>
        <div className="why-grid">
          <div className="why-card">🚆 IRCTC Authorized Partner</div>
          <div className="why-card">💳 Secure Payments</div>
          <div className="why-card">⚡ Quick Confirmations</div>
          <div className="why-card">📞 24/7 Support</div>
          <div className="why-card">🔁 Easy Cancellations</div>
        </div>
      </section>

      {/* Partners */}
      <section className="train-partners">
        <h3>Railway Partners</h3>
        <div className="partners-grid">
          {["IRCTC", "South Central Railway", "Northern Railway", "Eastern Railway", "Western Railway"].map((p) => (
            <div key={p} className="partner">{p}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Trains;
