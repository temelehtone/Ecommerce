import { deleteCookie, setCookie, getCookie } from "./cookies";
import {
  deleteLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setCookie("token", token);
  setLocalStorage("user", user);
};

export const deleteAuthentication = () => {
  deleteCookie("token");
  deleteLocalStorage("user");
};

export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  }
  return false;
};

export const logout = (navigate, setAlert) => {
    deleteAuthentication();
    navigate("/sign-in");
    setAlert({
      severity: "error",
      message: "Signed out successfully!",
    });
}
