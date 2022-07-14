import React from "react";
import { Link } from "react-router-dom";
// Styles
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import HomeIcon from "@mui/icons-material/Home";
import { Box } from "@mui/system";

// Redux

const RouteToCategory = ({ category }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Link to="/">
        <HomeIcon />
      </Link>
      <ArrowRightIcon />
      <Link to={`/shop/category/${category._id}`}>
        {category && category.category}
      </Link>
    </Box>
  );
};

export default RouteToCategory;
