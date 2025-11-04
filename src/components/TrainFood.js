import React, { useState } from "react";
import "./TrainFood.css";

const STATIONS = ["Select Station", "Hyderabad", "Delhi", "Mumbai"];

const TrainFood = () => {
  const [station, setStation] = useState("Select Station");
  const [pnr, setPnr] = useState("");
  const [showApps, setShowApps] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!pnr.trim()) {
      setError("Please enter your PNR number");
      setShowApps(false);
      return;
    }
    if (station === "Select Station") {
      setError("Please select a station");
      setShowApps(false);
      return;
    }
    setError("");
    setShowApps(true);
  };

  return (
    <div className="food-page">
      <div className="food-container">
        {/* ---------- Header ---------- */}
        <div className="food-header glass-card">
          <h2>🍱 Train Food Delivery</h2>
          <p>Order freshly prepared food delivered right to your seat!</p>
        </div>

        {/* ---------- Form ---------- */}
        <div className="food-form glass-card">
          <label>
            <span>PNR Number:</span>
            <input
              type="text"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              placeholder="Enter 10-digit PNR"
              maxLength="10"
            />
          </label>

          <label>
            <span>Select Station:</span>
            <select value={station} onChange={(e) => setStation(e.target.value)}>
              {STATIONS.map((s) => (
                <option key={s} value={s} disabled={s === "Select Station"}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <button className="primary-btn same-size" onClick={handleSearch}>
            Search
          </button>

          {error && <p className="error-text">{error}</p>}
        </div>

        {/* ---------- Food Delivery Partners ---------- */}
        {showApps && !error && (
          <div className="food-results">
            <h3 className="app-heading">Available Food Delivery Partners</h3>
            <div className="food-grid">
              {/* Swiggy */}
              <div className="food-card glass-card">
                <img src="/images/swiggy.jpg" alt="Swiggy" className="food-img" />
                <h4>Swiggy</h4>
                <p>Delicious food delivered fast</p>
                <button
                  className="primary-btn"
                  onClick={() => window.open("https://www.swiggy.com", "_blank")}
                >
                  Order via Swiggy
                </button>
              </div>

              {/* Zomato */}
              <div className="food-card glass-card">
                <img src="/images/zom.jpg" alt="Zomato" className="food-img" />
                <h4>Zomato</h4>
                <p>Order from top restaurants nearby</p>
                <button
                  className="primary-btn"
                  onClick={() => window.open("https://www.zomato.com", "_blank")}
                >
                  Order via Zomato
                </button>
              </div>

              {/* EatSure */}
              <div className="food-card glass-card">
                <img src="/images/eatsure.jpg" alt="EatSure" className="food-img" />
                <h4>EatSure</h4>
                <p>Wholesome, hygienic meals curated for travel</p>
                <button
                  className="primary-btn"
                  onClick={() => window.open("https://www.eatsure.com", "_blank")}
                >
                  Order via EatSure
                </button>
              </div>

              {/* IRCTC eCatering */}
              <div className="food-card glass-card">
                <img
                  src="/images/ecat.png"
                  alt="IRCTC eCatering"
                  className="food-img"
                />
                <h4>IRCTC eCatering</h4>
                <p>Official Indian Railways meal delivery service</p>
                <button
                  className="primary-btn"
                  onClick={() =>
                    window.open("https://www.ecatering.irctc.co.in", "_blank")
                  }
                >
                  Order via IRCTC
                </button>
              </div>

              {/* EatClub */}
              <div className="food-card glass-card">
                <img src="/images/eatclub.png" alt="EatClub" className="food-img" />
                <h4>EatClub</h4>
                <p>Restaurant-style food with exciting offers</p>
                <button
                  className="primary-btn"
                  onClick={() => window.open("https://eatclub.in", "_blank")}
                >
                  Order via EatClub
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Default Text ---------- */}
        {!showApps && !error && (
          <p className="no-results">
            Enter your PNR and select a station to view meal options.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrainFood;
