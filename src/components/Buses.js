import React, { useState } from "react";
import "./Buses.css";

/**
 * Buses component
 * - search form (from, to, date)
 * - mock results displayed after search
 * - offers carousel, features, partners grid
 *
 * No external libraries required.
 */
const MOCK_RESULTS = [
  {
    id: 1,
    operator: "Express Travels",
    depart: "08:30",
    arrive: "13:00",
    duration: "4h 30m",
    fare: "₹499",
    rating: 4.2,
    features: ["AC", "Seater", "Water Bottle"],
  },
  {
    id: 2,
    operator: "SuperBus",
    depart: "10:00",
    arrive: "15:20",
    duration: "5h 20m",
    fare: "₹399",
    rating: 4.0,
    features: ["Non-AC", "Seater"],
  },
  {
    id: 3,
    operator: "SafeRide Tours",
    depart: "18:00",
    arrive: "22:45",
    duration: "4h 45m",
    fare: "₹549",
    rating: 4.6,
    features: ["AC", "Sleeper", "WiFi"],
  },
];

const Buses = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
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
    if (!form.from.trim()) errs.from = "Please enter departure station";
    if (!form.to.trim()) errs.to = "Please enter destination station";
    if (!form.date) errs.date = "Please choose a travel date";
    if (form.from && form.to && form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
      errs.to = "Departure and destination must differ";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // simulate search
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      // simple mock: filter by whether operator name contains letter of from/to
      const filtered = MOCK_RESULTS.filter((r) => {
        return (
          r.operator.toLowerCase().includes(form.from.trim().charAt(0).toLowerCase()) ||
          r.operator.toLowerCase().includes(form.to.trim().charAt(0).toLowerCase()) ||
          true // keep results available
        );
      });
      setResults(filtered);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="buses-root">
      {/* Search card */}
      <section className="buses-search-wrap" aria-labelledby="bus-search-heading">
        <h2 id="bus-search-heading" className="sr-only">Search Bus Tickets</h2>
        <div className="buses-search-card">
          <form className="buses-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label className="field">
                <span className="field-label">From</span>
                <input
                  name="from"
                  value={form.from}
                  onChange={handleChange}
                  placeholder="From station or city"
                  aria-invalid={!!errors.from}
                  aria-describedby={errors.from ? "err-from" : undefined}
                />
                {errors.from && <small id="err-from" className="field-error">{errors.from}</small>}
              </label>

              <label className="field">
                <span className="field-label">To</span>
                <input
                  name="to"
                  value={form.to}
                  onChange={handleChange}
                  placeholder="To station or city"
                  aria-invalid={!!errors.to}
                  aria-describedby={errors.to ? "err-to" : undefined}
                />
                {errors.to && <small id="err-to" className="field-error">{errors.to}</small>}
              </label>

              <label className="field">
                <span className="field-label">Travel Date</span>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <small className="field-error">{errors.date}</small>}
              </label>

              <div className="field actions">
                <button type="submit" className="primary-btn" aria-label="Search buses">
                  {loading ? "Searching..." : "Search"}
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    setForm({ from: "", to: "", date: "" });
                    setResults(null);
                    setErrors({});
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>

          <div className="search-hint">
            <div>Fast booking • 350,000+ routes • 4000+ partners</div>
          </div>
        </div>
      </section>

      {/* Offers carousel */}
      <section className="offers-wrap" aria-label="Bus offers">
        <div className="offers-title">
          <h3>Bus Booking Discount Offers</h3>
          <small>Top offers for you</small>
        </div>

        <div className="offers-carousel" role="list">
          <article className="offer-card" role="listitem">
            <div className="offer-badge">15% OFF</div>
            <div className="offer-content">
              <strong>First Bus Booking</strong>
              <p>Use code <span className="code">IX15</span></p>
            </div>
          </article>

          <article className="offer-card" role="listitem">
            <div className="offer-badge big">50% OFF</div>
            <div className="offer-content">
              <strong>Grand Festive Bus Sale</strong>
              <p>Limited time</p>
            </div>
          </article>

          <article className="offer-card" role="listitem">
            <div className="offer-badge">Flat ₹300</div>
            <div className="offer-content">
              <strong>RBL Card Offer</strong>
              <p>On bus bookings</p>
            </div>
          </article>

          <article className="offer-card" role="listitem">
            <div className="offer-badge">Flat ₹150</div>
            <div className="offer-content">
              <strong>AU Card</strong>
              <p>Quick discount</p>
            </div>
          </article>
        </div>
      </section>

      {/* Results / Placeholder */}
      <section className="results-wrap" aria-live="polite">
        <div className="results-header">
          <h3>Available Buses</h3>
          <small>{results ? `${results.length} results` : "Search to see available buses"}</small>
        </div>

        {loading && <div className="loader">Searching available buses…</div>}

        {!loading && results && results.length === 0 && (
          <div className="no-result">No buses found. Try different dates or stations.</div>
        )}

        {!loading && results && results.length > 0 && (
          <ul className="results-list">
            {results.map((r) => (
              <li key={r.id} className="result-card">
                <div className="result-main">
                  <div className="operator">{r.operator}</div>
                  <div className="time">
                    <div className="depart">{r.depart}</div>
                    <div className="duration">{r.duration}</div>
                    <div className="arrive">{r.arrive}</div>
                  </div>
                  <div className="features">
                    {r.features.map((f) => <span key={f} className="pill">{f}</span>)}
                  </div>
                </div>

                <div className="result-side">
                  <div className="fare">{r.fare}</div>
                  <div className="rating">⭐ {r.rating}</div>
                  <button className="book-btn">Book</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Why choose us */}
      <section className="why-wrap">
        <h3>Why choose our Bus Booking?</h3>
        <div className="why-grid">
          <article className="why-card">
            <div className="why-icon">🛣️</div>
            <h4>3,50,000+ Routes</h4>
            <p>Unparalleled choices across private and RTC partners.</p>
          </article>
          <article className="why-card">
            <div className="why-icon">🤝</div>
            <h4>4000+ Partners</h4>
            <p>Trusted operators with verified services.</p>
          </article>
          <article className="why-card">
            <div className="why-icon">⚡</div>
            <h4>Fast Booking</h4>
            <p>Quick and seamless booking experience.</p>
          </article>
          <article className="why-card">
            <div className="why-icon">⏱️</div>
            <h4>24/7 Support</h4>
            <p>Customer care available round the clock.</p>
          </article>
          <article className="why-card">
            <div className="why-icon">🔁</div>
            <h4>Instant Refunds</h4>
            <p>Fast refund processing on cancellations.</p>
          </article>
        </div>
      </section>

      {/* Partners */}
      <section className="partners-wrap" aria-label="State Road Transport Corporations">
        <h3>State Road Transport Corporations</h3>
        <div className="partners-grid">
          {["UPSRTC","HRTC","RSRTC","BSRTC","GSRTC","APSRTC","TSRTC","OSRTC","PRTC"].map((p) => (
            <div key={p} className="partner">
              <div className="logo-circle">{p.slice(0,1)}</div>
              <div className="partner-name">{p}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Buses;
