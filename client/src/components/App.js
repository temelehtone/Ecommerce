import React, { useEffect, useState } from "react";
import { NavBar } from "./Navigation/NavBar";
import { ThemeProvider } from "@emotion/react";
import { RouteComponents } from "./Navigation/RouteComponents";
import { theme } from "./styles/styles";
import Box from "@mui/material/Box";
import Footer from "./Utils/Footer";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../redux/actions/categoryActions";
import { componentStyles } from "./styles/componentStyles";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);
  const { language } = useSelector(state => state.language);
  const [seed, setSeed] = useState(1);

    useEffect(() => {
      setSeed(Math.random())
    }, [language])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", bgcolor: "lightgrey" }}>
      
        <NavBar />
        <ThemeProvider theme={componentStyles}>
        <RouteComponents key={seed} />
        </ThemeProvider>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
