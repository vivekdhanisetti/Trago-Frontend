import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingConfirm.css";

const BookingConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bus, selectedSeats, passengers } = state;

  const handlePrint = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const bookingData = {
        bus_id: bus.id,
        operator: bus.operator,
        from: bus.from,
        to: bus.to,
        date: bus.date,
        seats: selectedSeats,
        passengers: passengers,
        totalFare: selectedSeats.length * bus.fare,
        user_id: user.id,
        email: user.email,
        name: user.name,
      };

      await axios.post("http://localhost:8080/api/bookings", bookingData);

      navigate("/ticket", { state: { bus, selectedSeats, passengers } });
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="confirm-page">
      <div className="confirm-card">
        <h2>Booking Confirmation</h2>
        <p>
          Bus Operator: <strong>{bus.operator}</strong>
        </p>
        <p>
          Route: <strong>{bus.from} → {bus.to}</strong>
        </p>
        <p>
          Date: <strong>{bus.date}</strong>
        </p>
        <p>
          Seats: <strong>{selectedSeats.join(", ")}</strong>
        </p>
        <p>
          Total Fare: <strong>₹{selectedSeats.length * bus.fare}</strong>
        </p>

        <h3>Passenger Details</h3>
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((p, idx) => (
              <tr key={idx}>
                <td>{selectedSeats[idx]}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
                <td>{p.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="print-btn" onClick={handlePrint}>
          Confirm & Print Ticket
        </button>
      </div>
    </div>
  );
};

export default BookingConfirm;
