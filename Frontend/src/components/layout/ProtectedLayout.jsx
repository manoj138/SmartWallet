import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { RemoveSesstionStorage } from '../../services/Api'

const ProtectedLayout = () => {
 const navigate = useNavigate()
  const logout = ()=>{
    RemoveSesstionStorage();
  navigate('/')
  }

  return (
    <div>
    <Link to={'/dashboard'}>dashboard</Link>
     <button onClick={logout}>logout</button>
        <Outlet/>
    </div>
    
  )
}

export default ProtectedLayout