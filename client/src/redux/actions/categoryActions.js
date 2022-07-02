import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
} from "../constants/categoryConstants";
import * as api from "../../api";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";


export const loadCategories = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getCategories();

    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_CATEGORIES, payload: response.data.categories });
  } catch (err) {
    console.log("getCategories api error: ", err);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const getCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getCategory(categoryId);

    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_CATEGORY, payload: response.data.category });
  } catch (err) {
    console.log("getCategory api error: ", err);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};


export const createCategory =
  (formData, setErrorMessage, setSuccessMessage) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const response = await api.createCategory(formData);
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CREATE_CATEGORY, payload: response.data.category });
      setSuccessMessage(response.data.successMessage);
    } catch (error) {
      console.log("createCategory api error: ", error);
      dispatch({ type: STOP_LOADING });
      setErrorMessage(error.response.data.errorMessage);
    }
  };
