import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '../../services/Api'
import { IoArrowBack } from 'react-icons/io5'

const ExpensesIndex = () => {
 const [expenseData, setExpenseData]=useState({})

 const fetchExpnese = async()=>{
  try {
    const res = await Api.get('/expense')
    console.log("🚀 ~ fetchExpnese ~ res:", res)
    setExpenseData(res.data.data)
  } catch (error) {
    console.log( error.message)
  
  }
 }

 const deleteHandler = async(id)=>{
  try {
    await Api.delete(`/expense/${id}/delete`)
    fetchExpnese();
  } catch (error) {
    console.log(error.message)
  }
 }

 useEffect(()=>{
fetchExpnese()
 }, [])

  return (
     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-6 md:p-10 text-white">
    
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10">
    
        <Link
          to="/dashboard"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 hover:scale-110 transition"
        >
          <IoArrowBack size={20} />
        </Link>
    
        <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
           Income 
        </h2>
    
        <Link
          to={"/dashboard/expenses/create"}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition text-center"
        >
          ➕ Add Expense
        </Link>
    
      </div>
    
      {/* Income Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
    
        {expenseData.length > 0 ? (
          expenseData.map((data, index) => (
    
            <div
              key={data.ex_id}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
            >
    
              <div className="text-xs text-gray-400 mb-2">
                📌 Transaction #{index + 1}
              </div>
    
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                🏦 {data.ex_source}
              </h3>
    
              <p className="text-3xl font-bold text-green-400 mb-4">
                ₹ {data.ex_amount}
              </p>
    
              <p className="text-gray-400 text-sm">
                📅 {data.ex_date} &nbsp; ⏰ {data.ex_time}
              </p>
    
              <div className="flex gap-4 mt-6">
    
                <Link
                  to={`/dashboard/expenses/${data.ex_id}/edit`}
                  className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-md transition"
                >
                  ✏️ Edit
                </Link>
    
                <button
                  onClick={() => deleteHandler(data.ex_id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 shadow-md transition"
                >
                  🗑 Delete
                </button>
    
              </div>
    
            </div>
    
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No Income Data Found 💸
          </div>
        )}
    
      </div>
    
    </div>
  )
}

export default ExpensesIndex