import * as api from "../../api";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import {
  GET_NEW_ARRIVALS,
  SEARCH_PRODUCTS,
} from "../constants/filterConstants";

export const getNewArrivals = (sortBy = "desc", limit = 3) => async (
  dispatch
) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.getNewArrivals(sortBy, limit);
    dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.newArrivals });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("getNewArrivals api error:", error);
    dispatch({ type: STOP_LOADING });
  }
};

export const searchProducts = (
  searchTerm,
  sortBy = "desc",
  limit = 5
) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    if (searchTerm === "") {
      dispatch({ type: SEARCH_PRODUCTS, payload: {} });
    } else {
      const response = await api.searchProducts(searchTerm, sortBy, limit);
      dispatch({ type: SEARCH_PRODUCTS, payload: response.data.searchResults });
    }
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    console.log("searchProducts api error:", error);
    dispatch({ type: STOP_LOADING });
  }
};
