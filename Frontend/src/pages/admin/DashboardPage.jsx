import React from 'react'
import { useState } from 'react'
import { Api } from '../../services/Api';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const DashboardPage = () => {
  
  const [incomeData, setIncomeData] =useState([]);
  console.log("🚀 ~ DashboardPage ~ incomeData:", incomeData)

  const fetchIncome = async()=>{
try {
 const res =  await Api.get('/income')
   setIncomeData(res.data.data)
} catch (error) {
  console.log(error)
}
  }

  const totalIncome = incomeData.reduce((total, item) => {
  return total + Number(item.income_amount);
}, 0);
 
  useEffect(()=>{
    fetchIncome()
  }, [])
  return (
<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-10 text-white">

  <div className="grid md:grid-cols-2 gap-8 mt-10">

    {/* Income Card */}
    <div className="backdrop-blur-xl bg-white/5 border border-green-400/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

      <Link
        to="/dashboard/incomes"
        className="text-lg font-semibold text-green-300 hover:text-green-200"
      >
        📊 View Incomes
      </Link>

      <h2 className="text-4xl font-bold text-green-400 mt-4">
        💰 ₹ {totalIncome}
      </h2>

      <p className="text-gray-400 mt-2">
        Total Income
      </p>

    </div>

    {/* Expense Card */}
    <div className="backdrop-blur-xl bg-white/5 border border-red-400/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

      <Link
        to="/dashboard/expenses"
        className="text-lg font-semibold text-red-300 hover:text-red-200"
      >
        📉 View Expenses
      </Link>

      <h2 className="text-4xl font-bold text-red-400 mt-4">
        {/* 💸 ₹ {totalExpense} */}
      </h2>

      <p className="text-gray-400 mt-2">
        Total Expense
      </p>

    </div>

  </div>

</div>
  )
}

export default DashboardPage
