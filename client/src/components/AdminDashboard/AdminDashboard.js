import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {
  Box,
  Button,
  Typography,
  TextField,
  LinearProgress,
  Input,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { ShowErrorMsg, ShowSuccessMsg } from "../../helpers/message";

import { StyledButton, ButtonBox, CustomModal, CustomProductModal, FlexBox, StyledTextField, theme } from "./styles"
import { createCategory } from "../../actions/category";
import { createProduct } from "../../actions/product";
import { productFormValidator } from "../../helpers/productFormValidator";

// Redux
import { useSelector, useDispatch } from "react-redux";



const AdminDashboard = () => {
  
  const initialProductValues = {
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "Choose One...",
    productQuantity: "0",
  };

  const { successMsg, errorMsg } = useSelector(state => state.messages);
  const { loading } = useSelector(state => state.loading);

  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState(initialProductValues);
  const { categories } = useSelector(state => state.categories)

  const [openCategory, setOpenCategory] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');


  const handleOpenCategory = () => {
    setOpenCategory(true);
  };
  const handleCategoryClose = () => {
    setOpenCategory(false);
    setCategory("");
  };
  const handleOpenProduct = () => {
    setOpenProduct(true);
  };
  const handleProductClose = () => {
    setOpenProduct(false);
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
      setClientSideErrorMsg("Category can't be empty.")
      return;
    }
    const data = { category };
    await createCategory(data);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    if (!productFormValidator(productData, setClientSideErrorMsg)) return;
    var formData = new FormData();
    formData.append("productImage", productData.productImage)
    formData.append("productName", productData.productName)
    formData.append("productDescription", productData.productDescription)
    formData.append("productPrice", productData.productPrice)
    formData.append("productCategory", productData.productCategory)
    formData.append("productQuantity", productData.productQuantity)

    
    await createProduct(formData);
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
        {clientSideErrorMsg && ShowErrorMsg(clientSideErrorMsg)}
        {errorMsg && ShowErrorMsg(errorMsg)}
        {successMsg && ShowSuccessMsg(successMsg)}

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
          {clientSideErrorMsg && ShowErrorMsg(clientSideErrorMsg)}
        {errorMsg && ShowErrorMsg(errorMsg)}
        {successMsg && ShowSuccessMsg(successMsg)}

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

            {clientSideErrorMsg && ShowErrorMsg(clientSideErrorMsg)}
            {errorMsg && ShowErrorMsg(errorMsg)}
            {successMsg && ShowSuccessMsg(successMsg)}

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
