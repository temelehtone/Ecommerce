import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from "../helpers/auth";

const UserDashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
          navigate("/sign-in");
        }
      }, [navigate]);

  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard