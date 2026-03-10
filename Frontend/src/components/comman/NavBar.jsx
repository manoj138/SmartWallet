import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RemoveSesstionStorage } from "../../services/Api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoSettingsOutline, IoLogOutOutline, IoChevronDownOutline, 
  IoShieldCheckmarkOutline, IoPersonOutline 
} from "react-icons/io5";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("users"));

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      RemoveSesstionStorage();
      navigate("/");
    }
  };

  return (
    <div className="sticky top-0 z-[60] w-full bg-transparent px-6 py-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40"></div>

      <nav className="mx-auto max-w-7xl relative">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 via-white/5 to-purple-500/20 rounded-full blur-sm"></div>

        <div className="relative flex justify-between items-center px-8 py-3 bg-[#0a0a0b] border border-white/[0.08] rounded-full shadow-2xl">
          
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <IoShieldCheckmarkOutline size={22} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              SMART<span className="text-indigo-400">WALLET</span>
            </span>
          </Link>

          <div className="relative">
            <motion.div
              onClick={() => setOpen(!open)}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="flex items-center gap-4 cursor-pointer p-1.5 pr-5 rounded-full border border-white/10 bg-black/20 transition-all hover:border-white/20"
            >
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0a0a0b] text-white font-black text-xs uppercase">
                  {user?.name?.charAt(0)}
                </div>
              </div>

              <div className="hidden md:block">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] leading-none mb-1">Account</p>
                <p className="text-sm text-gray-100 font-bold tracking-tight leading-none">{user?.name}</p>
              </div>

              <motion.span 
                animate={{ rotate: open ? 180 : 0 }}
                className="text-gray-500"
              >
                <IoChevronDownOutline size={14} />
              </motion.span>
            </motion.div>

            <AnimatePresence>
              {open && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)}></div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 overflow-hidden bg-[#0d0d0e] border border-white/10 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-50 p-2"
                  >
                    <div className="px-4 py-4 mb-1 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                       <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Session Active</p>
                       <p className="text-sm font-bold text-white truncate">{user?.email || user?.name}</p>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-2xl transition-all group"
                      >
                        <IoPersonOutline size={20} className="group-hover:text-indigo-400" />
                        <span className="text-sm font-bold">My Profile</span>
                      </Link>

                      <Link
                        to="/dashboard/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-2xl transition-all group"
                      >
                        <IoSettingsOutline size={20} className="group-hover:text-indigo-400" />
                        <span className="text-sm font-bold">Preferences</span>
                      </Link>

                      <div className="h-[1px] bg-white/5 mx-2 my-1"></div>

                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all group"
                      >
                        <IoLogOutOutline size={22} className="group-hover:translate-x-1 transition-transform" />
                        <span className="text-sm font-black uppercase tracking-widest">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;