import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoPersonOutline, IoNotificationsOutline, 
  IoShieldCheckmarkOutline, IoColorPaletteOutline, 
  IoCloudUploadOutline, IoMailOutline, 
  IoChevronBack
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';


const SettingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="relative bg-black min-h-screen overflow-hidden">
      
      {/* --- Background Ambient Glows --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      {/* --------------------------------- */}
        
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-8 max-w-6xl mx-auto"
      >
   
        {/* Header */}
        <div className="mb-12 flex gap-10">
               <button
               onClick={() => navigate(-1)}
               className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
             >
               <IoChevronBack
                 className="text-indigo-400 group-hover:-translate-x-1 transition-transform"
                 size={20}
               />
             </button>  
         <div>
             <h1 className="text-5xl font-black tracking-tighter italic text-white mb-2">SETTINGS</h1>
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-12 bg-indigo-500 rounded-full"></span>
            <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.4em]">Personalize your experience</p>
          </div>
         </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Profile Card */}
         

          {/* Options List */}
         <div className="lg:col-span-8 space-y-6">
  {/* Profile Card */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0 }}
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.04)" }}
    onClick={()=> navigate('/dashboard/profile')}
    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
  >
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
        <IoPersonOutline size={24} />
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight">Profile Settings</h3>
    </div>
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-indigo-500 transition-all">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  </motion.div>

  {/* Security Card */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 }}
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.04)" }}
    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
  >
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
        <IoShieldCheckmarkOutline size={24} />
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight">Security Settings</h3>
    </div>
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-indigo-500 transition-all">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  </motion.div>

  {/* Alerts Card */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.04)" }}
    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
  >
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
        <IoNotificationsOutline size={24} />
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight">Alerts Settings</h3>
    </div>
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-indigo-500 transition-all">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  </motion.div>

  {/* Theme Card */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.04)" }}
    className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-between cursor-pointer group transition-all"
  >
    <div className="flex items-center gap-6">
      <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
        <IoColorPaletteOutline size={24} />
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight">Theme Settings</h3>
    </div>
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-indigo-500 transition-all">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  </motion.div>
</div>

        </div>
      </motion.div>
    </div>
  );
};

export default SettingPage;