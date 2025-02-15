import React from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon from React Icons
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
    setTimeout(() => {
      alert("Logged out successfully!");
    }, 100);
  };

  return isAuthenticated ? (
    <button className="logout-btn" onClick={handleLogout}>
      <FaSignOutAlt className="logout-icon" />
      Logout
    </button>
  ) : null;
};
const Navbar = () => {

  return (
    <div className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-heading">Google Drive Clone</h1>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
