import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../services/Api";
import { useEffect } from "react";

const IncomeEdit = () => {
  const [incomeData, setIncomeData] = useState({});
  const navigate = useNavigate();
  const {id} = useParams()

  const fetchIncome = async () =>{
     try {
     const res = await Api.get(`/income/${id}/find`)
     setIncomeData(res.data.data)
     } catch (error) {
        console.log(error)
     }
  }

  const inputHandler = (e) => {
    setIncomeData({
      ...incomeData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`/income/${id}/update`, incomeData);
      navigate("/dashboard/incomes");
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
   fetchIncome()
}, [])
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Source</label>
        <input
          type="text"
          name="income_source"
          value={incomeData.income_source || ""}
          onChange={inputHandler}
          required
        />

        <label>Amount</label>
        <input
          type="number"
          name="income_amount"
          step="0.01"
          min="0"
          value={incomeData.income_amount || ""}
          onChange={inputHandler}
          required
        />

        <label>Date</label>
        <input
          type="date"
          name="income_date"
          value={incomeData.income_date || ""}
          onChange={inputHandler}
          required
        />

        <label>Time</label>
        <input
          type="time"
          name="income_time"
          value={incomeData.income_time || ""}
          onChange={inputHandler}
          required
        />

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default IncomeEdit;
