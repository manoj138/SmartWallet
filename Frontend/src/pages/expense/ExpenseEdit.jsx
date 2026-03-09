import React from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useEffect } from 'react';

const ExpenseEdit = () => {
  const [expenseData, setExpenseData]=useState({});
const navigate = useNavigate()
  const {id} = useParams();
  
  const fetchExpnese = async ()=>{
    try {
      const res = await Api.get(`/expense/${id}/find`)
        setExpenseData(res.data.data)
    } catch (error) {
      console.log(error)
      
    }
  }

  const inputHandler = (e)=>{
    setExpenseData({
      ...expenseData,
     [e.target.name] : e.target.value
    })
  }

  const submitHandler = async (e)=>{
    e.preventDefault()
  try {
    await Api.put(`/expense/${id}/update`, expenseData);
    navigate('/dashboard/expenses')
  } catch (error) {
    console.log(error);
  }
  }
  
  useEffect(()=>{
    fetchExpnese()
  }, [])
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
    
  <div className="w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

    {/* Back Button */}
    <Link
      to="/dashboard/expenses"
      className="inline-block mb-4 text-sm text-indigo-400 hover:text-indigo-300 transition"
    >
      ← Back
    </Link>

    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
      💸 Edit Expense
    </h2>

    <form onSubmit={submitHandler} className="flex flex-col gap-4">

      <div>
        <label className="text-gray-300">🏷️ Expense Source</label>
        <input
          type="text"
          name="ex_source"
          value={expenseData.ex_source || ""}
          onChange={inputHandler}
          required
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">💵 Amount</label>
        <input
          type="number"
          name="ex_amount"
          value={expenseData.ex_amount || ""}
          onChange={inputHandler}
          min="0"
          required
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">💳 Payment Method</label>
        <select
          name="ex_payment_method"
          value={expenseData.ex_payment_method || ""}
          onChange={inputHandler}
          required
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        >
          <option value="" className='text-black bg-gray-500'>Select Payment Method</option>
          <option value="Cash" className='text-black bg-gray-500' >💸 Cash</option>
          <option value="UPI" className='text-black bg-gray-500'>📲 UPI</option>
          <option value="Net Banking" className='text-black bg-gray-500'>🏦 Net Banking</option>
          <option value="Debit Card" className='text-black bg-gray-500'>💳 Debit Card</option>
          <option value="Credit Card" className='text-black bg-gray-500'>💳 Credit Card</option>
        </select>
      </div>

      <div>
        <label className="text-gray-300">📅 Date</label>
        <input
          type="date"
          name="ex_date"
          value={expenseData.ex_date || ""}
          onChange={inputHandler}
          required
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">⏰ Time</label>
        <input
          type="time"
          name="ex_time"
          value={expenseData.ex_time || ""}
          onChange={inputHandler}
          required
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition shadow-lg"
      >
        ➕ Edit Expense
      </button>

    </form>
  </div>
</div>
  )
}

export default ExpenseEdit