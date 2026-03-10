import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { motion } from "framer-motion";
import { 
  IoArrowBackOutline, IoPricetagOutline, IoCashOutline, 
  IoCardOutline, IoCalendarOutline, IoTimeOutline, IoAddCircleOutline 
} from "react-icons/io5";

const ExpenseCreate = () => {
  const [expenseData, setExpenseData] = useState({})
  const navigate =useNavigate()

  const inputHandler = (e)=>{
   setExpenseData({
    ...expenseData,
    [e.target.name]:e.target.value
   })
  }

  const submitHandler = async(e)=>{
    e.preventDefault()
    try {
     await Api.post('/expense/store', expenseData);
     navigate('/dashboard/expenses')
    } catch (error) {
      console.log( error)
    }
  }
  return (
<div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden p-6">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-rose-900/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[460px] backdrop-blur-3xl bg-white/[0.02] border border-white/[0.08] rounded-[2.5rem] p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Header with Back Button */}
        <div className="flex flex-col items-center mb-8 relative">
          <Link
            to="/dashboard/expenses"
            className="absolute left-0 top-1 text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
          >
            <IoArrowBackOutline size={20} />
          </Link>
          
          <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
            <IoCashOutline size={28} className="text-rose-400" />
          </div>
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-rose-200 to-purple-400 bg-clip-text text-transparent">
            Add Expense
          </h2>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          
          {/* Expense Source */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Expense Source</label>
            <div className="relative group">
              <IoPricetagOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
              <input
                type="text"
                name="ex_source"
                placeholder="e.g. Groceries, Rent"
                value={expenseData.ex_source || ""}
                onChange={inputHandler}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Amount (₹)</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold group-focus-within:text-rose-400">₹</span>
              <input
                type="number"
                name="ex_amount"
                placeholder="0.00"
                value={expenseData.ex_amount || ""}
                onChange={inputHandler}
                min="0"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-sm shadow-inner"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Payment Method</label>
            <div className="relative group">
              <IoCardOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
              <select
                name="ex_payment_method"
                value={expenseData.ex_payment_method || ""}
                onChange={inputHandler}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.05] transition-all text-gray-400 text-sm appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0f0f10]">Select Method</option>
                <option value="Cash" className="bg-[#0f0f10]">💸 Cash</option>
                <option value="UPI" className="bg-[#0f0f10]">📲 UPI</option>
                <option value="Net Banking" className="bg-[#0f0f10]">🏦 Net Banking</option>
                <option value="Debit Card" className="bg-[#0f0f10]">💳 Debit Card</option>
                <option value="Credit Card" className="bg-[#0f0f10]">💳 Credit Card</option>
              </select>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Date</label>
              <div className="relative group">
                <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                <input
                  type="date"
                  name="ex_date"
                  value={expenseData.ex_date || ""}
                  onChange={inputHandler}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-xs shadow-inner"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Time</label>
              <div className="relative group">
                <IoTimeOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-rose-400 transition-colors" />
                <input
                  type="time"
                  name="ex_time"
                  value={expenseData.ex_time || ""}
                  onChange={inputHandler}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-white/5 focus:outline-none focus:border-rose-500/40 focus:bg-white/[0.05] transition-all text-gray-200 text-xs shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 group relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold shadow-[0_15px_30px_rgba(225,29,72,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <IoAddCircleOutline size={22} />
            <span className="uppercase tracking-widest text-sm font-black">Record Expense</span>
          </motion.button>

        </form>
      </motion.div>
    </div>
  );
};

export default ExpenseCreate;
