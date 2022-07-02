import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getTranslatedText as t } from "../translations";
// Styles

import { Typography, Box } from "@mui/material";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { FlexBox } from "./styles";
import RouteToProduct from "./RouteToProduct";
import RouteToCategory from "./RouteToCategory";

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { product } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  return (
    <>
      {product ? (
        <>
        <RouteToProduct product={product}/>
          <FlexBox></FlexBox>{" "}
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
