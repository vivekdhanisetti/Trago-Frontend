import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtpVerification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/users/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.text();

    if (result === "OTP verified") {
      alert("✅ OTP verified successfully!");
      navigate("/reset-password", { state: { email } });
    } else {
      alert("❌ Invalid or expired OTP.");
    }
  };

  if (!email) return <h2>⚠ No email provided. Please go back and try again.</h2>;

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">Trago Travel Platform</h1>
        <h2>Enter OTP</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;