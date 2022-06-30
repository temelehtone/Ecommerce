import React, { useState } from "react";
// Styles
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider, List, ListItemText } from "@mui/material";
import {
  StyledDrawer,
  StyledAppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  FlexBox,
} from "./styles";
// Components
import { MainListItems } from "./ListItems";

// Redux
import { useSelector } from "react-redux";
import { showLoading } from "../helpers/loading";
import CategoriesDiv from "./CategoriesDiv";

export const NavBar = () => {
  const { loading } = useSelector((state) => state.loading);

  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);

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
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            </FlexBox>
            
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={10} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
          {loading && showLoading()}
        </StyledAppBar>
      
      <StyledDrawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
       
        <List component="nav">{<MainListItems categoryOpen={categoryOpen} setCategoryOpen={setCategoryOpen} />}</List>
        
      </StyledDrawer>
      <CategoriesDiv categoryOpen={categoryOpen} setCategoryOpen={setCategoryOpen} />
      
      
    </>
  );
};
