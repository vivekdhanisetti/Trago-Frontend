import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./BankTransition.css";
import axios from "axios";

const BankTransition = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safe destructuring with default values
  const {
    train,
    selectedSeats = [],
    totalPrice = 0,
    searchParams = {},
    passengerDetails = [],
  } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardError, setCardError] = useState("");

  const [vpnKey, setVpnKey] = useState("");
  const [vpnError, setVpnError] = useState("");

  const [secureConnection, setSecureConnection] = useState(false);
  const timerRef = useRef(null);

  // ✅ Generate PDF Receipt
  const generateReceipt = (method) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("🚆 KL Railway Booking Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Train: ${train?.name || "N/A"} (${train?.number || "N/A"})`, 20, 40);
    doc.text(`From: ${searchParams?.from || "N/A"}  →  To: ${searchParams?.to || "N/A"}`, 20, 50);
    doc.text(`Seats: ${selectedSeats?.join(", ") || "N/A"}`, 20, 60);
    doc.text(`Payment Method: ${method}`, 20, 70);
    doc.text(`Total Amount: ₹${totalPrice?.toFixed(2)}`, 20, 80);
    doc.text(`Transaction Date: ${date}`, 20, 90);

    let y = 110;
    doc.text("Passenger Details:", 20, y);
    passengerDetails.forEach((p, i) => {
      y += 10;
      doc.text(`${i + 1}. ${p.name || "N/A"} | Age: ${p.age || "N/A"} | Gender: ${p.gender || "N/A"}`, 25, y);
    });

    y += 20;
    doc.text("✅ Payment Successful!", 20, y);
    doc.save("TrainBooking_Receipt.pdf");
  };

  // ✅ Handle Payment Success
  const handlePaymentSuccess = (method) => {
    setCardError("");
    setVpnError("");
    let isValid = true;

    if (method === "Credit Card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
        setCardError("Enter a valid 16-digit card number.");
        isValid = false;
      }
      if (!cardExpiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        setCardError((prev) => (prev ? prev + " Invalid expiry (MM/YY)." : "Invalid expiry (MM/YY)."));
        isValid = false;
      }
      if (!cardCVV || !/^\d{3,4}$/.test(cardCVV)) {
        setCardError((prev) => (prev ? prev + " Invalid CVV." : "Invalid CVV."));
        isValid = false;
      }
    } else if (method === "Bank VPN") {
      if (!vpnKey || vpnKey.length < 6) {
        setVpnError("VPN key must be at least 6 characters.");
        isValid = false;
      }
    }

    if (!isValid) {
      setPaymentStatus("Please correct the payment details.");
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);

    setPaymentStatus("✅ Payment confirmed! Generating receipt...");
    setSecureConnection(true);

    // ✅ Send booking to backend
    const bookingData = {
      trainNumber: train?.number,
      trainName: train?.name,
      fromStation: searchParams?.from,
      toStation: searchParams?.to,
      journeyDate: searchParams?.date,
      seats: selectedSeats,
      totalPrice,
      paymentMethod: method,
      passengers: passengerDetails,
    };

    axios
      .post("http://localhost:8080/api/bookings/save", bookingData)
      .then((response) => {
        console.log("✅ Booking saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("❌ Error saving booking:", error);
      });

    generateReceipt(method);

    setTimeout(() => {
      navigate("/booking-confirmation", {
        state: { train, selectedSeats, totalPrice, searchParams, passengerDetails, paymentMethod: method },
      });
    }, 2000);
  };

  // ⏳ Timer Logic
  useEffect(() => {
    if (!train || !selectedSeats || !totalPrice) {
      navigate("/trains");
      return;
    }

    setSecureConnection(true);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setSecureConnection(false);
          setPaymentStatus("Payment session timed out.");
          setTimeout(() => navigate(-1), 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [train, selectedSeats, totalPrice, navigate]);

  // 💳 Render Payment Section
  const renderPaymentDetails = () => {
    switch (selectedPaymentMethod) {
      case "credit_card":
        return (
          <div className="payment-details-card credit-card-form">
            <h4 className="form-title">Credit Card Payment</h4>
            <div className="input-group">
              <label>Card Number</label>
              <input
                type="text"
                className="input-field"
                placeholder="xxxx xxxx xxxx xxxx"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Expiry (MM/YY)</label>
              <input
                type="text"
                className="input-field"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input
                type="password"
                className="input-field"
                placeholder="***"
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value)}
              />
            </div>
            {cardError && <p className="error-message">{cardError}</p>}
            <button className="pay-button" onClick={() => handlePaymentSuccess("Credit Card")}>
              Pay Now
            </button>
          </div>
        );

      case "qr_scan":
        return (
          <div className="payment-details-card qr-scan-section">
            <h4 className="form-title">QR Payment</h4>
            <div className="qr-code-placeholder">📱 Scan Here</div>
            <button className="pay-button" onClick={() => handlePaymentSuccess("QR Scan")}>
              Confirm Payment
            </button>
          </div>
        );

      case "bank_vpn":
        return (
          <div className="payment-details-card vpn-payment-section">
            <h4 className="form-title">Bank VPN Payment</h4>
            <div className="input-group">
              <label>Enter VPN Key</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your VPN key"
                value={vpnKey}
                onChange={(e) => setVpnKey(e.target.value)}
              />
            </div>
            {vpnError && <p className="error-message">{vpnError}</p>}
            <button className="pay-button" onClick={() => handlePaymentSuccess("Bank VPN")}>
              Confirm Payment
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bank-root">
      <h2 className="bank-header">Complete Your Payment</h2>
      <p className="bank-subheader">Select your preferred payment method and proceed securely.</p>

      <div className="payment-method-selector">
        <button
          className={`payment-method-btn ${selectedPaymentMethod === "credit_card" ? "active" : ""}`}
          onClick={() => setSelectedPaymentMethod("credit_card")}
        >
          💳 Credit Card
        </button>
        <button
          className={`payment-method-btn ${selectedPaymentMethod === "qr_scan" ? "active" : ""}`}
          onClick={() => setSelectedPaymentMethod("qr_scan")}
        >
          📱 QR Scan
        </button>
        <button
          className={`payment-method-btn ${selectedPaymentMethod === "bank_vpn" ? "active" : ""}`}
          onClick={() => setSelectedPaymentMethod("bank_vpn")}
        >
          🔐 Bank VPN
        </button>
      </div>

      {renderPaymentDetails()}

      <div className="bank-summary">
        <h4>Amount to Pay</h4>
        <p className="total-amount">₹{totalPrice.toFixed(2)}</p>

        <p>
          Train: <strong>{train?.name || "N/A"}</strong> ({train?.number || "N/A"})
        </p>

        <p>Seats: {selectedSeats?.join(", ") || "N/A"}</p>

        {passengerDetails.length > 0 && (
          <table className="passenger-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {passengerDetails.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {paymentStatus && <p className="bank-status bank-status-pending">{paymentStatus}</p>}
      {countdown > 0 && !paymentStatus.includes("confirmed") && (
        <p className="countdown-timer">⏳ {countdown}s remaining</p>
      )}

      <div className="secure-connection-status">
        <div className={`secure-connection-indicator ${secureConnection ? "" : "disconnected"}`}>
          {secureConnection ? "🔒 Secure Connection Active" : "⚠️ Connection Lost"}
        </div>
      </div>
    </div>
  );
};

export default BankTransition;
