import React from 'react'
import { useState } from 'react'
import { Api, stores } from '../../services/Api';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const [logData, setLogData]= useState({});
    const navigate = useNavigate()
const inputHandler = (e)=>{
    setLogData({
        ...logData,
        [e.target.name] : e.target.value
    })
}

const submitHandler = async(e)=>{
 e.preventDefault()
try {
 const data = await Api.post("/login", logData);
    if(data.data.token){
        stores(data.data.token, data.data.findUser)
        navigate('/dashboard')
    }
} catch (error) {
    console.log(error)
}
 
}
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">

  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl w-[400px]">

    <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
      🔐 Login
    </h1>

    <form onSubmit={submitHandler} className="flex flex-col gap-4">

      <div>
        <label className="text-gray-300">📧 Email</label>
        <input
          type="email"
          name="email"
          value={logData.email || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">🔑 Password</label>
        <input
          type="password"
          name="password"
          value={logData.password || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition shadow-lg"
      >
        🚀 Login
      </button>

    </form>

    <p className="text-center text-gray-400 mt-6">
      Don't have an account?{" "}
      <Link
        to="/registers"
        className="text-indigo-400 hover:text-indigo-300"
      >
        ✨ Sign Up
      </Link>
    </p>

  </div>

</div>
  )
}

export default LoginPage