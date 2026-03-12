import React from "react";
import { useState } from "react";
import { Api, sessionStore } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoRocketOutline,
} from "react-icons/io5";

const LoginPage = () => {
  const [logData, setLogData] = useState({});
  console.log("🚀 ~ LoginPage ~ logData:", logData)
 
 
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setLogData({
      ...logData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await Api.post("/login", logData);
      
      if (data.data.token) {
        sessionStore(data.data.token, data.data.findUser);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative backdrop-blur-2xl bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-[420px] mx-4"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            <span className="text-3xl">🏦</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">
            Please enter your details to login.
          </p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">
              Email Address
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <IoMailOutline size={20} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={logData.email || ""}
                onChange={inputHandler}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all duration-300 text-gray-200 placeholder:text-gray-700 shadow-inner"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                Password
              </label>
              <Link
                to="#"
                className="text-[10px] text-purple-400 hover:underline tracking-tighter uppercase"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                <IoLockClosedOutline size={20} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={logData.password || ""}
                onChange={inputHandler}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all duration-300 text-gray-200 placeholder:text-gray-700 shadow-inner"
              />
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 group relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_10px_20px_rgba(124,58,237,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <IoRocketOutline
              size={20}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
            <span>Sign In to Account</span>
          </motion.button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-500 mt-8 text-sm font-medium">
          New to SmartWallet?{" "}
          <Link
            to="/registers"
            className="text-white hover:text-purple-400 font-bold transition-colors underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
