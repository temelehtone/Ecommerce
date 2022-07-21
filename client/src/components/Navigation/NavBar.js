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

import { List, MenuItem } from "@mui/material";
import {
  MenuDrawer,
  StyledAppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  theme,
  LanguageSelect,
} from "../styles/styles";

import { getTranslatedText as t } from "../../translations";
// Components
import { MainListItems } from "./ListItems";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { showLoading } from "../../helpers/loading";
import CategoriesDiv from "./CategoriesDiv";
import { useNavigate } from "react-router-dom";
import { changeLanguage } from "../../redux/actions/languageActions";
import { searchProducts } from "../../redux/actions/filterActions";

export const NavBar = () => {
  const { loading } = useSelector((state) => state.loading);
  const { cart } = useSelector((state) => state.cart);
  const { language } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = () => {
    if (open) {
      setCategoryOpen(false);
    }
    setOpen(!open);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const onSearch = (e) => {
    const newText = e.target.value;
    dispatch(searchProducts(newText));
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              <a href="/">
                <img
                  alt=""
                  src={"/images/Logo.png"}
                  style={{ width: "50px" }}
                />
              </a>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={t("SEARCH")}
                inputProps={{ "aria-label": "search" }}
                onChange={onSearch}
              />
            </Search>
            
            <Box sx={{ display: "flex", cursor: "pointer" }}>
              <LanguageSelect
                value={language}
                onChange={handleLanguageChange}
                displayEmpty
              >
                <MenuItem value="fi">FI</MenuItem>
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="sv">SV</MenuItem>
              </LanguageSelect>
            </Box>
          </Box>

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

      <MenuDrawer variant="permanent" open={open} hideBackdrop>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            height: { sx: "68px", md: "54px" },
            backgroundColor: theme.palette.primary.color6,
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>

        <List component="nav" sx={{ padding: 0 }}>
          {
            <MainListItems
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
            />
          }
        </List>
      </MenuDrawer>
      <CategoriesDiv
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
      />
    </>
  );
};
