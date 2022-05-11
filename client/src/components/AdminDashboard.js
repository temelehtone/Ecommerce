import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../helpers/auth';

const AdminDashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated()) {
          if (isAuthenticated().role === 0) {
            navigate("/user/dashboard")
          }
        } else {
          navigate("/sign-in");
        }
      }, [navigate]);

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard