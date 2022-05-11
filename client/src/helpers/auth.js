import { deleteCookie, setCookie } from "./cookies";
import { deleteLocalStorage, setLocalStorage } from "./localStorage";

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user)
}

export const deleteAuthentication = () => {
    deleteCookie('token')
    deleteLocalStorage('user')
}