import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

const IncomeCreate = () => {
  const [incomeData, setIncomeData] = useState({});
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/income/store", incomeData);
      navigate("/dashboard/incomes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Back Button */}
        <Link
          to="/dashboard/incomes"
          className="inline-block mb-4 text-sm text-indigo-400 hover:text-indigo-300 transition"
        >
          ← Back
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
          💰 Add Income
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-300">🏦 Source</label>
            <input
              type="text"
              name="income_source"
              value={incomeData.income_source || ""}
              onChange={inputHandler}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-gray-300">💵 Amount</label>
            <input
              type="number"
              name="income_amount"
              step="0.01"
              min="0"
              value={incomeData.income_amount || ""}
              onChange={inputHandler}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-gray-300">📅 Date</label>
            <input
              type="date"
              name="income_date"
              value={incomeData.income_date || ""}
              onChange={inputHandler}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-gray-300">⏰ Time</label>
            <input
              type="time"
              name="income_time"
              value={incomeData.income_time || ""}
              onChange={inputHandler}
              required
              className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition shadow-lg"
          >
            ➕ Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default IncomeCreate;
