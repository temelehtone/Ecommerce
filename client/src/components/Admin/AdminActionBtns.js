import React from "react";
// Styles
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const AdminActionBtns = ({
  handleOpenCategory,
  handleOpenProduct,
  handleOpenOrders,
}) => {
  return (
    <>
      <Button onClick={handleOpenCategory} sx={{ mx: 2 }}>
        <AddIcon />
        Add Category
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleOpenProduct}>
        <AddIcon />
        Add Product
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleOpenOrders}>
        <CreditCardIcon />
        View Orders
      </Button>
    </>
  );
};

export default AdminActionBtns;
