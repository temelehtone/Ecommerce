import React from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import ExitToApp from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from '@mui/icons-material/Category';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { isAuthenticated } from "../helpers/auth";
import { logout } from "../redux/actions/authActions"
// Redux
import { useDispatch } from "react-redux";
import { theme } from "./styles";


export const MainListItems = ({ setCategoryOpen, categoryOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const navigateDashboard = () => {
    if (isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  };

  const handleCategoriesClick = () => {
    setCategoryOpen(!categoryOpen)
  }

  if (isAuthenticated()) {
    return (
      <>
        <ListItemButton onClick={handleCategoriesClick} >
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }}/>
          </ListItemIcon>    
          <ListItemText primary="Categories" />
          {categoryOpen ? <ArrowLeftIcon sx={{ color: "white" }}/> : <ArrowRightIcon sx={{ color: "white" }}/>}
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={navigateDashboard}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/shop")}>
          <ListItemIcon>
            <LayersIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          <ListItemIcon>
            <ExitToApp sx={{ color: "white" }}/>
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItemButton>
        
      </>
    );
  }
  return (
    <>
    <ListItemButton onClick={handleCategoriesClick} sx={{ color: "white" }}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }}/>
          </ListItemIcon>    
          <ListItemText primary="Categories" />
          {categoryOpen ? <ArrowLeftIcon/> : <ArrowRightIcon/>}
        </ListItemButton>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <HomeIcon sx={{ color: "white" }}/>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        onClick={() => navigate("/sign-in")}
      >
        <ListItemIcon>
          <LoginIcon sx={{ color: "white" }}/>
        </ListItemIcon>
        <ListItemText primary="Sign in" />
      </ListItemButton>
    </>
  );
};
