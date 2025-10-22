import React, { useState } from "react";
import "./Travel.css";
import Hotels from "./Hotels";   
import Buses from "./Buses";  
import Cabs from "./Cabs";    // ✅ Used now

const Travel = () => {
  const [activeTab, setActiveTab] = useState("hotels"); // default active tab

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
        {/* Removed Trains button since Trains is deleted */}
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
        {activeTab === "hotels" && <Hotels />}
        {activeTab === "buses" && <Buses />}
        {activeTab === "cabs" && <Cabs />}
      </div>
    </>
  );
};

export default Travel;
