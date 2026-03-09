import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const IncomeIndex = () => {
  const [incomeData, setIncomeData] = useState([]);

  const fetchIncome = async () => {
    try {
      const res = await Api.get("/income");
      
      setIncomeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
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
      to={"/dashboard/incomes/create"}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:scale-105 transition text-center"
    >
      ➕ Add Income
    </Link>

  </div>

  {/* Income Cards */}
  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

    {incomeData.length > 0 ? (
      incomeData.map((data, index) => (

        <div
          key={data.income_id}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
        >

          <div className="text-xs text-gray-400 mb-2">
            📌 Transaction #{index + 1}
          </div>

          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            🏦 {data.income_source}
          </h3>

          <p className="text-3xl font-bold text-green-400 mb-4">
            ₹ {data.income_amount}
          </p>

          <p className="text-gray-400 text-sm">
            📅 {data.income_date} &nbsp; ⏰ {data.income_time}
          </p>

          <div className="flex gap-4 mt-6">

            <Link
              to={`/dashboard/incomes/${data.income_id}/edit`}
              className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-md transition"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={() => deleteHandler(data.income_id)}
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
  );
};

export default IncomeIndex;
