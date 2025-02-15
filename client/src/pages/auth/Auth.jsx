import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axios from "axios";
import "./Auth.css";
import { handleLogin, handleRegister } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login API request
        const data = await handleLogin(formData);

        // Dispatch login action
        dispatch(loginSuccess(data));

        navigate("/");

        setTimeout(() => {
          alert("Login successful!");
        }, 100);
      } else {
        // Register API request
        await handleRegister(formData);

        setTimeout(() => {
          alert("Registration successful! Please login.");
        }, 100);
        setIsLogin(true); // Switch to login mode after successful registration
      }
    } catch (error) {
      console.error("Auth error:", error);
      setTimeout(() => {
        alert(error.response?.data?.message || "Something went wrong");
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullname: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p onClick={toggleMode} className="toggle-mode">
          {isLogin
            ? "Need an account? Register here."
            : "Already have an account? Login here."}
        </p>
      </div>
    </div>
  );
};

export default Auth;
