import * as api from "../api";
import { setAuthentication } from "../helpers/auth";
import { getLocalStorage } from "../helpers/localStorage";

export async function createAccount(formData, setAlert, navigate, setUser) {
  await api
    .createAccount(formData)
    .then((data) => {
      setAuthentication(data.data.token, data.data.result)
      setAlert({
        severity: "success",
        message: data.data.message + " Welcome " + data.data.result.name + "!",
      });
      setUser(getLocalStorage("user"))
      navigate("/");
    })
    .catch((err) => {
      setAlert({
        severity: "warning",
        message: err.response.data.message,
      });
    });
}

export async function login(formData, setAlert, navigate, setUser) {
  try {
    const { data } = await api.login(formData);
    setAuthentication(data.token, data.result)
    setAlert({
      variant: "success",
      message: "You logged in successfully! Welcome " + data.result.name + "!",
    });
    setUser(getLocalStorage("user"))
    navigate("/");
  } catch (err) {
    setAlert({
      severity: "warning",
      message: err.response.data.message,
    });
  }
}
