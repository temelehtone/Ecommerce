import React, { useState} from 'react'
// Styles
import {
    Box,
    Button,
    Typography,
    TextField,
    Input,
    Grid,
    Select,
    InputLabel,
    MenuItem,
  } from "@mui/material";
import { CustomProductModal, ButtonBox } from './styles';
// Helpers
import { SuccessAlert, ErrorAlert } from "../../helpers/message";
import { productFormValidator } from "../../helpers/productFormValidator";
import { showLoading } from "../../helpers/loading";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from '../../redux/actions/productActions';


const AdminProductmodal = ({openProduct, setOpenProduct}) => {
    const { categories } = useSelector(state => state.categories);
    const { loading } = useSelector(state => state.loading)
    const dispatch = useDispatch();

    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const initialProductValues = {
        productImage: null,
        productName: "",
        productDescription: "",
        productPrice: "",
        productCategory: "Choose One...",
        productQuantity: "0",
      };
    const [productData, setProductData] = useState(initialProductValues);

    const handleProductClose = () => {
        setOpenProduct(false);
        setProductData(initialProductValues)
        setErrorMessage("")
        setSuccessMessage("")
      };

    const handleProductChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
      };
    const handleProductImageChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.files[0] });
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
    
        
        dispatch(createProduct(formData, setErrorMessage, setSuccessMessage));
        setProductData(initialProductValues)
      };

  return (
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
          {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
          {errorMessage && <ErrorAlert message={errorMessage}/>}
          {successMessage && <SuccessAlert message={successMessage}/>}

        {loading ? (
          showLoading()
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

            {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
        {errorMessage && <ErrorAlert message={errorMessage}/>}
        {successMessage && <SuccessAlert message={successMessage}/>}

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
  )
}

export default AdminProductmodal