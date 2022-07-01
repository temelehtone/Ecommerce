import React from 'react'
// Styles
import { StyledButton } from "../styles"
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";



const AdminActionBtns = ({ handleOpenCategory, handleOpenProduct, handleOpenOrders }) => {
  return (
    <>
    <StyledButton
          onClick={handleOpenCategory}
        >
          <AddIcon />
          Add Category
        </StyledButton>
        <StyledButton
    
          onClick={handleOpenProduct}
        >
          <AddIcon />
          Add Product
        </StyledButton>
        <StyledButton
     
          onClick={handleOpenOrders}
        >
          <CreditCardIcon />
          View Orders
        </StyledButton>
    </>
  )
}

export default AdminActionBtns