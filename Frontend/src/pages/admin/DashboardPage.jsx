import React, { useState, useEffect } from "react";
import { Api, RemoveSesstionStorage } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {  IoLogOutOutline } from "react-icons/io5";

const DashboardPage = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("users"));

  // Fetch Income
  const fetchIncome = async () => {
    try {
      const res = await Api.get("/income");

      setIncomeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Expense
  const fetchExpense = async () => {
    try {
      const res = await Api.get("/expense");

      setExpenseData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Total Income
  const totalIncome = incomeData.reduce((total, item) => {
    return total + Number(item.income_amount);
  }, 0);

  // Total Expense
  const totalExpense = expenseData.reduce((total, item) => {
    return total + Number(item.ex_amount);
  }, 0);

  // Balance
  const balance = totalIncome - totalExpense;

  // Merge Transactions
  const transactions = [
    ...incomeData.map((i) => ({
      date: i.income_date,
      amount: Number(i.income_amount),
    })),
    ...expenseData.map((e) => ({
      date: e.ex_date,
      amount: -Number(e.ex_amount),
    })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Running Balance
  let balanceValue = 0;

  const chartData = transactions.map((t) => {
    balanceValue += t.amount;

    return {
      date: t.date,
      balance: balanceValue,
    };
  });

  // colors
  const COLORS = ["#22c55e", "#ef4444", "#facc15", "#6366f1"]; // Green, Red, Yellow, Indigo

  // Logout
  const logout = () => {
    RemoveSesstionStorage();

    navigate("/");
  };

  useEffect(() => {
    fetchIncome();
    fetchExpense();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* Sidebar */}
      <div className="w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          🏦 SmartWallet
        </h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            📊 Dashboard
          </Link>

          <Link
            to="/dashboard/incomes"
            className="px-4 py-2 rounded-lg hover:bg-green-500/20 transition"
          >
            💰 Incomes
          </Link>

          <Link
            to="/dashboard/expenses"
            className="px-4 py-2 rounded-lg hover:bg-red-500/20 transition"
          >
            💸 Expenses
          </Link>

          <Link
            to="/dashboard/settings"
            className="px-4 py-2 rounded-lg hover:bg-purple-500/20 transition"
          >
            ⚙️ Settings
          </Link>

     <button
  onClick={logout}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition"
>
  <IoLogOutOutline size={20} />
  Logout
</button>
        </nav>
      </div>

      {/* Main */}
     <div className="flex-1 p-10 space-y-10">

  {/* Welcome Header */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
    <h1 className="text-3xl font-bold">
      👋 Hello, <span className="text-purple-400">{user?.name}</span>
    </h1>
    <p className="text-gray-400">Here’s your financial overview</p>
  </div>

  {/* Top Stats: Cards */}
  <div className="grid md:grid-cols-3 gap-6">
    <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500/20 to-green-700/10 shadow-lg hover:scale-105 transition transform">
      <h3 className="text-gray-200 font-semibold mb-2">💰 Total Income</h3>
      <p className="text-3xl font-bold text-green-400">₹ {totalIncome}</p>
    </div>

    <div className="p-6 rounded-3xl bg-gradient-to-br from-red-500/20 to-red-700/10 shadow-lg hover:scale-105 transition transform">
      <h3 className="text-gray-200 font-semibold mb-2">💸 Total Expense</h3>
      <p className="text-3xl font-bold text-red-400">₹ {totalExpense}</p>
    </div>

    <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-700/10 shadow-lg hover:scale-105 transition transform">
      <h3 className="text-gray-200 font-semibold mb-2">💳 Current Balance</h3>
      <p className="text-3xl font-bold text-purple-400">₹ {balance}</p>
    </div>
  </div>

  {/* Analytics Section */}
  <div className="grid md:grid-cols-2 gap-6">

    {/* Balance Trend LineChart */}
    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-indigo-400/20 shadow-lg">
      <h3 className="text-indigo-300 font-semibold mb-4">📈 Balance Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip formatter={(value) => `₹ ${value}`} />
          <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>

 
  </div> 

  {/* Recent Transactions + Tips */}
  <div className="grid md:grid-cols-3 gap-6">

    {/* Recent Transactions */}
    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-lg border border-gray-400/20 shadow-lg max-h-80 ">
      <h3 className="text-gray-300 font-semibold mb-4">🕒 Recent Transactions</h3>
      {transactions.slice(-5).reverse().map((t, idx) => (
        <div
          key={idx}
          className={`flex justify-between p-2 mb-2 rounded-lg ${
            t.amount > 0 ? "bg-green-500/10" : "bg-red-500/10"
          }`}
        >
          <span className="text-gray-200">{t.date}</span>
          <span className={`font-semibold ${t.amount > 0 ? "text-green-400" : "text-red-400"}`}>
            {t.amount > 0 ? `+₹ ${t.amount}` : `-₹ ${Math.abs(t.amount)}`}
          </span>
        </div>
      ))}
    </div>

    {/* Quick Tips */}
    <div className="p-6 rounded-3xl bg-yellow-500/10 backdrop-blur-lg border border-yellow-400/20 shadow-lg">
      <h3 className="text-yellow-300 font-semibold mb-2">💡 Tip</h3>
      <p className="text-gray-300">You spent 20% more on dining this month. Try to save more!</p>
    </div>

    <div className="p-6 rounded-3xl bg-green-500/10 backdrop-blur-lg border border-green-400/20 shadow-lg">
      <h3 className="text-green-300 font-semibold mb-2">📈 Insight</h3>
      <p className="text-gray-300">Your income increased by 15% compared to last month. Great job!</p>
    </div>
  </div>
</div>
    </div>
  );
};

export default DashboardPage;
