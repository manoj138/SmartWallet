import React, { useState, useEffect, useMemo } from "react";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import {
  XAxis, YAxis, Tooltip, CartesianGrid, 
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import Asidebar from "./Asidebar";
import { motion } from "framer-motion";
import { 
  IoArrowUpCircle, IoArrowDownCircle, IoWallet, 
  IoBulbOutline, IoTrendingUp, IoTimeOutline 
} from "react-icons/io5";
import NavBar from "../../components/comman/NavBar";

const DashboardPage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("users"));
  const navigate = useNavigate()
  const fetchDashboardData = async () => {
    try {
      const [inc, exp] = await Promise.all([
        Api.get("/income"),
        Api.get("/expense")
      ]);
      setIncomeData(inc.data.data);
      setExpenseData(exp.data.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Total Calculations
  const totals = useMemo(() => {
    const inc = incomeData.reduce((t, i) => t + Number(i.income_amount), 0);
    const exp = expenseData.reduce((t, e) => t + Number(e.ex_amount), 0);
    return { inc, exp, balance: inc - exp };
  }, [incomeData, expenseData]);

  // Merge & Format Transactions for Activity & Wave Chart
  const transactions = useMemo(() => {
    const combined = [
      ...incomeData.map(i => ({ 
        date: i.income_date, 
        income: Number(i.income_amount), 
        expense: 0,
        amount: Number(i.income_amount),
        title: i.income_source, 
        type: 'income' 
      })),
      ...expenseData.map(e => ({ 
        date: e.ex_date, 
        income: 0,
        expense: Number(e.ex_amount), 
        amount: -Number(e.ex_amount),
        title: e.ex_source || e.ex_category || "Expense", 
        type: 'expense' 
      }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    return { 
      history: [...combined].reverse(), 
      chart: combined 
    };
  }, [incomeData, expenseData]);

  return (
    <div className="min-h-screen flex bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
      <Asidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-[100] w-full backdrop-blur-md bg-[#050505]/60">
          <NavBar />
        </div>

        <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto custom-scrollbar">
          
          {/* Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:justify-between md:items-end gap-5"
          >
            <div>
              <h1 className="text-4xl font-black tracking-tight">
                👋 Hello, <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">{user?.name}</span>
              </h1>
              <p className="text-gray-500 mt-2 font-bold uppercase text-[10px] tracking-[0.3em]">
                Financial Overview • {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
              </p>
            </div>
            <div className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-bold text-gray-400 backdrop-blur-3xl shadow-2xl">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </motion.div>

          {/* Top Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Total Income Card */}
{/* Total Income Card with Cumulative Style */}
<motion.div
  whileHover={{ y: -5 }}
  onClick={() => navigate("/dashboard/incomes")}
  className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent cursor-pointer border border-emerald-500/10 relative overflow-hidden group shadow-2xl"
>
  {/* Page Load Entrance Animation for Background Icon */}
  <motion.div 
    initial={{ y: 100, opacity: 0, rotate: 20 }}
    animate={{ y: 0, opacity: 0.05, rotate: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    className="absolute -right-6 -bottom-6 group-hover:opacity-[0.1] transition-opacity text-emerald-500"
  >
    <IoArrowUpCircle size={140} />
  </motion.div>

  <div className="mb-4 flex items-center justify-between">
    {/* Entrance for Small Icon */}
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
      className="p-3 rounded-2xl bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    >
      <IoArrowUpCircle size={24} />
    </motion.span>
    <span className="text-[10px] font-black text-emerald-500/50 tracking-widest uppercase px-2 py-0.5 border border-emerald-500/10 rounded-md">
      Live
    </span>
  </div>

  <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Total Income</h3>
  <p className="text-4xl font-black tracking-tighter italic">
    ₹{totals.inc?.toLocaleString('en-IN')}
  </p>
</motion.div>

  {/* Total Expense Card */}
 {/* Total Expense Card with Cumulative Style */}
<motion.div
  whileHover={{ y: -5 }}
  onClick={() => navigate("/dashboard/expenses")}
  className="p-8 rounded-[2.5rem] bg-gradient-to-br from-rose-500/10 via-transparent to-transparent cursor-pointer border border-rose-500/10 relative overflow-hidden group shadow-2xl"
>
  {/* Entrance Animation for Background Icon */}
  <motion.div 
    initial={{ y: 100, opacity: 0, rotate: -20 }}
    animate={{ y: 0, opacity: 0.05, rotate: 0 }}
    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
    className="absolute -right-6 -bottom-6 group-hover:opacity-[0.1] transition-opacity text-rose-500"
  >
    <IoArrowDownCircle size={140} />
  </motion.div>

  <div className="mb-4 flex items-center justify-between">
    {/* Solid Icon Box with Glow */}
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      className="p-3 rounded-2xl bg-rose-500 text-black shadow-[0_0_20px_rgba(244,63,94,0.3)]"
    >
      <IoArrowDownCircle size={24} />
    </motion.span>
    <span className="text-[10px] font-black text-rose-500/50 tracking-widest uppercase px-2 py-0.5 border border-rose-500/10 rounded-md">
      Live
    </span>
  </div>

  <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Total Expense</h3>
  <p className="text-4xl font-black tracking-tighter italic">
    ₹{totals.exp?.toLocaleString('en-IN')}
  </p>
</motion.div>

  {/* Net Balance Card */}
 {/* Net Balance Card with Cumulative Style */}
<motion.div
  whileHover={{ y: -5 }}
  className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border border-indigo-500/10 relative overflow-hidden group shadow-2xl"
>
  {/* Entrance Animation for Background Icon */}
  <motion.div 
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.05 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    className="absolute -right-6 -bottom-6 group-hover:opacity-[0.1] transition-opacity text-indigo-500"
  >
    <IoWallet size={140} />
  </motion.div>

  <div className="mb-4 flex items-center justify-between">
    {/* Solid Indigo Icon Box with Glow */}
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      className="p-3 rounded-2xl bg-indigo-500 text-black shadow-[0_0_20px_rgba(99,102,241,0.3)]"
    >
      <IoWallet size={24} />
    </motion.span>
    <span className="text-[10px] font-black text-indigo-500/50 tracking-widest uppercase px-2 py-0.5 border border-indigo-500/10 rounded-md">
      Live
    </span>
  </div>

  <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Net Balance</h3>
  <p className="text-4xl font-black tracking-tighter italic">
    ₹{totals.balance?.toLocaleString('en-IN')}
  </p>
</motion.div>
</div>

          {/* Analytics Section */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* WAVE CHART CARD */}
            <div className="lg:col-span-7 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black flex items-center gap-3 tracking-tighter uppercase text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Income vs Expense Waves
                </h3>
              </div>
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={transactions.chart}>
                    <defs>
                      <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', borderRadius: '20px', border: '1px solid #333', fontSize: '12px', fontWeight: 'bold' }}
                    />
                    {/* Income Wave */}
                    <Area 
                      type="natural" 
                      dataKey="income" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorInc)" 
                    />
                    {/* Expense Wave */}
                    <Area 
                      type="natural" 
                      dataKey="expense" 
                      stroke="#ef4444" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorExp)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-5 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-2xl flex flex-col">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3 tracking-tighter uppercase text-xs text-gray-400">
                <IoTimeOutline className="text-gray-500" size={18}/>
                Recent Activity
              </h3>
              <div className="space-y-4 overflow-y-auto  no-scrollbar pr-2 max-h-[320px] custom-scrollbar">
                {transactions.history.slice(0, 6).map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.05] transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {t.type === 'income' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-tight capitalize">{t.title}</p>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">{t.date}</p>
                      </div>
                    </div>
                    <span className={`font-black tracking-tighter ${t.type === 'income' ? "text-emerald-400" : "text-rose-400"}`}>
                      {t.type === 'income' ? `+₹${t.amount.toLocaleString()}` : `-₹${Math.abs(t.amount).toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Progress Card */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Monthly Budget Goal</h3>
              <span className="text-xs font-bold text-indigo-400">75% Used</span>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              />
            </div>
            <div className="flex justify-between mt-4">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Target: ₹50,000</p>
              <p className="text-[10px] text-rose-400 font-bold uppercase tracking-tighter">Spent: ₹37,500</p>
            </div>
          </div>

          {/* Insights Footer */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/5 to-transparent border border-amber-500/10 flex gap-6 items-center group hover:border-amber-500/30 transition-all">
              <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400 group-hover:scale-110 transition-transform">
                <IoBulbOutline size={28}/>
              </div>
              <div>
                <h4 className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-1">Smart Tip</h4>
                <p className="text-sm text-gray-400 font-medium leading-snug">Keep your expenses below 70% of income for a healthy financial growth.</p>
              </div>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/5 to-transparent border border-indigo-500/10 flex gap-6 items-center group hover:border-indigo-500/30 transition-all">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                <IoTrendingUp size={28}/>
              </div>
              <div>
                <h4 className="text-indigo-500 font-black text-xs uppercase tracking-[0.2em] mb-1">Growth Insight</h4>
                <p className="text-sm text-gray-400 font-medium leading-snug">Your balance has trended upwards by 12% this week. Great job!</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;