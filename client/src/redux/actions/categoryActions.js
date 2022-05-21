import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { CREATE_CATEGORY, GET_CATEGORIES } from "../constants/categoryConstants";
import { getCategories, createCategory } from "../../api/index";
import { SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";


export const loadCategories = () => async dispatch => {
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

export const createCat = (formData) => async dispatch => {
    try {
        dispatch({ type: START_LOADING })
        const response = await createCategory()
        dispatch({ type: STOP_LOADING })
        dispatch({ type: CREATE_CATEGORY, payload: response.data.category })
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: response.data.successMessage })
    } catch (error) {
        
    }
    

}
