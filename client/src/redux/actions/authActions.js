import * as api from "../../api";
import { setAuthentication, isAuthenticated, deleteAuthentication } from "../../helpers/auth"
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { getTranslatedText as t } from "../../translations";

export const createAccount = (formData, navigate) => async dispatch => {
  dispatch({ type: START_LOADING })
  await api
    .createAccount(formData)
    .then((response) => {
      setAuthentication(response.data.token, response.data.result)
      dispatch({ type: "SHOW_SUCCESS_MESSAGE", payload: `${response.data.successMessage} ${t('WELCOME')} ${response.data.result.name}!`})

      if (isAuthenticated() && isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } else {
        navigate("/user/dashboard");
      }
      dispatch({ type: STOP_LOADING })
      
    })
    .catch((err) => {
      dispatch({  type: "SHOW_ERROR_MESSAGE", payload: err.response.data.errorMessage })
      dispatch({ type: STOP_LOADING })
    });
}

export const login = (formData, navigate, location) => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.login(formData);
    setAuthentication(data.token, data.result)
    dispatch({ type: "SHOW_SUCCESS_MESSAGE", payload: `${t("LOGGED_IN_SUCCESSFULLY")} ${t('WELCOME')} ${data.result.name}!`})

    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard")
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      
      if (location.search.split("=")[1] === "shipping") {
        navigate("/shop/shipping")
      } else {
        navigate("/user/dashboard");
      }
    }
    dispatch({ type: STOP_LOADING })
  } catch (err) {
    dispatch({  type: "SHOW_ERROR_MESSAGE", payload: err.response.data.errorMessage })
    dispatch({ type: STOP_LOADING })
  }
}

export const logout = (navigate) => async dispatch => {
    deleteAuthentication();
    navigate("/sign-in");
    dispatch({ type: "SHOW_ERROR_MESSAGE", payload: "Logged out successfully."})
}