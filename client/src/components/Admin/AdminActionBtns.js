import React from "react";
// Styles
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { getTranslatedText as t } from "../../translations";

const AdminActionBtns = ({
  handleOpenCategory,
  handleOpenProduct,
  handleOpenOrders,
}) => {
  return (
    <>
      <Button onClick={handleOpenCategory} sx={{ mx: 2 }}>
        <AddIcon />
        {t('ADD_CATEGORY')}
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleOpenProduct}>
        <AddIcon />
        {t('ADD_PRODUCT')}
      </Button>
      <Button sx={{ mx: 2 }} onClick={handleOpenOrders}>
        <CreditCardIcon />
        {t('VIEW_ORDERS')}
      </Button>
    </>
  );
};

export default AdminActionBtns;
