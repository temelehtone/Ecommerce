import * as api from "../api";
import { setAuthentication, isAuthenticated } from "../helpers/auth";

export async function createAccount(formData, setAlert, navigate) {
  await api
    .createAccount(formData)
    .then((data) => {
      setAuthentication(data.data.token, data.data.result)
      setAlert({
        severity: "success",
        message: data.data.message + " Welcome " + data.data.result.name + "!",
      });

      if (isAuthenticated() && isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } else {
        navigate("/user/dashboard");
      }
      
    })
    .catch((err) => {
      setAlert({
        severity: "warning",
        message: err.response.data.message,
      });
    });
}

export async function login(formData, setAlert, navigate) {
  try {
    const { data } = await api.login(formData);
    setAuthentication(data.token, data.result)
    setAlert({
      variant: "success",
      message: "You logged in successfully! Welcome " + data.result.name + "!",
    });

    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard")
    } else {
      navigate("/user/dashboard");
    }
  } catch (err) {
    setAlert({
      severity: "warning",
      message: err.response.data.message,
    });
  }
}
