import * as api from "../../api";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCT_BY_CATEGORY } from "../constants/productConstants";

export const createProduct =
  (formData, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await api.createProduct(formData);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
      setSuccessMessage(response.data.successMessage);
    } catch (error) {
      console.log("createProduct api error:", error)
      dispatch({ type: STOP_LOADING });
      setErrorMessage(error.response.data.errorMessage);
    }
  };

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getProducts();
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("getProducts api error:", error)
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: STOP_LOADING });
  }
};

export const getProductsByCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getProductsByCategory(categoryId);
    console.log(response)
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: response.data.products });
  } catch (err) {
    console.log("getProductsByCategory api error: ", err);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const getProduct = (productId) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getProduct(productId);
    dispatch({ type: GET_PRODUCT, payload: response.data.product });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("getProduct api error:", error)
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: STOP_LOADING });
  }
};

export const deleteProduct = (productId) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.deleteProduct(productId);
    
    dispatch({ type: DELETE_PRODUCT, payload: response.data.deletedProduct._id });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("deleteProduct api error:", error)
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: STOP_LOADING });
  }
}

export const editProduct = (productId, formData, navigate) => async dispatch => {
  try {
    dispatch({ type: START_LOADING });
    
    const response = await api.editProduct(productId, formData);
    
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    navigate("/admin/dashboard");
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("editProduct api error:", error)
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: STOP_LOADING });
  }
}
