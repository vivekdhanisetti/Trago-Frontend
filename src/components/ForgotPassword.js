import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForms.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.text();
      setLoading(false);

      if (result === "OTP sent to email!") {
        alert("✅ OTP sent successfully! Check your inbox.");
        navigate("/verify-otp", { state: { email } });
      } else {
        alert("❌ Email not found!");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2 className="forgot-heading">Trago Travel Platform</h2>
        <h3 className="forgot-subtitle">Forgot Password</h3>

        <form onSubmit={handleSendOtp}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
