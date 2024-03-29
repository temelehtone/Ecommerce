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
import { CustomProductModal, ButtonBox, theme } from '../styles/styles';
// Helpers
import { SuccessAlert, ErrorAlert } from "../../helpers/message";
import { productFormValidator } from "../../helpers/productFormValidator";
import { showLoading } from "../../helpers/loading";
import { getTranslatedText as t } from '../../translations';
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
          flexDirection: "column",
          backgroundColor: "white",
          height: "fit-content"
        }}
      >
        

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ backgroundColor: theme.palette.secondary.color5, textAlign: "center", padding: 2 }}
            >
              {t('ADD_PRODUCT')}
            </Typography>
          {clientSideErrorMsg && <ErrorAlert message={clientSideErrorMsg}/>}
          {errorMessage && <ErrorAlert message={errorMessage}/>}
          {successMessage && <SuccessAlert message={successMessage}/>}

        {loading ? (
          showLoading()
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 2, mt: 1, justifyContent: "center" }} >
              <Grid item xs={11} sm={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productImage">{t('IMAGE')}</InputLabel>
                <Input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="productImage"
                  name="productImage"
                  onChange={handleProductImageChange}
                  type="file"
                />
                <InputLabel
                  htmlFor="productImage"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid",

                  }}
                >
                  <p style={{ fontSize: "12px" }}>
                    {productData.productImage && productData.productImage.name}
                  </p>
                  <Button
                    variant="raised"
                    component="span"
                  >
                    {t('BROWSE')}
                  </Button>
                </InputLabel>
              </Grid>
              <Grid item xs={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productName">{t('NAME')}</InputLabel>
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
                {t('DESCRIPTION')}
                </InputLabel>
                <textarea
                  onChange={handleProductChange}
                  id="productDescription"
                  name="productDescription"
                  style={{ width: "100%", resize: "vertical", height: 100 }}
                />
              </Grid>
              <Grid item xs={11} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productPrice">{t('PRICE')}</InputLabel>
                <TextField
                  onChange={handleProductChange}
                  fullWidth
                  name="productPrice"
                  type="price"
                  id="productPrice"
                />
              </Grid>
              <Grid item xs={11} sm={6} sx={{ ml: 1 }}>
                <InputLabel htmlFor="productCategory">{t('CATEGORY')}</InputLabel>
                <Select
                  labelId="productCategory"
                  id="productCategory"
                  value={productData.productCategory}
                  onChange={handleProductChange}
                  fullWidth
                  name="productCategory"
                  displayEmpty
                >
                  <MenuItem disabled value={t('CHOOSE_ONE')}>
                  {t('CHOOSE_ONE')}
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
                <InputLabel htmlFor="productQuantity">{t('QUANTITY')}</InputLabel>
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
                  m: 2,
               
                }}
                onClick={handleProductClose}
              >
                {t('CLOSE')}
              </Button>
              <Button
                sx={{
                  m: 2,
                }}
                type="submit"
              >
                {t('SUBMIT')}
              </Button>
            </ButtonBox>
          </>
        )}
      </Box>
    </CustomProductModal>
  )
}

export default AdminProductmodal