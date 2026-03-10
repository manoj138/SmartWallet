import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  IoPersonOutline, IoAtOutline, IoMailOutline, 
  IoLockClosedOutline, IoRocketOutline 
} from "react-icons/io5";

const RegisterPage = () => {
const [regData, setRegData] = useState({
    status:"user",
});
    const navigate = useNavigate()


const inputHandler = (e)=>{
    setRegData({
        ...regData,
        [e.target.name] : e.target.value
    })
}
const submitHandler = async (e)=>{
   e.preventDefault();
    try {
        await Api.post('/register', regData)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
  return (
<div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-6">
      
      {/* Background Glowing Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-900/20 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative backdrop-blur-2xl bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] w-full max-w-[480px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
            Join SmartWallet
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">
            Start managing your finances like a pro.
          </p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          
          {/* Grid for Name and Username  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Full Name</label>
              <div className="relative group">
                <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="example"
                  value={regData.name || ""}
                  onChange={inputHandler}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Username</label>
              <div className="relative group">
                <IoAtOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="user_name"
                  placeholder="example_01"
                  value={regData.user_name || ""}
                  onChange={inputHandler}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Email Address</label>
            <div className="relative group">
              <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={regData.email || ""}
                onChange={inputHandler}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Set Password</label>
            <div className="relative group">
              <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={regData.password || ""}
                onChange={inputHandler}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm"
              />
            </div>
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 group relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-[0_15px_30px_rgba(79,70,229,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <IoRocketOutline size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span className="tracking-wide text-sm uppercase">Create Account</span>
          </motion.button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-8 text-xs font-medium tracking-wide">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-white hover:text-indigo-400 font-bold transition-colors underline-offset-4 hover:underline"
          >
            Log In here
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default RegisterPage;
