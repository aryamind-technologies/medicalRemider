import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              Medical Dashboard
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 transition duration-200 ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/medicaldashboard"
              className={({ isActive }) =>
                `text-white hover:text-blue-200 transition duration-200 ${
                  isActive ? "underline underline-offset-4" : ""
                }`
              }
            >
              Dashboard
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition duration-200"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded transition duration-200"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
