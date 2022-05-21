import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  LinearProgress,
  Input,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { red, blue, green } from "@mui/material/colors";
import AlertDismissible from "./AlertDismissible";

import { createCategory, getCategories } from "../actions/category";
import { createProduct } from "../actions/product";
import { productFormValidator } from "../helpers/productFormValidator";

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

const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  paddingInline: "20px",
  borderTop: "1px solid #777",
  [theme.breakpoints.down("sm")]: {
    paddingInline: 10,
  },
}));

const CustomModal = styled(Modal)(({ theme }) => ({
  width: "50%",
  height: 300,
  display: "flex",
  justifyContent: "center",
  border: "2px solid #000",
  left: "50%",
  top: "50%",
  transform: `translate(-${50}%, -${50}%)`,
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));
const CustomProductModal = styled(Modal)(({ theme }) => ({
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: "20px",
}));

const AdminDashboard = () => {
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
  const initialProductValues = {
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "Choose One...",
    productQuantity: "0",
  };

  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState(initialProductValues);
  const [categories, setCategories] = useState(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loading]);

  const loadCategories = async () => {
    await getCategories(setAlert, setCategories);
  };

  const handleOpenCategory = () => {
    setOpenCategory(true);
  };
  const handleCategoryClose = () => {
    setOpenCategory(false);
    setCategory("");
    setAlert(false);
  };
  const handleOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleProductClose = () => {
    setOpenProduct(false);
    setAlert(false);
    setProductData(initialProductValues)
  };
  const handleOpenOrders = () => {
    setOpenOrders(true);
  };
  const handleOrdersClose = () => {
    setOpenOrders(false);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleProductImageChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.files[0] });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setAlert({
        severity: "error",
        message: "Category can't be empty.",
      });
      return;
    }
    const data = { category };
    setLoading(true);
    await createCategory(data, setAlert);
    setLoading(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    if (!productFormValidator(productData, setAlert)) return;
    var formData = new FormData();
    formData.append("productImage", productData.productImage)
    formData.append("productName", productData.productName)
    formData.append("productDescription", productData.productDescription)
    formData.append("productPrice", productData.productPrice)
    formData.append("productCategory", productData.productCategory)
    formData.append("productQuantity", productData.productQuantity)

    setLoading(true);
    
    await createProduct(formData, setAlert);
    setLoading(false);
    setProductData(initialProductValues)
  };

  const categoryModal = (
    <CustomModal
      open={openCategory}
      onClose={handleCategoryClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "white",
          flexDirection: "column",
        }}
        onSubmit={handleCategorySubmit}
        component="form"
      >
        {alert ? (
          <AlertDismissible {...alert} setAlert={setAlert} />
        ) : (
          <Box
            sx={{
              bgcolor: "secondary.green",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ ml: 3, color: "#fff" }}
            >
              Add Category
            </Typography>
          </Box>
        )}
        {loading ? (
          <LinearProgress color="primary" />
        ) : (
          <>
            <Typography sx={{ ml: 3, mt: 3 }}>Category</Typography>
            <StyledTextField
              onChange={handleCategoryChange}
              name="category"
              value={category}
            />
            <ButtonBox>
              <Button
                sx={{
                  bgcolor: "#8E8E8E",
                  color: "white",
                  width: "100px",
                  my: 2,
                  "&:hover": { bgcolor: "red" },
                }}
                onClick={handleCategoryClose}
              >
                Close
              </Button>
              <Button
                sx={{
                  bgcolor: "secondary.green",
                  color: "white",
                  width: "100px",
                  my: 2,
                  "&:hover": { bgcolor: "secondary.greenHover" },
                }}
                type="submit"
              >
                Submit
              </Button>
            </ButtonBox>
          </>
        )}
      </Box>
    </CustomModal>
  );

  const productModal = (
    <CustomProductModal
      open={openProduct}
      onClose={handleProductClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "white",
          flexDirection: "column",
        }}
      >
        {alert ? (
          <AlertDismissible {...alert} setAlert={setAlert} />
        ) : (
          <Box
            sx={{
              bgcolor: "secondary.blue",
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "200px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ ml: 3, color: "#fff" }}
            >
              Add Product
            </Typography>
          </Box>
        )}
        {loading ? (
          <LinearProgress color="primary" />
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={11} sm={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productImage">Image</InputLabel>
                <Input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="productImage"
                  name="productImage"
                  onChange={handleProductImageChange}
                  type="file"
                />
                <label
                  htmlFor="productImage"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid",
                    backgroundColor: "#F2F2F2",
                  }}
                >
                  <p style={{ fontSize: "12px" }}>
                    {productData.productImage && productData.productImage.name}
                  </p>
                  <Button
                    variant="raised"
                    component="span"
                    sx={{
                      bgcolor: "secondary.blue",
                      "&:hover": { bgcolor: "secondary.blueHover" },
                    }}
                  >
                    Browse
                  </Button>
                </label>
              </Grid>
              <Grid item xs={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productName">Name</InputLabel>
                <TextField
                  onChange={handleProductChange}
                  fullWidth
                  id="productName"
                  name="productName"
                />
              </Grid>
              <Grid
                item
                xs={11}
                sx={{ display: "flex", flexDirection: "column", ml: 1 }}
              >
                <InputLabel htmlFor="productDescription">
                  Description
                </InputLabel>
                <textarea
                  onChange={handleProductChange}
                  id="productDescription"
                  name="productDescription"
                  style={{ width: "100%", resize: "vertical", height: 100 }}
                />
              </Grid>
              <Grid item xs={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productPrice">Price</InputLabel>
                <TextField
                  onChange={handleProductChange}
                  fullWidth
                  name="productPrice"
                  type="price"
                  id="productPrice"
                />
              </Grid>
              <Grid item xs={11} sm={6} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productCategory">Category</InputLabel>
                <Select
                  labelId="productCategory"
                  id="productCategory"
                  value={productData.productCategory}
                  onChange={handleProductChange}
                  fullWidth
                  name="productCategory"
                  displayEmpty
                >
                  <MenuItem disabled value="Choose One...">
                    Choose One...
                  </MenuItem>
                  {categories &&
                    categories.map((c) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.category}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid
                item
                xs={11}
                sm={5}
                sx={[
                  (theme) => ({
                    [theme.breakpoints.down("sm")]: {
                      ml: 1,
                    },
                  }),
                ]}
              >
                <InputLabel htmlFor="productQuantity">Quantity</InputLabel>
                <TextField
                  onChange={handleProductChange}
                  id="productQuantity"
                  name="productQuantity"
                  type="number"
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: 1000 } }}
                  value={productData.productQuantity}
                />
              </Grid>
            </Grid>

            {alert ? <AlertDismissible {...alert} setAlert={setAlert} /> : null}

            <ButtonBox component="form" onSubmit={handleProductSubmit}>
              <Button
                sx={{
                  bgcolor: "#8E8E8E",
                  color: "white",
                  width: "100px",
                  my: 2,
                  "&:hover": { bgcolor: "red" },
                }}
                onClick={handleProductClose}
              >
                Close
              </Button>
              <Button
                sx={{
                  bgcolor: "secondary.blue",
                  color: "white",
                  width: "100px",
                  mx: 4,
                  my: 2,
                  "&:hover": { bgcolor: "secondary.blueHover" },
                }}
                type="submit"
              >
                Submit
              </Button>
            </ButtonBox>
          </>
        )}
      </Box>
    </CustomProductModal>
  );
  const ordersModal = (
    <CustomModal
      open={openOrders}
      onClose={handleOrdersClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          bgcolor: "white",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "secondary.red",
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "30%",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h4"
            sx={{ ml: 3, color: "#fff" }}
          >
            Orders
          </Typography>
        </Box>
        <StyledTextField />
        <ButtonBox>
          <Button
            sx={{
              bgcolor: "#8E8E8E",
              color: "white",
              width: "100px",
              my: 2,
              "&:hover": { bgcolor: "red" },
            }}
            onClick={handleOrdersClose}
          >
            Close
          </Button>
          <Button
            sx={{
              bgcolor: "secondary.green",
              color: "white",
              width: "100px",
              mx: 4,
              my: 2,
              "&:hover": { bgcolor: "secondary.blue" },
            }}
          >
            Submit
          </Button>
        </ButtonBox>
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
          onClick={handleOpenProduct}
        >
          <AddIcon />
          Add Product
        </StyledButton>
        <StyledButton
          sx={{
            color: "secondary.red",
            borderColor: "secondary.red",
            "&:hover": { bgcolor: "secondary.redHover" },
          }}
          onClick={handleOpenOrders}
        >
          <CreditCardIcon />
          View Orders
        </StyledButton>
      </FlexBox>

      {categoryModal}
      {productModal}
      {ordersModal}
    </ThemeProvider>
  );
};

export default AdminDashboard;
