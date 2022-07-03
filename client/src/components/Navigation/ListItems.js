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
import CategoryIcon from "@mui/icons-material/Category";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Slide } from "@mui/material";

import { isAuthenticated } from "../../helpers/auth";
import { logout } from "../../redux/actions/authActions";
import { getTranslatedText as t } from "../../translations";
// Redux
import { useDispatch } from "react-redux";

export const MainListItems = ({ setCategoryOpen, categoryOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateDashboard = () => {
    if (isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  };

  const handleCategoriesClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  if (isAuthenticated()) {
    return (
      <>
        <Slide
          in={!categoryOpen}
          direction="left"
          style={{ transitionDelay: categoryOpen ? "0.3s" : 0 }}
        >
          <ListItemButton onClick={handleCategoriesClick}>
            <ListItemIcon>
              <CategoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={t("CATEGORIES")} />
            {categoryOpen ? (
              <ArrowLeftIcon sx={{ color: "white" }} />
            ) : (
              <ArrowRightIcon sx={{ color: "white" }} />
            )}
          </ListItemButton>
        </Slide>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('HOME')} />
        </ListItemButton>
        <ListItemButton onClick={navigateDashboard}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('DASHBOARD')} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('ORDERS')} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('CUSTOMERS')} />
        </ListItemButton>
    
        <ListItemButton onClick={() => navigate("/shop")}>
          <ListItemIcon>
            <LayersIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('SHOP')} />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('SETTINGS')} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            dispatch(logout(navigate));
          }}
        >
          <ListItemIcon>
            <ExitToApp sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('SIGN_OUT')} />
        </ListItemButton>
      </>
    );
  }
  return (
    <>
      <Slide
        in={!categoryOpen}
        direction="left"
        style={{ transitionDelay: categoryOpen ? "0.3s" : 0 }}
      >
        <ListItemButton onClick={handleCategoriesClick}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary={t('CATEGORIES')} />
          {categoryOpen ? (
            <ArrowLeftIcon sx={{ color: "white" }} />
          ) : (
            <ArrowRightIcon sx={{ color: "white" }} />
          )}
        </ListItemButton>
      </Slide>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <HomeIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={t('HOME')} />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/sign-in")}>
        <ListItemIcon>
          <LoginIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={t('SIGN_IN')} />
      </ListItemButton>
    </>
  );
};
