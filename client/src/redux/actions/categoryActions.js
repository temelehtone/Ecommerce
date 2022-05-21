import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { GET_CATEGORIES } from "../constants/categoryConstants";
import { getCategories } from "../../api/index";


export const loadCategories = () => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await getCategories()
        console.log(response.data)
        dispatch({ type: STOP_LOADING })
        dispatch({ type: GET_CATEGORIES, payload: response.data.categories })
    } catch (err) {
        console.log('getCategories api error: ', err)
        dispatch({ type: STOP_LOADING })
        // dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage })
    }
}
