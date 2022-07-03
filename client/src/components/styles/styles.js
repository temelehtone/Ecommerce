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
    custom: {
      buttonColor: "#338BA8",
      editButton: "green",
      adminActionButton: "blue",
    }
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
  
});

export const DeleteButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "red",
  "&:hover": {
    backgroundColor: "red",
  }
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
  maxHeight: "100vh",
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

    width: drawerWidth,
    backgroundColor: theme.palette.primary.color4,
    color: "white",
    padding: 0,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.easeInOut,
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
    marginTop: "63px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "56px",
      left: "-80px",
    },
    backgroundColor: theme.palette.primary.color2,
    color: "white",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeInOut,
      duration: "3s",
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("opacity", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      display: "none",
    }),
  },
}));


