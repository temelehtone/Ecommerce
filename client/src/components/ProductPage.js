import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTranslatedText as t } from "../translations";
// Styles

import { Typography, Box, Button, Badge } from "@mui/material";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

import RouteToProduct from "./RouteToProduct";


const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <>
      {product ? (
        <>
          <RouteToProduct product={product} />
          <Box sx={{ p: 1 }}>
            <Typography variant="h6">{product.productName}</Typography>
            <Box sx={{ display: { md: "flex" } }}>
              <Box sx={{ textAlign: "center", flexGrow: 1, mx: 3 }}>
                <img
                  src={`http://localhost:5000/uploads/${product.fileName}`}
                  alt="product img"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: { md: "300px" },
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" sx={{ color: "red", my: 2 }}>
                  {product.productPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
                <Typography variant="body2" sx={{ my: 2 }}>
                  {product.productDescription}
                </Typography>

                {product.productQuantity === 0 ? (
                  <Typography variant="h6" sx={{ color: "red" }}>
                    {t("OUT_OF_STOCK")}
                  </Typography>
                ) : (
                  <Typography variant="h6" sx={{ color: "green" }}>
                    {t("IN_STORAGE")}:{" "}
                    {product.productQuantity > 10
                      ? "+10"
                      : product.productQuantity}
                  </Typography>
                )}

                <Badge badgeContent={2} color="error">
                  <Button disabled={product.productQuantity === 0 ? true : false} onClick={handleAddToCart}>{t("ADD_TO_CART")}</Button>
                </Badge>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h2">{t("PRODUCT_NOT_FOUND")}</Typography>
          <a href="/">
            <h2>Return back to homepage</h2>
          </a>
        </Box>
      )}
    </>
  );
};

export default ProductPage;
