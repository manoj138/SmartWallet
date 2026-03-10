import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Api } from "../../services/Api";
import { motion } from "framer-motion";
import { 
  IoArrowBack, IoWalletOutline, IoCashOutline, 
  IoCalendarOutline, IoTimeOutline, IoSaveOutline, IoSyncOutline 
} from "react-icons/io5";

const IncomeEdit = () => {
  const [incomeData, setIncomeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchIncome = async () => {
    try {
      const res = await Api.get(`/income/${id}/find`);
      setIncomeData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const inputHandler = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await Api.put(`/income/${id}/update`, incomeData);
      navigate("/dashboard/incomes");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link
          to="/dashboard/incomes"
          className="flex items-center gap-2 mb-8 text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-emerald-400 transition-all group"
        >
          <IoArrowBack size={18} className="group-hover:-translate-x-1 transition-transform" />
          Cancel Editing
        </Link>

        {/* Card Container */}
        <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Progress Bar (Gold to Emerald for Edit Mode) */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-emerald-500"></div>

          <header className="mb-10 text-center">
            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 border border-amber-500/20 mx-auto mb-4 shadow-xl">
              <IoSyncOutline size={32} className={fetching ? "animate-spin" : ""} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              Edit Income
            </h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Adjusting transaction #{id?.slice(-4)}</p>
          </header>

          {fetching ? (
            <div className="py-20 text-center text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">
              Loading Data...
            </div>
          ) : (
            <form onSubmit={submitHandler} className="flex flex-col gap-6">
              
              {/* Source Input */}
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Source</label>
                <div className="flex items-center gap-3 px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl group-focus-within:border-emerald-500/50 transition-all shadow-inner">
                  <IoWalletOutline className="text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                  <input
                    type="text"
                    name="income_source"
                    value={incomeData.income_source || ""}
                    onChange={inputHandler}
                    required
                    className="bg-transparent outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>

              {/* Amount Input */}
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Amount (₹)</label>
                <div className="flex items-center gap-3 px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl group-focus-within:border-emerald-500/50 transition-all shadow-inner">
                  <span className="text-lg font-bold text-gray-500 group-focus-within:text-emerald-400 transition-colors">₹</span>
                  <input
                    type="number"
                    name="income_amount"
                    step="0.01"
                    min="0"
                    value={incomeData.income_amount || ""}
                    onChange={inputHandler}
                    required
                    className="bg-transparent outline-none w-full text-sm font-medium"
                  />
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Date</label>
                  <div className="flex items-center gap-2 px-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl group-focus-within:border-emerald-500/50 transition-all">
                    <IoCalendarOutline className="text-gray-500 group-focus-within:text-emerald-400" />
                    <input
                      type="date"
                      name="income_date"
                      value={incomeData.income_date || ""}
                      onChange={inputHandler}
                      required
                      className="bg-transparent outline-none w-full text-[12px] font-medium"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 mb-2 block">Time</label>
                  <div className="flex items-center gap-2 px-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl group-focus-within:border-emerald-500/50 transition-all">
                    <IoTimeOutline className="text-gray-500 group-focus-within:text-emerald-400" />
                    <input
                      type="time"
                      name="income_time"
                      value={incomeData.income_time || ""}
                      onChange={inputHandler}
                      required
                      className="bg-transparent outline-none w-full text-[12px] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-xs tracking-[0.2em] hover:bg-emerald-500 hover:text-white hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all duration-300"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <IoSaveOutline size={20} />
                    UPDATE RECORDS
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default IncomeEdit;