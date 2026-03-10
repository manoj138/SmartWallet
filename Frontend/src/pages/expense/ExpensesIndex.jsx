import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Api } from '../../services/Api';
import { motion, AnimatePresence } from "framer-motion";
import { 
  IoArrowBack, IoAddOutline, IoTrashOutline, 
  IoCreateOutline, IoSearchOutline, IoWalletOutline, 
  IoTrendingDownOutline, IoReceiptOutline, IoCalendarOutline,
  IoAlertCircleOutline
} from "react-icons/io5";

const ExpensesIndex = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchExpnese = async () => {
    try {
      const res = await Api.get('/expense');
      setExpenseData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteHandler = async (id) => {
    if(!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await Api.delete(`/expense/${id}/delete`);
      fetchExpnese();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchExpnese();
  }, []);

  const totalAmount = useMemo(() => {
    return expenseData.reduce((acc, curr) => acc + Number(curr.ex_amount), 0);
  }, [expenseData]);

  const filteredData = expenseData.filter(item => 
    item.ex_source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] p-4 md:p-10 text-white font-sans relative overflow-x-hidden">
      
      {/* Background Glow - Rose Tint */}
      <div className="absolute top-[-5%] left-0 w-full max-w-4xl h-[300px] bg-rose-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
             <Link to="/dashboard" className="p-3 bg-white/5 rounded-2xl hover:bg-rose-500/20 hover:text-rose-400 transition-all border border-white/5">
                <IoArrowBack size={20} />
             </Link>
             <div>
                <h2 className="text-3xl font-black tracking-tighter italic">Expenses</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Capital Outflow</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] rounded-2xl border border-white/10 text-gray-400 focus-within:border-rose-500/50 transition-all group shadow-inner">
               <IoSearchOutline size={18} className="group-focus-within:text-rose-400" />
               <input 
                  type="text" 
                  placeholder="Search expense..." 
                  className="bg-transparent outline-none text-sm w-full md:w-40"
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Link
              to={"/dashboard/expenses/create"}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-500 text-white font-black text-xs tracking-widest hover:bg-rose-400 transition-all shadow-[0_10px_30px_rgba(244,63,94,0.2)]"
            >
              <IoAddOutline size={20} />
              NEW ENTRY
            </Link>
          </div>
        </div>

        {/* --- Analytics Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Spending Card */}
            <div className="md:col-span-2 p-8 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent border border-rose-500/10 rounded-[2.5rem] flex items-center justify-between overflow-hidden relative group">
                <IoAlertCircleOutline className="absolute -right-4 -bottom-4 text-rose-500/5 group-hover:text-rose-500/10 transition-colors" size={180} />
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(244,63,94,0.3)]">
                        <IoTrendingDownOutline size={32} />
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-rose-500 uppercase tracking-[0.25em] mb-1">Monthly Expenditure</p>
                        <h3 className="text-4xl font-black tracking-tighter">₹{totalAmount.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
                <div className="hidden lg:block text-right">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</div>
                    <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold">Budget Active</div>
                </div>
            </div>

            {/* Records Card */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group">
                <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                    <IoReceiptOutline /> Total Records
                </p>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter group-hover:text-rose-400 transition-colors">{expenseData.length}</span>
                    <span className="text-gray-600 font-bold text-sm uppercase">Items</span>
                </div>
            </div>
        </div>

        {/* --- List Body --- */}
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 px-10 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">
            <div className="col-span-4">Information Source</div>
            <div className="col-span-2">Payment Mode</div>
            <div className="col-span-2 text-center">Timestamp</div>
            <div className="col-span-2 text-right">Valuation</div>
            <div className="col-span-2 text-right">Manage</div>
          </div>

          <AnimatePresence mode='popLayout'>
            {filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <motion.div
                  key={data.ex_id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02 }}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 bg-white/[0.01] border border-white/[0.03] rounded-[2.2rem] hover:bg-white/[0.03] hover:border-rose-500/30 transition-all group relative overflow-hidden"
                >
                  {/* Rose Stripe on Hover */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-rose-500 opacity-0 group-hover:opacity-100 transition-all rounded-r-full" />

                  {/* Source */}
                  <div className="col-span-4 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-rose-500 border border-white/5 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                      <IoWalletOutline size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors capitalize leading-none mb-1.5">{data.ex_source}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tight">ID: #{data.ex_id.toString().slice(-6)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="col-span-2 mb-4 md:mb-0">
                    <span className="px-3 py-1.5 bg-rose-500/5 rounded-xl text-[9px] font-black text-rose-400 border border-rose-500/10 uppercase tracking-widest">
                      {data.ex_payment_method || "Digital"}
                    </span>
                  </div>

                  {/* Date/Time */}
                  <div className="col-span-2 text-left md:text-center my-4 md:my-0">
                    <div className="text-sm text-gray-300 font-black tracking-tight">{data.ex_date}</div>
                    <div className="text-[10px] text-gray-600 font-black uppercase mt-1 flex items-center justify-start md:justify-center gap-1">
                        <IoCalendarOutline size={10} /> {data.ex_time}
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2 text-left md:text-right">
                    <div className="text-[10px] text-gray-600 font-black uppercase mb-1">Amount</div>
                    <span className="text-2xl font-black text-rose-500 tracking-tighter group-hover:drop-shadow-[0_0_10px_rgba(244,63,94,0.3)] transition-all">
                      -₹{Number(data.ex_amount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex justify-start md:justify-end items-center gap-3 mt-4 md:mt-0">
                    <Link
                      to={`/dashboard/expenses/${data.ex_id}/edit`}
                      className="p-3.5 bg-white/[0.03] rounded-2xl text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-lg"
                    >
                      <IoCreateOutline size={20} />
                    </Link>
                    <button
                      onClick={() => deleteHandler(data.ex_id)}
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
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IoReceiptOutline size={30} className="text-gray-700" />
                </div>
                <p className="font-black uppercase text-[10px] tracking-[0.4em] text-gray-600">No Expense Records Found</p>
                <Link to="/dashboard/expenses/create" className="text-rose-500 text-[10px] font-black underline mt-4 inline-block hover:text-rose-400">LOG YOUR FIRST EXPENSE</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExpensesIndex;