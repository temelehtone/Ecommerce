import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE } from "../constants/messageConstants";
import { CHANGE_LANGUAGE } from "../constants/languageConstants";

export const changeLanguage = (language) => async dispatch => {
    try {
        dispatch({ type: START_LOADING });
        
        dispatch({ type: CHANGE_LANGUAGE, payload: language })

        
        dispatch({ type: STOP_LOADING });
      } catch (error) {
        console.log("changeLanguage api error:", error)
        dispatch({
            type: SHOW_ERROR_MESSAGE,
            payload: error.response.data.errorMessage,
          });
        dispatch({ type: STOP_LOADING })
      }
}