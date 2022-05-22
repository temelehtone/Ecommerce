import * as api from "../../api";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";
import { CREATE_PRODUCT, GET_PRODUCTS } from "../constants/productConstants";

export const createProduct =
  (formData, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await api.createProduct(formData);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
      setSuccessMessage(response.data.successMessage);
    } catch (error) {
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
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: error.response.data.errorMessage,
    });
    dispatch({ type: STOP_LOADING });
  }
};
