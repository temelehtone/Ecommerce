import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Button, InputBase, Modal, Typography } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import { red, blue, green } from "@mui/material/colors";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "5px",
  width: "200px",
  [theme.breakpoints.down("sm")]: {
    width: "50%",
  },
  border: "1px solid",
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  padding: "5px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const CustomModal = styled(Modal)(({ theme }) => ({
  width: "50%",
  height: "30%",
  display: "flex",
  justifyContent: "center",
  border: "2px solid #000",
  left: "50%",
  top: "50%",
  transform: `translate(-${50}%, -${50}%)`,

}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingLeft: 4,
    transition: theme.transitions.create("width"),
    border: "1px solid #000",
    margin: "20px",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));



const AdminDashboard = () => {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      secondary: {
        main: red[100],
        red: red[500],
        redHover: red[100],
        blue: blue[500],
        blueHover: blue[100],
        green: green[500],
        greenHover: green[100],
      },
    },
  });

  const [openCategory, setOpenCategory] = useState(false);

  const handleOpenCategory = () => {
    setOpenCategory(true);
  }
  const handleClose = () => {
    setOpenCategory(false);
  };

  const categoryModal = (
      <CustomModal
        open={openCategory}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: "flex", width: "100%", bgcolor: "white", flexDirection: "column" }}>
        <Box sx={{ bgcolor: "secondary.green", width: "100%", display: "flex", alignItems: "center", height: "30%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h4" sx={{ ml: 3, color: "#fff" }}>
            Add Category
          </Typography>
        </Box>
          <Typography sx={{ ml: 3, mt: 3}}>
            Category
          </Typography>
          <StyledInputBase />
          <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end"}}>
          <Button sx={{ bgcolor: "blue", color: "white", width: "100px", mx: 4, my: 2 }}>
            Submit
          </Button>
          </Box>
          
        </Box>
      </CustomModal>
    
  );

  return (
    <ThemeProvider theme={theme}>
      <FlexBox sx={{ bgcolor: "#353535" }}>
        <DashboardIcon sx={{ mr: 3, color: "white", fontSize: 50 }} />
        <h1 style={{ color: "white" }}>Dashboard</h1>
      </FlexBox>
      <FlexBox sx={{ bgcolor: "#DADADA" }}>
        <StyledButton
          sx={{
            color: "secondary.green",
            borderColor: "secondary.green",
            "&:hover": { bgcolor: "secondary.greenHover" },
          }}
          onClick={handleOpenCategory}
        >
          <AddIcon />
          Add Category
        </StyledButton>
        <StyledButton
          sx={{
            color: "secondary.blue",
            borderColor: "secondary.blue",
            "&:hover": { bgcolor: "secondary.blueHover" },
          }}
        >
          <AddIcon />
          Add Item
        </StyledButton>
        <StyledButton
          sx={{
            color: "secondary.red",
            borderColor: "secondary.red",
            "&:hover": { bgcolor: "secondary.redHover" },
          }}
        >
          <CreditCardIcon />
          View Orders
        </StyledButton>
      </FlexBox>
      
      {categoryModal}
      
      
    </ThemeProvider>
  );
};

export default AdminDashboard;
