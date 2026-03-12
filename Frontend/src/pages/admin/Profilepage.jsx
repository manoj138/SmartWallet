import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoMailOutline,
  IoShieldCheckmarkOutline,
  IoCloudUploadOutline,
  IoStatsChartOutline,
  IoCloseOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { Api } from "../../services/Api";

const Profilepage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchuser = async () => {
    try {
      const res = await Api.get("/user");
      if (res.data && res.data.data) {
        setUser(res.data.data[0]);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const profileHandler = async (file) => {
    if (!file) return;
    try {
      setIsLoading(true);
      const res = await Api.put(`/user/${user.id}/update`, { user_image: file });
      if (res.data.success) {
        sessionStorage.setItem("users", JSON.stringify(res.data.data));
        setUser(res.data.data);
      }
      fetchuser();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateHandler = async () => {
    try {
      setIsLoading(true);
      await Api.put(`/user/${user.id}/update`, user);
      setIsEditing(false);
      fetchuser();
    } catch (error) {
      console.log("Update Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  // Shimmer Effect Component (Logic madhe badal nahi, fakt UI helper)
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-white/5 rounded-lg ${className}`} />
  );

  return (
    <div className="relative min-h-screen p-6 bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Navigation & Controls */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <IoChevronBack className="text-indigo-400 group-hover:-translate-x-1 transition-transform" size={20} />
        </button>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 rounded-2xl bg-indigo-500 text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:scale-105 transition-all"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="p-3 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">
              <IoCloseOutline size={20} />
            </button>
            <button onClick={updateHandler} className="p-3 rounded-xl bg-emerald-500 text-black shadow-lg hover:scale-110 transition-all">
              <IoCheckmarkOutline size={20} />
            </button>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[450px]"
      >
        <div className="bg-[#0b0b0b] border border-white/[0.08] rounded-[4rem] p-12 flex flex-col items-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <IoStatsChartOutline className="absolute -right-10 -bottom-10 text-white/[0.02] pointer-events-none" size={300} />

          {/* Avatar Section */}
          <div className="relative mb-10">
            <div className="w-48 h-48 rounded-[3.5rem] p-[3px] bg-gradient-to-tr from-indigo-600 via-purple-500 to-indigo-400 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-full h-full bg-[#121212] rounded-[3.3rem] overflow-hidden border-[8px] border-[#0b0b0b] flex items-center justify-center">
                {isLoading ? (
                  <div className="w-full h-full bg-white/5 animate-pulse" />
                ) : (
                  <img
                    src={user.user_image ? `http://localhost:4000/${user.user_image}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || "User"}`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <label className="absolute bottom-1 right-1 w-14 h-14 bg-indigo-500 rounded-[1.5rem] flex items-center justify-center text-black shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all border-[6px] border-[#0b0b0b]">
              <IoCloudUploadOutline size={24} />
              <input type="file" className="hidden" name="user_image" accept="image/*" onChange={(e) => profileHandler(e.target.files[0])} />
            </label>
          </div>

          {/* Text Info */}
          <div className="text-center w-full mb-10">
            {isLoading ? (
              <Skeleton className="h-10 w-3/4 mx-auto" />
            ) : isEditing ? (
              <input
                name="name"
                value={user.name || ""}
                onChange={inputHandler}
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-3xl font-black italic text-center text-white outline-none focus:border-indigo-500 w-full"
              />
            ) : (
              <h2 className="text-4xl font-black tracking-tight italic uppercase text-white leading-tight">
                {user.name || "Example"}
              </h2>
            )}
          </div>

          {/* Email Container */}
          <div className="w-full bg-[#050505]/60 border border-white/[0.05] rounded-[2rem] p-5 flex items-center gap-5 group hover:border-indigo-500/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
              <IoMailOutline size={22} />
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Email Address</span>
              {isLoading ? (
                <Skeleton className="h-4 w-1/2 mt-1" />
              ) : isEditing ? (
                <input
                  name="email"
                  value={user.email || ""}
                  onChange={inputHandler}
                  className="bg-transparent border-none text-sm font-bold text-indigo-100 outline-none italic"
                />
              ) : (
                <span className="text-sm font-bold text-gray-400 italic tracking-wide lowercase">
                  {user.email || "example@fintrack.com"}
                </span>
              )}
            </div>
          </div>

          {/* Membership Badge */}
          <div className="mt-8 flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <>
                <IoShieldCheckmarkOutline className="text-emerald-500" size={14} />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                  {user.membership || "Premium Member"}
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profilepage;