import * as api from "../api";
import { setAuthentication, isAuthenticated } from "../helpers/auth";
import { ShowSuccessMsg, ShowErrorMsg } from "../helpers/message";

export async function createAccount(formData, navigate) {
  await api
    .createAccount(formData)
    .then((response) => {
      setAuthentication(response.data.token, response.data.result)
      ShowSuccessMsg(response.data.message + " Welcome " + response.data.result.name + "!")

      if (isAuthenticated() && isAuthenticated().role === 1) {
        navigate("/admin/dashboard")
      } else {
        navigate("/user/dashboard");
      }
      
    })
    .catch((err) => {
      ShowErrorMsg(err.response.data.errorMessage)
    });
}

export async function login(formData, navigate) {
  try {
    const { data } = await api.login(formData);
    setAuthentication(data.token, data.result)
    ShowSuccessMsg("You logged in successfully! Welcome " + data.result.name + "!")

    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard")
    } else {
      navigate("/user/dashboard");
    }
  } catch (err) {
    ShowErrorMsg(err.response.data.message)
  }
}
