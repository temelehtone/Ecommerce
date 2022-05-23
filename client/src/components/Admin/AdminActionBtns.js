import React from 'react'
// Styles
import { StyledButton } from "./styles"
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";



const AdminActionBtns = ({ handleOpenCategory, handleOpenProduct, handleOpenOrders }) => {
  return (
    <>
    <StyledButton
          sx={{
            color: "secondary.green",
            borderColor: "secondary.green",
            "&:hover": { bgcolor: "secondary.greenHover" },
          }}
          onClick={handleOpenCategory}
        >
          <AddIcon />
          Add Category
        </StyledButton>
        <StyledButton
          sx={{
            color: "secondary.blue",
            borderColor: "secondary.blue",
            "&:hover": { bgcolor: "secondary.blueHover" },
          }}
          onClick={handleOpenProduct}
        >
          <AddIcon />
          Add Product
        </StyledButton>
        <StyledButton
          sx={{
            color: "secondary.red",
            borderColor: "secondary.red",
            "&:hover": { bgcolor: "secondary.redHover" },
          }}
          onClick={handleOpenOrders}
        >
          <CreditCardIcon />
          View Orders
        </StyledButton>
    </>
  )
}

export default AdminActionBtns