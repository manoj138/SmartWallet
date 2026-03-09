import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RemoveSesstionStorage } from "../../services/Api";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("users"));
  const logout = () => {
    RemoveSesstionStorage();
    navigate("/");
  };

  return (
<div className="sticky top-0 z-50 bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
  
  {/* Navbar */}
  <nav className="flex justify-between items-center px-10 py-5 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
    
    {/* Logo */}
    <Link
      to="/dashboard"
      className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
    >
      🏦 SmartWallet
    </Link>

    {/* Menu */}
    <div className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <span className="text-gray-200 font-medium">{user?.name}</span>

        <span className="text-sm">▼</span>
      </div>

      {open && (
        <div className="absolute -right-4 mt-5 w-44 backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl shadow-xl">
          <Link
            to="/dashboard/profile"
            className="block px-4 py-3 hover:bg-white/10 transition"
          >
            👤 Profile
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 hover:bg-red-500/20 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  </nav>

</div>
  );
};

export default NavBar;
