import React from "react";
import { useNavigate } from "react-router-dom";

import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  IconButton,
  Zoom,
 Slide,
} from "@mui/material";
import { CategoryDrawer, theme } from "./styles";

// Redux
import { useSelector } from "react-redux";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const CategoriesDiv = ({ categoryOpen, setCategoryOpen }) => {
  const { categories } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  return (
    <Slide in={categoryOpen}  style={{}}>
    <CategoryDrawer variant="permanent" open={categoryOpen}>
      
      <List component="nav" sx={{ padding: 0, border: "1px solid black" }}>
      <Slide in={categoryOpen} direction="right" style={{transitionDelay: "0.3s"}}>
        <ListItem
          sx={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            height: "50px",
            bgcolor: theme.palette.primary.color4,
          }}
        >
          <IconButton onClick={() => setCategoryOpen(false)}>
            <ArrowLeftIcon
              
              sx={{
                color: "white",
                height: "100%",
                fontSize: "30px",
              }}
            />
          </IconButton>

          <ListItemText sx={{ flexGrow: 1 }}>Categories</ListItemText>
        </ListItem>
        </Slide>
        {categories &&
          categories.map((c) => (
            <ListItemButton
              key={c._id}
              value={c._id}
              sx={{
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
              }}
              onClick={() => navigate(`/shop/category/${c._id}`)}
            >
              <ListItemText sx={{ flexGrow: 1 }}>{c.category}</ListItemText>
              <ArrowRightIcon
                sx={{
                  height: "100%",
                  fontSize: "30px",
                }}
              />
            </ListItemButton>
          ))}
      </List>
    </CategoryDrawer>
    </Slide>
  );
};

export default CategoriesDiv;
