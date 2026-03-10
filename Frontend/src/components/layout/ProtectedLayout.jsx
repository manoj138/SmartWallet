import React from 'react'
import { Link, Outlet} from 'react-router-dom'


const ProtectedLayout = () => {


  return (
    <div>
        <div>
          <Outlet/>
        </div>
    </div>
  )
}

export default ProtectedLayout