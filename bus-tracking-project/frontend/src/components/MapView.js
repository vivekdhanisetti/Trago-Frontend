import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
  iconSize: [38, 38],
});

const socket = io("http://localhost:5000"); // backend socket server

const MapView = () => {
  const [busLocation, setBusLocation] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      console.log("📡 Received update:", data);
      setBusLocation({ lat: data.lat, lng: data.lng });
    });

    return () => socket.off("locationUpdate");
  }, []);

  return (
    <MapContainer
      center={[busLocation.lat, busLocation.lng]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[busLocation.lat, busLocation.lng]} icon={busIcon}>
        <Popup>🚌 Bus is here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
