import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "./ProductCard";
import NotFound from "./NotFound";
// Styles
import { FlexBox, GridBox } from "./styles";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/actions/categoryActions";
import { getProductsByCategory } from "../redux/actions/productActions";
import { Typography } from "@mui/material";

import { getTranslatedText as t } from "../translations";
import RouteToCategory from "./RouteToCategory";

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.categories);
  const { categoryProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getCategory(categoryId));
    dispatch(getProductsByCategory(categoryId));
  }, [dispatch, categoryId]);
  return (
    <>
      
      {category ? (
        <>
        <RouteToCategory category={category} />
          <h1>{category.category}</h1>
          <FlexBox sx={{flexDirection: 'column'}}>
            {categoryProducts && categoryProducts.length > 0 ? (
              <GridBox>
                {categoryProducts.map((p) => (
                  <ProductCard p={p} key={p._id} />
                ))}
              </GridBox>
            ) : (
              <>
              <Typography variant="h2">{t("NO_PRODUCTS_FOUND")}</Typography>
              <a href='/'><h2>Return back to homepage</h2></a>
              </>
            )}
          </FlexBox>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default CategoryProductsPage;
