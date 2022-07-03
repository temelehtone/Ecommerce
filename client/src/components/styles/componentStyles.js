import { createTheme } from "@mui/material/styles";
import { theme } from "./styles";

export const componentStyles = createTheme({
  components: {
    MuiButton: {
      // Name of the rule
      styleOverrides: {
        root: {
          // Some CSS
          background: theme.palette.custom.buttonColor,
          borderRadius: 0,
          border: "1px solid",
          colorInherit: "#fff",
          color: "white",
          height: 40,
          padding: "0 30px",
          boxShadow: "4px 9px 26px 0 rgba(16,124,71,0.10)",
          "&:hover": {
            textDecoration: "none",
            backgroundColor: theme.palette.custom.buttonColor,
            transform: "scale(1.08)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: theme.palette.custom.buttonColor,
            },
          },
        },
      },
    },
  },
});
