import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LiveTracking = () => {
  const busPosition = [17.3850, 78.4867]; // Example: Hyderabad

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>Live Bus Tracking</h2>
      <MapContainer center={busPosition} zoom={13} style={{ height: "90%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={busPosition}>
          <Popup>Bus is here 🚌</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
