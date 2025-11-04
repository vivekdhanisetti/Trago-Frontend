import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const generateSeats = (numRows, seatsPerRow) => {
  const seats = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < seatsPerRow; j++) {
      const seatNumber = `${String.fromCharCode(65 + i)}${j + 1}`;
      seats.push({
        id: seatNumber,
        number: seatNumber,
        isBooked: Math.random() < 0.2,
      });
    }
  }
  return seats;
};

const TrainBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, searchParams } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("");
  const [passengerDetails, setPassengerDetails] = useState([]);

  useEffect(() => {
    if (!train) {
      navigate("/trains");
      return;
    }
    setAvailableSeats(generateSeats(5, 4));
  }, [train, navigate]);

  useEffect(() => {
    calculateTotalPrice();
    setPassengerDetails(
      selectedSeats.map((seat, index) => passengerDetails[index] || { name: "", age: "", gender: "" })
    );
  }, [selectedSeats]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const calculateTotalPrice = () => {
    if (!train || selectedSeats.length === 0) {
      setTotalPrice(0);
      return;
    }
    const cleaned = train.price.replace(/[^\d.]/g, "");
    const perSeat = parseFloat(cleaned);
    if (isNaN(perSeat)) return setTotalPrice(0);
    setTotalPrice(selectedSeats.length * perSeat);
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      setBookingStatus("Please select at least one seat.");
      return;
    }

    for (let i = 0; i < passengerDetails.length; i++) {
      const { name, age, gender } = passengerDetails[i];
      if (!name || !age || !gender) {
        setBookingStatus(`Please fill all details for passenger ${i + 1}.`);
        return;
      }
    }

    setBookingStatus("Redirecting to payment gateway...");
    // ✅ Send temporary booking data to next page (no DB call yet)
const bookingData = {
  trainName: train.name,
  source: searchParams.from,
  destination: searchParams.to,
  departureDate: searchParams.date,
  classType: searchParams.class,
  ticketCount: selectedSeats.length,
  totalFare: totalPrice,
  passengers: passengerDetails, // extra info if needed later
};

    navigate("/bank-transition", {
      state: { train, searchParams, selectedSeats, totalPrice, passengerDetails },
    });
  };

  if (!train)
    return <p style={{ textAlign: "center" }}>Loading train details...</p>;

  const currencySymbolMatch = train.price.match(/^[^\d.]+/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : "₹";

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(to bottom right, #eef6ff, #eafaf1);
            font-family: 'Poppins', sans-serif;
          }
          .trainbook-root {
            padding: 30px;
            max-width: 950px;
            margin: 40px auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          }
          .header-title {
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #1e3a8a;
          }
          .seat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
          }
          .seat-button {
            padding: 10px;
            border-radius: 8px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: 0.3s;
          }
          .seat-booked {
            background: #fecaca;
            color: #991b1b;
            cursor: not-allowed;
          }
          .seat-selected {
            background: #34d399;
            color: white;
            transform: scale(1.05);
          }
          .seat-available {
            background: #93c5fd;
            color: #1e40af;
          }
          .offers-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 15px;
            margin: 25px 0;
          }
          .offer-card {
            background: linear-gradient(to right, #e0f2fe, #fce7f3);
            border-radius: 12px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: 0.3s;
          }
          .offer-card:hover {
            transform: translateY(-5px);
          }
          .offer-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #1d4ed8;
          }
          .offer-sub {
            font-size: 0.9rem;
            color: #4b5563;
          }
          .passenger-card {
            background: #eef2ff;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 15px;
          }
          .passenger-card h5 {
            color: #4338ca;
            margin-bottom: 10px;
          }
          .passenger-input {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #c7d2fe;
            border-radius: 6px;
            font-size: 0.95rem;
          }
          .payment-button {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 15px;
            width: 100%;
            border-radius: 8px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: 0.3s;
          }
          .payment-button:hover {
            background: #4338ca;
          }
          .status-message {
            text-align: center;
            padding: 10px;
            font-weight: 600;
            color: #b91c1c;
          }
        `}
      </style>

      <div className="trainbook-root">
        <h2 className="header-title">Book Your Train Journey</h2>

        {/* 🌟 Offers Section */}
        <div className="offers-section">
          <div className="offer-card">
            <p className="offer-title">First Train Booking</p>
            <p className="offer-sub">With SBI Credit Card</p>
            <h3>Flat ₹200 OFF</h3>
          </div>
          <div className="offer-card">
            <p className="offer-title">Festive Rail Sale</p>
            <p className="offer-sub">Limited Time Offer</p>
            <h3>50% OFF</h3>
          </div>
          <div className="offer-card">
            <p className="offer-title">Smart Saver Deal</p>
            <p className="offer-sub">With Axis Bank Card</p>
            <h3>Get ₹150 Cashback</h3>
          </div>
        </div>

        <div className="seat-grid">
          {availableSeats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => !seat.isBooked && toggleSeatSelection(seat.id)}
              className={`seat-button ${
                seat.isBooked
                  ? "seat-booked"
                  : selectedSeats.includes(seat.id)
                  ? "seat-selected"
                  : "seat-available"
              }`}
              disabled={seat.isBooked}
            >
              {seat.number}
            </button>
          ))}
        </div>

        {selectedSeats.length > 0 && (
          <>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "10px", color: "#1e3a8a" }}>
              Passenger Details
            </h4>
            {selectedSeats.map((seat, i) => (
              <div key={seat} className="passenger-card">
                <h5>Seat {seat}</h5>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="passenger-input"
                  value={passengerDetails[i]?.name || ""}
                  onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Age"
                  className="passenger-input"
                  value={passengerDetails[i]?.age || ""}
                  onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
                />
                <select
                  className="passenger-input"
                  value={passengerDetails[i]?.gender || ""}
                  onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            ))}
          </>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p><b>Seats Selected:</b> {selectedSeats.join(", ") || "None"}</p>
          <p><b>Total Price:</b> {currencySymbol}{totalPrice.toFixed(2)}</p>
        </div>

        {bookingStatus && <p className="status-message">{bookingStatus}</p>}

        <button
          onClick={handleProceedToPayment}
          className="payment-button"
          disabled={selectedSeats.length === 0}
        >
          Proceed to Payment
        </button>
      </div>
    </>
  );
};

export default TrainBook;
