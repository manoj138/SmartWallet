import React from 'react'
import { Link, Outlet} from 'react-router-dom'
import NavBar from '../comman/NavBar'

const ProtectedLayout = () => {


  return (
    <div>
 <NavBar/>
        <Outlet/>
    </div>
  )
}

export default ProtectedLayout