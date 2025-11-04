import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

  const result = await response.text();
setLoading(false);

if (result === "Login successful!") {
  // ✅ Store the user info manually (from email input)
  localStorage.setItem("user", JSON.stringify({ email: formData.email }));
  alert("✅ Login successful!");
  navigate("/travel");
} else {
  alert(result);
}

    } catch (error) {
      console.error("Login error:", error);
      alert("⚠️ Unable to connect to server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Close Button */}
        <button className="close-btn" onClick={() => navigate("/")}>
          &times;
        </button>

        <h2 className="login-title">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <p className="forgot-text">
  <span
    style={{ color: "blue", cursor: "pointer" }}
    onClick={() => navigate("/forgot-password")}
  >
    Forgot Password?
  </span>
</p>


          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button className="btn btn-link mt-2" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <p className="signup-text">
          New user?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Create your account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
