import { styled, createMuiTheme, alpha } from "@mui/material/styles";
import {
  Modal,
  Button,
  Box,
  TextField,
  IconButton,
  InputBase,
  Drawer,
  AppBar,
} from "@mui/material";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#35C37D",
      main: "#039c50",
      dark: "#0d8248",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#35C37D",
      main: "#35C37D",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#35C37D",
    },
    // error: will use the default color
  },
  overrides: {
    typography: {
      fontFamily: "azo-sans-web",
      // The default font size of the Material Specification.
      fontSize: 14, // px
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      // Tell Material-UI what's the font-size on the html element.
      // 16px is the default font-size used by browsers.
      htmlFontSize: 16,
    },
  },
  components: {
    MuiButton: {
      // Name of the rule
      styleOverrides: {
        root: {
          // Some CSS
          background: "rgba(53, 195, 125, 100)",
          borderRadius: 0,
          border: "1px solid",
          colorInherit: "#fff",
          color: "white",
          height: 40,
          padding: "0 30px",
          boxShadow: "4px 9px 26px 0 rgba(16,124,71,0.10)",
          "&:hover": {
            textDecoration: "none",
            backgroundColor: "#35C37D",
            transform: "scale(1.08)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: "#35C37D",
            },
          },
        },
      },
    },
  },
});

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: "5px",
  width: "200px",
  [theme.breakpoints.down("sm")]: {
    width: "50%",
  },
  border: "1px solid",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));
export const StyledCardButton = styled(Button)(({ theme }) => ({
  border: "1px solid",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
export const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  marginBottom: 15,
  gap: 20,
  gridTemplateColumns: "repeat(3, 1fr)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 2fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  paddingInline: "20px",
  borderTop: "1px solid #777",
  [theme.breakpoints.down("sm")]: {
    paddingInline: 10,
  },
}));

export const CustomModal = styled(Modal)(({ theme }) => ({
  width: "50%",
  height: 300,
  display: "flex",
  justifyContent: "space-around",
  border: "2px solid #000",
  left: "50%",
  top: "50%",
  backgroundColor: "#fff",
  transform: `translate(-${50}%, -${50}%)`,
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));
export const CustomProductModal = styled(Modal)(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "center",
  border: "2px solid #000",
  left: "50%",
  top: "50%",
  transform: `translate(-${50}%, -${50}%)`,
  overflowY: "auto",
  backgroundColor: "#fff",
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "20px",
}));

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    "&:focus": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 200;

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const MenuDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    }),
  },
}));

export const CategoryDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: drawerWidth,
    height: "auto",
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginTop: "70px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
    },
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: "none",
    }),
  },
}));
