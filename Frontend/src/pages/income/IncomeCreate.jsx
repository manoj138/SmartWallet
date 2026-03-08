import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const IncomeCreate = () => {
         const [incomeData, setIncomeData] =useState({});
         const navigate = useNavigate()

         const inputHandler =(e)=>{
            setIncomeData({
                ...incomeData,
                [e.target.name] : e.target.value
            })
         }
const submitHandler = async(e)=>{
    e.preventDefault()
try {
    await Api.post('/income/store', incomeData);
    navigate('/dashboard/incomes')
} catch (error) {
    console.log(error)
}
}
  return (
    <div>
    <form onSubmit={submitHandler}>
  <label>Source</label>
  <input type="text" name="income_source" value={incomeData.income_source || ''} onChange={inputHandler} required />

  <label>Amount</label>
  <input type="number" name="income_amount" step="0.01" min="0" value={incomeData.income_amount || ''} onChange={inputHandler}  required />

  <label>Date</label>
  <input type="date" name="income_date" value={incomeData.income_date || ''} onChange={inputHandler}  required />

  <label>Time</label>
  <input type="time" name="income_time" value={incomeData.income_time || ''} onChange={inputHandler}  required />

  <button type="submit">Add Income</button>
</form>
    </div>
  );
};

export default IncomeCreate;
