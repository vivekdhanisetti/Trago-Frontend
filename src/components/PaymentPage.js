import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    if (!selectedOption) {
      alert("Please select a payment method before continuing.");
      return;
    }
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <h2>🎉 Payment Successful!</h2>
        <p>Your booking has been confirmed.</p>
        <p>Thank you for choosing us ❤️</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2>💳 Payment Options</h2>

      {/* Trip Summary */}
      <div className="trip-summary">
        <h3>Trip Summary</h3>
        <p>
          ✈️ <strong>Hyderabad</strong> → <strong>Dubai</strong>
        </p>
        <p>
          📅 <strong>Date:</strong> 15 Oct 2025
        </p>
        <p>
          💺 <strong>Seat:</strong> 5C
        </p>
        <p>
          💰 <strong>Price:</strong> ₹8,500
        </p>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <h3>Select Payment Method</h3>

        <label className="option">
          <input
            type="radio"
            name="payment"
            value="upi"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          🟢 UPI (Google Pay, PhonePe, Paytm, BHIM)
        </label>

        {selectedOption === "upi" && (
          <div className="upi-box">
            <input type="text" placeholder="Enter UPI ID (e.g. user@upi)" />
          </div>
        )}

        <label className="option">
          <input
            type="radio"
            name="payment"
            value="card"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          💳 Credit / Debit Card
        </label>

        {selectedOption === "card" && (
          <div className="card-box">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Cardholder Name" />
            <div className="card-row">
              <input type="text" placeholder="MM/YY" />
              <input type="password" placeholder="CVV" />
            </div>
          </div>
        )}

        <label className="option">
          <input
            type="radio"
            name="payment"
            value="netbanking"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          🏦 Net Banking
        </label>

        {selectedOption === "netbanking" && (
          <div className="bank-box">
            <select>
              <option>Select Your Bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Punjab National Bank</option>
            </select>
          </div>
        )}

        <label className="option">
          <input
            type="radio"
            name="payment"
            value="wallet"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          👜 Wallets (Paytm, Amazon Pay, Freecharge)
        </label>

        {selectedOption === "wallet" && (
          <div className="wallet-box">
            <select>
              <option>Select Wallet</option>
              <option>Paytm</option>
              <option>Amazon Pay</option>
              <option>PhonePe Wallet</option>
              <option>Mobikwik</option>
            </select>
          </div>
        )}
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        💰 Pay ₹8,500
      </button>
    </div>
  );
};

export default PaymentPage;
