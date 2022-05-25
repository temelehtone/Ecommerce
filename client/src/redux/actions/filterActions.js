import * as api from "../../api";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { GET_NEW_ARRIVALS } from "../constants/filterConstants"


export const getNewArrivals = (sortBy='desc', limit=3) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        const response = await api.getNewArrivals(sortBy, limit);
        dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.newArrivals });
        dispatch({ type: STOP_LOADING });
      } catch (error) {
        console.log("getNewArrivals api error:", error)
        dispatch({ type: STOP_LOADING })
      }

}