import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../helpers/auth'

const AdminRoute = ({ children }) => {
  
    if (isAuthenticated()) {
        if (isAuthenticated().role === 1) {
            return children
        } else if (isAuthenticated().role === 0) {
            return <Navigate to="/user/dashboard" />
            
        }
    }
    return <Navigate to="/sign-in" />

    
}

export default AdminRoute