import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RemoveSesstionStorage } from '../../services/Api';

const NavBar = () => {
 const navigate = useNavigate()
  const logout = ()=>{
    RemoveSesstionStorage();
  navigate('/')
  }

  return (
<div className="bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">

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
    <div className="flex items-center gap-8">

      <button
        onClick={logout}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition shadow-md"
      >
        🚪 Logout
      </button>

    </div>

  </nav>



</div>
  )
}

export default NavBar