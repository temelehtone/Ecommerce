import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { isAuthenticated } from '../helpers/auth';

const AdminDashboard = () => {
    const navigate = useNavigate()

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard