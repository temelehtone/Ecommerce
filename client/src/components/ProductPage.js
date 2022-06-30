import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "./ProductCard";
// Styles

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productActions";

const ProductPage = () => {
    const { productId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);
  return (
    <>
      {product && <ProductCard p={product}/>}
    </>
  );
}

export default ProductPage