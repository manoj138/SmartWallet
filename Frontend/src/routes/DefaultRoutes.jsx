import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import PublicLayout from "../components/Layout/PublicLayout";
import ProtectedLayout from "../components/Layout/ProtectedLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardPage from "../pages/admin/DashboardPage";
import IncomeIndex from "../pages/income/IncomeIndex";
import IncomeCreate from "../pages/income/IncomeCreate";
import IncomeEdit from "../pages/income/IncomeEdit";
import ExpenseCreate from "../pages/expense/ExpenseCreate";
import ExpenseEdit from "../pages/expense/ExpenseEdit";
import ExpensesIndex from "../pages/expense/ExpensesIndex";

const DefaultRoutes = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // Redirect based on token
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="registers" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route index element={<DashboardPage />} />
        {/* Income */}
        <Route path="incomes" element={<IncomeIndex />} />
        <Route path="incomes/create" element={<IncomeCreate />} />
        <Route path="incomes/:id/edit" element={<IncomeEdit />} />
        {/* Expense */}
        <Route path="expenses" element={<ExpensesIndex/>} />
        <Route path="expenses/create" element={<ExpenseCreate/>} />
        <Route path="expenses/:id/edit" element={<ExpenseEdit />} />
      </Route>
    </Routes>
  );
};

export default DefaultRoutes;
