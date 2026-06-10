import React, { useEffect } from "react";
import "./styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userSvg from "../../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation(); // Allows us to see which URL the user is currently on

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } 
    // FIX: Only force redirect to dashboard if the user is stuck on the login page
    else if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="text-xl font-black tracking-wider hover:text-blue-100 transition">
              SpendWise.
            </Link>
          </div>

          {/* Center: Navigation Links (Only visible if logged in) */}
          {user && (
            <div className="flex space-x-6 items-center">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  location.pathname === "/dashboard"
                    ? "bg-blue-700 text-white shadow-inner"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/split"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  location.pathname === "/split"
                    ? "bg-blue-700 text-white shadow-inner"
                    : "text-blue-100 hover:bg-blue-500 hover:text-white"
                }`}
              >
                Split Expenses
              </Link>
            </div>
          )}

          {/* Right: User Profile & Logout */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={user.photoURL ? user.photoURL : userSvg}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full border-2 border-blue-400 bg-white"
                />
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-bold text-blue-100 bg-blue-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
