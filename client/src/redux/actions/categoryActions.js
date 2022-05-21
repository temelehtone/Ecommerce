import { categoryReducer } from "../reducers/categoryReducers";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { GET_CATEGORIES } from "../constants/categoryConstants";
import { getCategories } from "../../api/index";

import axios from "axios";

const loadCategories = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await getCategories()
        dispatch({ type: STOP_LOADING })
        dispatch({ type: GET_CATEGORIES, payload: response.data.categories })
    } catch (err) {
        console.log('getCategories api error: ', err)
        dispatch({ type: STOP_LOADING })
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage })
    }
}

export default loadCategories