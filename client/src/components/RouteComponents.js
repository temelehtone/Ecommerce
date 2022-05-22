import React from "react";
import {Routes, Route} from "react-router-dom"
// Styles
import { Box, Toolbar, Container } from "@mui/material"
// Components
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard";
import SettingPage from "./SettingPage";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import { ErrorAlert, SuccessAlert } from "../helpers/message";
// Redux
import { useSelector } from "react-redux"

export const RouteComponents = () => {

    const { successMsg, errorMsg } = useSelector(state => state.messages);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
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
          <Route path="/settings" element={<SettingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Box>
  );
};
