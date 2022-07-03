import React from "react";
// Styles

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box, IconButton, Button, TextField } from "@mui/material";
// Localization
import { getTranslatedText as t } from "../../translations";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../redux/constants/cartConstants";
import { useNavigate } from "react-router-dom";

const CartTable = () => {
  const { cart } = useSelector((state) => state.cart);
const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleQuantityChange = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    cart.forEach((cartItem) => {
      if (cartItem._id === product._id) {
        cartItem.count = e.target.value;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: ADD_TO_CART,
      payload: cart,
    });
  };

  const removeItemFromCart = (e, product) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    
     const newCart = cart.filter(cartItem => cartItem._id !== product._id);
     localStorage.setItem("cart", JSON.stringify(newCart));
    dispatch({
      type: ADD_TO_CART,
      payload: newCart,
    });
  };

  const handleAddClick = (e, product) => {};
  const handleRemoveClick = (e, product) => {};

  return (
    <>
      <Box
        sx={{
          p: { md: 6},
          mt: 2,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          {cart.map((p) => (
            <Box
              sx={{
                display: { md: "flex" },
                alignItems: "center",
                m: 2,
                p: 1,
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "10px",
                height: { md: "100px" },
              }}
            >
              <Box sx={{ display: "flex", width: { sx: "100%", md: "50%" } }}>
                <img
                  src={`http://localhost:5000/uploads/${p.fileName}`}
                  alt="product img"
                  style={{ width: "100px", margin: "5px" }}
                />

                <Box
                  sx={{
                   
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a href={`/shop/product/${p._id}`}>
                    <Typography variant="body2">{p.productName}</Typography>
                  </a>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: { sx: "100%", md: "50%" },
                  alignItems: "center",
                }}
              >
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  {p.count === 1 ? (
                    <IconButton onClick={(e) => removeItemFromCart(e, p)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={(e) => handleRemoveClick(e, p)}>
                      <RemoveCircleOutlineIcon sx={{ color: "red" }} />
                    </IconButton>
                  )}
                  <TextField
                    type="number"
                    value={p.count}
                    min="1"
                    max={p.productQuantity}
                    onChange={(e) => handleQuantityChange(e, p)}
                    sx={{ width: "60px" }}
                    className="hideNumberArrows"
                  />
                  <IconButton onClick={(e) => handleAddClick(e, p)}>
                    <AddCircleIcon sx={{ color: "green" }} />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    justifyContent: "flex-end",
                    display: "flex",
                  }}
                >
                  <Typography variant="h8">
                    {" "}
                    {(p.productPrice * p.count).toLocaleString("fi", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        
        <Box
          sx={{
            width: "100%",
            border: "1px solid black",
            borderRadius: "10px",
            my: 4,
            minHeight: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", lg: "row"}
          }}
        >
            <Box sx={{ m: 3 }}>
            <Button onClick= {() => navigate(-1)}>{t('GO_BACK_SHOPPING')}</Button>
        </Box>
          <Box sx={{ m: 2, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <Box sx={{ display: "flex"}}>
            <Typography variant="body2">
              {cart.length === 1
                ? `1 ${t("ITEM")}`
                : `${cart.length} ${t("ITEMS")},`}
            </Typography>
            &nbsp;
            <Typography variant="body2" sx={{ color: "red"}}>
              {t("TOTAL")}:{" "}
              {cart
                .reduce(
                  (currentSum, currentCartItem) =>
                    currentSum +
                    currentCartItem.count * currentCartItem.productPrice,
                  0
                )
                .toLocaleString("fi", {
                  style: "currency",
                  currency: "EUR",
                })}
            </Typography>
            </Box>
            <Box>
                <Button>{t('PROCEED_TO_CHECKOUT')}</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartTable;
