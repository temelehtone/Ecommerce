import React, { useEffect } from "react";
import { NavBar } from "./NavBar";
import { ThemeProvider } from "@emotion/react";
import { RouteComponents } from "./RouteComponents";
import { theme } from "./styles";
import Box from "@mui/material/Box";
// Redux imports
import { useDispatch } from "react-redux";
import { loadCategories } from "../redux/actions/categoryActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <RouteComponents />
      </Box>
    </ThemeProvider>
  );
};

export default App;
