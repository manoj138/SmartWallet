import React from "react";
import { useState } from "react";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
const [regData, setRegData] = useState({
    status:"user",
});
    const navigate = useNavigate()


const inputHandler = (e)=>{
    setRegData({
        ...regData,
        [e.target.name] : e.target.value
    })
}
const submitHandler = async (e)=>{
   e.preventDefault();
    try {
        await Api.post('/register', regData)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">

  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl w-[420px]">

    <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
      📝 Register
    </h1>

    <form onSubmit={submitHandler} className="flex flex-col gap-4">

      <div>
        <label className="text-gray-300">👤 Name</label>
        <input
          type="text"
          name="name"
          value={regData.name || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">🆔 User Name</label>
        <input
          type="text"
          name="user_name"
          value={regData.user_name || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">📧 Email</label>
        <input
          type="email"
          name="email"
          value={regData.email || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="text-gray-300">🔑 Password</label>
        <input
          type="password"
          name="password"
          value={regData.password || ""}
          onChange={inputHandler}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:border-indigo-400"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition shadow-lg"
      >
        🚀 Register
      </button>

    </form>

  </div>

</div>
  );
};

export default RegisterPage;
