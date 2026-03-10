import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Api } from '../../services/Api';
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoArrowBack, IoAddOutline, IoTrashOutline, 
  IoCreateOutline, IoSearchOutline, IoTrendingUpOutline, 
  IoCashOutline, IoCalendarOutline, IoStatsChartOutline
} from "react-icons/io5";

const IncomeIndex = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchIncome = async () => {
    try {
      const res = await Api.get("/income");
      setIncomeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    if(!window.confirm("Are you sure you want to delete this income record?")) return;
    try {
      await Api.delete(`/income/${id}/delete`);
      fetchIncome();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const totalIncome = useMemo(() => {
    return incomeData.reduce((acc, curr) => acc + Number(curr.income_amount), 0);
  }, [incomeData]);

  const filteredData = incomeData.filter(item => 
    item.income_source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-10 text-white font-sans relative overflow-x-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-5%] right-0 w-full max-w-4xl h-[300px] bg-emerald-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
             <Link to="/dashboard" className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-500/20 hover:text-emerald-400 transition-all border border-white/5">
                <IoArrowBack size={20} />
             </Link>
             <div>
                <h2 className="text-3xl font-black tracking-tighter italic">Revenue</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Money Inflow</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] rounded-2xl border border-white/10 text-gray-400 focus-within:border-emerald-500/50 transition-all group shadow-inner">
               <IoSearchOutline size={18} className="group-focus-within:text-emerald-400" />
               <input 
                  type="text" 
                  placeholder="Search source..." 
                  className="bg-transparent outline-none text-sm w-full md:w-40"
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Link
              to={"/dashboard/incomes/create"}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 text-black font-black text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
            >
              <IoAddOutline size={20} />
              NEW ENTRY
            </Link>
          </div>
        </div>

        {/* Analytics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Earnings Card */}
            <div className="md:col-span-2 p-8 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-emerald-500/10 rounded-[2.5rem] flex items-center justify-between overflow-hidden relative group">
                <IoStatsChartOutline className="absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors" size={180} />
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                        <IoTrendingUpOutline size={32} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.25em] mb-1">Cumulative Revenue</p>
                        <h3 className="text-4xl font-black tracking-tighter">₹{totalIncome.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <div className="flex gap-1 items-end h-12">
                        {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }} 
                                animate={{ height: `${h}%` }} 
                                className="w-1.5 bg-emerald-500/20 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Count Card */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-center">
                <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    <IoCalendarOutline /> Active Records
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter">{incomeData.length}</span>
                    <span className="text-gray-600 font-bold text-sm uppercase">Entries</span>
                </div>
            </div>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 px-10 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">
            <div className="col-span-5">Revenue Source</div>
            <div className="col-span-3 text-center">Timeline</div>
            <div className="col-span-2 text-right">Valuation</div>
            <div className="col-span-2 text-right">Manage</div>
          </div>

          <AnimatePresence mode='popLayout'>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <motion.div
                  key={data.income_id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 bg-white/[0.01] border border-white/[0.03] rounded-[2.2rem] hover:bg-white/[0.03] hover:border-emerald-500/30 transition-all group"
                >
                  {/* Source */}
                  <div className="col-span-5 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-emerald-500 border border-white/5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                      <IoCashOutline size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors capitalize leading-none mb-1.5">{data.income_source}</h4>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">Verified</span>
                        <span className="text-[9px] text-gray-600 font-bold uppercase">Ref: {data.income_id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="col-span-3 text-left md:text-center my-4 md:my-0">
                    <div className="text-sm text-gray-300 font-black tracking-tight">{data.income_date}</div>
                    <div className="text-[10px] text-gray-600 font-black uppercase mt-1 flex items-center justify-start md:justify-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gray-700"></span> {data.income_time}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 text-left md:text-right">
                    <div className="text-[10px] text-gray-600 font-black uppercase mb-1">Amount</div>
                    <span className="text-2xl font-black text-emerald-400 tracking-tighter group-hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-all">
                      ₹{Number(data.income_amount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-start md:justify-end items-center gap-3 mt-4 md:mt-0">
                    <Link
                      to={`/dashboard/incomes/${data.income_id}/edit`}
                      className="p-3.5 bg-white/[0.03] rounded-2xl text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all border border-white/5 shadow-lg"
                    >
                      <IoCreateOutline size={20} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(data.income_id)}
                      className="p-3.5 bg-white/[0.03] rounded-2xl text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-white/5 shadow-lg"
                    >
                      <IoTrashOutline size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-32 text-center bg-white/[0.01] rounded-[3.5rem] border-2 border-dashed border-white/5"
              >
                <IoStatsChartOutline size={50} className="mx-auto text-gray-800 mb-4" />
                <p className="font-black uppercase text-[10px] tracking-[0.4em] text-gray-600">Zero Inflow Records Detected</p>
                <Link to="/dashboard/incomes/create" className="text-emerald-500 text-[10px] font-black underline mt-4 inline-block hover:text-emerald-400">ADD YOUR FIRST INCOME SOURCE</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IncomeIndex;