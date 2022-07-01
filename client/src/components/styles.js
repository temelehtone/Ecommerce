import { styled, createTheme, alpha } from "@mui/material/styles";
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
import { purple, blue } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#0808d4",
      main: "#1E5162",
      dark: "#075df2",
      color1: purple[100],
      color2: purple[200],
      color3: purple[300],
      color4: purple[400],
      color5: purple[500],
      color6: purple[600],
      color7: purple[700],
      color8: purple[800],
      color9: purple[900],
      
    },
    secondary: {
      light: "#8AC7DB",
      main: "#338BA8",
      contrastText: "#0808d4",
      color1: blue[100],
      color2: blue[200],
      color3: blue[300],
      color4: blue[400],
      color5: blue[500],
      color6: blue[600],
      color7: blue[700],
      color8: blue[800],
      color9: blue[900],
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
          background: "#0808d4",
          borderRadius: 0,
          border: "1px solid",
          colorInherit: "#fff",
          color: "white",
          height: 40,
          padding: "0 30px",
          boxShadow: "4px 9px 26px 0 rgba(16,124,71,0.10)",
          "&:hover": {
            textDecoration: "none",
            backgroundColor: "#0808d4",
            transform: "scale(1.08)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              backgroundColor: "#0808d4",
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
  backgroundColor: theme.palette.primary.color7,
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
    backgroundColor: theme.palette.primary.color4,
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
    backgroundColor: theme.palette.primary.color3,
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
