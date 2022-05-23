import React from 'react'
// Styles
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FlexBox } from "./styles"
import AdminActionBtns from './AdminActionBtns';

const AdminHeader = ({ handleOpenCategory, handleOpenProduct, handleOpenOrders }) => {

  return (
      <>
    <FlexBox sx={{ bgcolor: "#353535" }} >
        <DashboardIcon sx={{ mr: 3, color: "white", fontSize: 50 }} />
        <h1 style={{ color: "white" }}>Dashboard</h1>
      </FlexBox>
      <FlexBox sx={{ bgcolor: "#DADADA" }}>
        <AdminActionBtns handleOpenCategory={handleOpenCategory} handleOpenProduct={handleOpenProduct} handleOpenOrders={handleOpenOrders} />
      </FlexBox>
      </>
  )
}

export default AdminHeader