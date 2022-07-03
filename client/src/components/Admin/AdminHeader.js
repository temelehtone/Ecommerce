import React from 'react'
// Styles
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FlexBox, theme } from "../styles/styles"
import AdminActionBtns from './AdminActionBtns';

const AdminHeader = ({ handleOpenCategory, handleOpenProduct, handleOpenOrders }) => {

  return (
      <>
    <FlexBox sx={{ backgroundColor: theme.palette.primary.color7, color: "white" }}>
        <DashboardIcon sx={{ mr: 3, fontSize: 50 }} />
        <h1>Dashboard</h1>
      </FlexBox>
      <FlexBox>
        <AdminActionBtns handleOpenCategory={handleOpenCategory} handleOpenProduct={handleOpenProduct} handleOpenOrders={handleOpenOrders} />
      </FlexBox>
      </>
  )
}

export default AdminHeader