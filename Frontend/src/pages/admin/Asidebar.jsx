import React from "react";
import { sessionRemove } from "../../services/Api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoGridOutline,
  IoLogOutOutline,
  IoSettingsOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const Asidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionRemove();
      navigate("/");
    }
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <IoGridOutline size={20} />,
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Incomes",
      path: "/dashboard/incomes",
      icon: <IoTrendingUpOutline size={20} />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Expenses",
      path: "/dashboard/expenses",
      icon: <IoWalletOutline size={20} />,
      color: "from-rose-500 to-orange-500",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <IoSettingsOutline size={20} />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <aside className="sticky top-0 h-screen w-72 bg-[#050505] border-r border-white/5 flex flex-col p-6 shadow-2xl z-50 overflow-hidden">
      
      {/* Brand Logo Section with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3 px-4 mb-12"
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          <IoShieldCheckmarkOutline size={24} className="text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl font-black tracking-tighter leading-none italic">
            SmartWallet
          </h1>
          <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em]">
            Premium Ledger
          </p>
        </div>
      </motion.div>

      {/* Menu Label */}
      <p className="text-[10px] uppercase tracking-[0.4em] text-gray-700 font-black mb-6 px-4">
        Menu
      </p>

      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link
              to={item.path}
              className={`relative group flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-500 ${
                isActive(item.path)
                  ? "text-white bg-white/[0.03] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-white/5"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {/* Active Glow Indicator */}
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className={`absolute left-0 w-1 h-6 bg-gradient-to-b ${item.color} rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.5)]`}
                />
              )}

              <span
                className={`transition-all duration-500 group-hover:scale-110 ${
                  isActive(item.path)
                    ? "text-indigo-400"
                    : "group-hover:text-gray-200"
                }`}
              >
                {item.icon}
              </span>

              <span
                className={`font-bold tracking-tight text-sm transition-colors ${
                  isActive(item.path) ? "text-white" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>

              {/* Subtle Hover Background Effect */}
              <div
                className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity`}
              />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button Section with Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-auto pt-6"
      >
        <button
          onClick={logout}
          className="group w-full flex items-center gap-4 px-5 py-5 rounded-[2rem] bg-rose-500/[0.02] border border-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-lg hover:shadow-rose-500/20"
        >
          <motion.div
            whileHover={{ rotate: -15 }}
            className="p-2 bg-rose-500/10 rounded-xl group-hover:bg-white/20 transition-colors"
          >
            <IoLogOutOutline size={22} />
          </motion.div>
          <span className="font-black text-[10px] uppercase tracking-widest">
            Sign Out
          </span>
        </button>
      </motion.div>
    </aside>
  );
};

export default Asidebar;
