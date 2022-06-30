import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "./ProductCard";
// Styles
import { FlexBox, GridBox } from "./styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/actions/categoryActions";
import { getProductsByCategory } from "../redux/actions/productActions";

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { category } = useSelector((state) => state.categories);
  const { categoryProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategory(categoryId));
    dispatch(getProductsByCategory(categoryId));
  }, [dispatch, categoryId]);
  return (
    <>
      <h1>{category ? category.category : null}</h1>

      <FlexBox>
        <GridBox>
          {categoryProducts &&
            categoryProducts.map((p) => <ProductCard p={p} key={p._id} />)}
        </GridBox>
      </FlexBox>
    </>
  );
};

export default CategoryProductsPage;
