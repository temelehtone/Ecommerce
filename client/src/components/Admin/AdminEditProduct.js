import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Styles
import {
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Typography,
  Input,
  TextareaAutosize,
} from "@mui/material";
import { ButtonBox, theme } from "../styles";
// Helpers
import { productFormValidator } from "../../helpers/productFormValidator";
import { ErrorAlert } from "../../helpers/message";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getProduct } from "../../redux/actions/productActions";
import {
  loadCategories,
} from "../../redux/actions/categoryActions";

const AdminEditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const initialProductValues = {
    productImage: null,
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "Choose One...",
    productQuantity: "0",
  };
  const [productData, setProductData] = useState(initialProductValues);
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState("");

  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(loadCategories());
    } else {
      
      setProductData({ ...product, productImage: product.fileName });
    }
  }, [dispatch, productId, product]);

  

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleProductImageChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.files[0] });
  };

  const handleProductEditSubmit = async (e) => {
    e.preventDefault();

    if (!productFormValidator(productData, setClientSideErrorMsg)) return;
    var formData = new FormData();
    formData.append("productImage", productData.productImage);
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);
    formData.append("productPrice", productData.productPrice);
    formData.append("productCategory", productData.productCategory);
    formData.append("productQuantity", productData.productQuantity);

    dispatch(editProduct(productId, formData, navigate))

  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg} />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          height: "200px",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h4"
          sx={{ ml: 3, width: "100%",}}
        >
          Edit Product
        </Typography>
      </Box>
      <>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1, justifyContent: "center" }} >
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
                alignItems: "center",
                width: 300,
              }}
            >
              <Button
                variant="raised"
                component="span"
                sx={{
                  height: 50,
                }}
              >
                Choose File
              </Button>
              {productData.productImage && productData.productImage.name ? (
                <p style={{ fontSize: "12px" }}>
                  {productData.productImage.name}
                </p>
              ) : (
                <>
                  {productData.productImage ? (
                    <img
                      style={{ width: "120px", height: "80px" }}
                      alt="product"
                      src={`http://localhost:5000/uploads/${productData.productImage}`}
                    />
                  ) : null}
                </>
              )}
            </label>
          </Grid>
          <Grid item xs={11} sx={{ ml: 1 }}>
            <InputLabel htmlFor="productName">Name</InputLabel>
            <TextField
              onChange={handleProductChange}
              fullWidth
              id="productName"
              name="productName"
              value={productData.productName}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sx={{ display: "flex", flexDirection: "column", ml: 1 }}
          >
            <InputLabel htmlFor="productDescription">Description</InputLabel>
            <TextareaAutosize
              onChange={handleProductChange}
              id="productDescription"
              name="productDescription"
              value={productData.productDescription}
              style={{ width: "100%", resize: "vertical", height: 100 }}
            />
          </Grid>
          <Grid item xs={11} sx={{ ml: 1 }}>
            <InputLabel htmlFor="productPrice">Price</InputLabel>
            <TextField
              onChange={handleProductChange}
              fullWidth
              value={productData.productPrice}
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

        <ButtonBox component="form" onSubmit={handleProductEditSubmit} >
          <Button
            sx={{
      
              my: 2,
            }}
            onClick={() => navigate("/admin/dashboard")}
          >
            Go Back
          </Button>
          <Button
            sx={{
              mx: 4,
              my: 2,
            }}
            type="submit"
          >
            Submit
          </Button>
        </ButtonBox>
      </>
    </Box>
  );
};

export default AdminEditProduct;
