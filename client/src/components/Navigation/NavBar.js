import React, { useState } from "react";
// Styles
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { List } from "@mui/material";
import {
  MenuDrawer,
  StyledAppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  FlexBox,
  theme,
} from "../styles/styles";

import { getTranslatedText as t } from "../../translations";
// Components
import { MainListItems } from "./ListItems";

// Redux
import { useSelector } from "react-redux";
import { showLoading } from "../../helpers/loading";
import CategoriesDiv from "./CategoriesDiv";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { loading } = useSelector((state) => state.loading);
  const { cart } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    if (open) {
      setCategoryOpen(false);
    }
    setOpen(!open);
    
    
  };

  return (
    <>
    
    <StyledAppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "10px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            
            <FlexBox
              
            >
              <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center"   }}>
              <a href="/">
                <img alt="" src={"/images/Logo.png"} style={{ width: "50px" }} />
              </a>
              </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={t('SEARCH')}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            </FlexBox>
            
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                onClick={() => navigate("/shop/cart")}
                color="inherit"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
          {loading && showLoading()}
        </StyledAppBar>
      
      <MenuDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
            backgroundColor: theme.palette.primary.color6,
          }}
        >
          
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{ color: "white" }}/>
          </IconButton>
        </Toolbar>
       
        <List component="nav" sx={{ padding: 0, }}>{<MainListItems categoryOpen={categoryOpen} setCategoryOpen={setCategoryOpen} />}</List>
        
      </MenuDrawer>
      <CategoriesDiv categoryOpen={categoryOpen} setCategoryOpen={setCategoryOpen} />
      
      
    </>
  );
};
