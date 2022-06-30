import React from "react";
import { useNavigate } from "react-router-dom";

import { List, ListItemButton, ListItemText } from "@mui/material";
import { CategoryDrawer } from "./styles";

// Redux
import { useSelector } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const CategoriesDiv = ({ categoryOpen, setCategoryOpen }) => {
  const { categories } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  return (
    <CategoryDrawer variant="permanent" open={categoryOpen} >
      <List component="nav" sx={{paddingTop: "6px"}}>
        {categories &&
          categories.map((c) => (
            <ListItemButton key={c._id} value={c._id} sx={{ borderTop: '1px solid black', borderBottom: '1px solid black' }} onClick={() => navigate(`/shop/category/${c._id}`)}>
            <ListItemText sx= {{ flexGrow: 1}}>
              {c.category}
            </ListItemText>
            <ArrowRightIcon sx={{ borderLeft: '1px solid black', height: "100%", fontSize: "30px"}} />
            </ListItemButton>
          ))}
      </List>
    </CategoryDrawer>
  );
};

export default CategoriesDiv;
