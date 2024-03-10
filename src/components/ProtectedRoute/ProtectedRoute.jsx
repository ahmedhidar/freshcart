import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../Context/Auth/Auth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

    let {token} = useContext(authContext)
    if(token == null){
        return <Navigate to={"/login"} />
    }
  return (
    <div>
        {children}
    </div>
  )
}
