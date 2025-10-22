import React, { useState } from "react";
import "./Travel.css";
import Flights from "./Flights";
import Trains from "./Trains";   
import Hotels from "./Hotels";   
import Buses from "./Buses";  
import Cabs from "./Cabs";   

const Travel = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <>
      {/* Top Banner */}
      <div className="header-banner">
        <h5>Images To Be Placed</h5>
      </div>

      {/* Navbar */}
      <nav className="travel-navbar">
  <h1 className="brand-title">Travel Booking</h1>
  <ul className="nav-links">
    <li><a className="nav-link" href="/offers">Offers</a></li>
    <li><a className="nav-link" href="/customer-care">Customer Care</a></li>
    <li><a className="nav-link" href="/help">Help</a></li>
  </ul>
</nav>


      {/* Booking Options */}
      <div className="booking-card">
        <button
          className={`tab-item ${activeTab === "flights" ? "active" : ""}`}
          onClick={() => setActiveTab("flights")}
        >
          ✈️ Flights
        </button>
        <button
          className={`tab-item ${activeTab === "trains" ? "active" : ""}`}
          onClick={() => setActiveTab("trains")}
        >
          🚆 Trains
        </button>
        <button
          className={`tab-item ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          🏨 Hotels
        </button>
        <button
          className={`tab-item ${activeTab === "buses" ? "active" : ""}`}
          onClick={() => setActiveTab("buses")}
        >
          🚌 Buses
        </button>
        <button
          className={`tab-item ${activeTab === "cabs" ? "active" : ""}`}
          onClick={() => setActiveTab("cabs")}
        >
          🚖 Cabs
        </button>
      </div>

      {/* Render Active Section */}
      <div className="tab-content">
        {activeTab === "flights" && <Flights />}
        {activeTab === "trains" && <Trains />}     {/* ✅ Shows Trains.js */}
        {activeTab === "hotels" && <Hotels />}     {/* ✅ Shows Hotels.js */}
        {activeTab === "buses" && <Buses />}       {/* ✅ Shows Buses.js */}
        {activeTab === "cabs" && (
          <div className="placeholder">🚖 Cab booking form coming soon...</div>
        )}
      </div>
    </>
  );
};

export default Travel;
