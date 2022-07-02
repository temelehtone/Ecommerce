import React from "react";
import {Routes, Route} from "react-router-dom"
// Styles
import { Box, Toolbar, Container } from "@mui/material"
// Components
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashboard from "./UserDashboard";
import SettingPage from "./SettingPage";
import AdminRoute from "./Admin/AdminRoute";
import AdminEditProduct from "./Admin/AdminEditProduct";
import CategoryProductsPage from "./CategoryProductsPage";
import UserRoute from "./UserRoute";
import { ErrorAlert, SuccessAlert } from "../helpers/message";
import ProductPage from "./ProductPage";

// Redux
import { useSelector } from "react-redux"
import Shop from "./Shop";

export const RouteComponents = () => {

    const { successMsg, errorMsg } = useSelector(state => state.messages);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Toolbar />
      <Container sx={{ mt: 4, mb: 4, minHeight: "80vh", bgcolor: 'white' }}>
        
        {successMsg && <SuccessAlert message={successMsg}/>}
        {errorMsg && <ErrorAlert message={errorMsg}/>}
        
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route
            path="/sign-in"
            element={<Login />}
          />
          <Route
            path="/user/dashboard"
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/product/:productId"
            element={
              <AdminRoute>
                <AdminEditProduct />
              </AdminRoute>
            }
          />
          <Route path="/shop/product/:productId" element={<ProductPage />} />
          <Route path="/shop/category/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </Container>
     
    </Box>
  );
};
