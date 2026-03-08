import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const IncomeIndex = () => {
     const [incomeData, setIncomeData] =useState([]);

     const fetchIncome = async ()=>{
        try {
            const res = await Api.get('/income');
            console.log("🚀 ~ fetchIncome ~ res:", res)
            setIncomeData(res.data.data)
        } catch (error) {
            console.log( error)
        }
     }

     const deleteHandler = async(id) =>{
       
        try {
            await Api.delete(`/income/${id}/delete`)
            fetchIncome()
        } catch (error) {
            console.log(error)   
        }
     }

     useEffect(()=>{
        fetchIncome()
     }, [])
  return (
<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-10 text-white">

  {/* Header */}
  <div className="flex justify-between items-center mb-10">
    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
      💰 Income Dashboard
    </h2>

    <Link
      to={"/dashboard/incomes/create"}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition"
    >
      ➕ Add Income
    </Link>
  </div>

  {/* Income Cards */}
  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

    {incomeData.map((data, index) => (
      <div
        key={data.income_id}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 shadow-2xl hover:scale-105 transition"
      >

        <div className="text-sm text-gray-400 mb-2">
          📌 #{index + 1}
        </div>

        <h3 className="text-2xl font-semibold mb-3">
          🏦 {data.income_source}
        </h3>

        <p className="text-3xl font-bold text-green-400 mb-4">
          💵 ₹ {data.income_amount}
        </p>

        <p className="text-gray-400 text-sm">
          📅 {data.income_date} ⏰ {data.income_time}
        </p>

        <div className="flex gap-4 mt-6">

          <Link
            to={`/dashboard/incomes/${data.income_id}/edit`}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-md"
          >
            ✏️ Edit
          </Link>

          <button
            onClick={() => deleteHandler(data.income_id)}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 shadow-md"
          >
            🗑 Delete
          </button>

        </div>

      </div>
    ))}

  </div>

</div>
  );
};

export default IncomeIndex;
