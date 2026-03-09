import React from 'react'
import { Link, Outlet} from 'react-router-dom'
import NavBar from '../comman/NavBar'

const ProtectedLayout = () => {


  return (
    <div>
 <NavBar/>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}

export default ProtectedLayout