import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/users/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const result = await response.text();

    if (result === "Password reset successful!") {
      alert("✅ Password reset successfully!");
      navigate("/login");
    } else {
      alert("⚠ Something went wrong.");
    }
  };

  if (!email) return <h2>⚠ No email provided. Please go back and try again.</h2>;

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="brand-title">Trago Travel Platform</h3>
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;