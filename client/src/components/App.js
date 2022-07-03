import React, { useEffect } from "react";
import { NavBar } from "./Navigation/NavBar";
import { ThemeProvider } from "@emotion/react";
import { RouteComponents } from "./Navigation/RouteComponents";
import { theme } from "./styles/styles";
import Box from "@mui/material/Box";
import Footer from "./Utils/Footer";

// Redux imports
import { useDispatch } from "react-redux";
import { loadCategories } from "../redux/actions/categoryActions";
import { componentStyles } from "./styles/componentStyles";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", bgcolor: "lightgrey" }}>
        <NavBar />
        <ThemeProvider theme={componentStyles}>
        <RouteComponents />
        </ThemeProvider>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
