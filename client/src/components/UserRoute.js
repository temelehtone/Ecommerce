import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../helpers/auth'

const UserRoute = ({ children }) => {
  
    if (isAuthenticated()) {
        return children;
    }
    return <Navigate to="/sign-in" />

    
}

export default UserRoute