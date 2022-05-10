import * as api from "../api";

export async function createAccount(formData, setAlert, navigate, setUser) {
  await api
    .createAccount(formData)
    .then((data) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({ user: data.data.result, token: data.data.token })
      );
      setAlert({
        severity: "success",
        message: data.data.message,
      });
      setUser(JSON.parse(localStorage.getItem("profile")))
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
    localStorage.setItem(
      "profile",
      JSON.stringify({ user: data.result, token: data.token })
    );
    setAlert({
      variant: "success",
      message: "You logged in successfully!",
    });
    setUser(JSON.parse(localStorage.getItem("profile")))
    navigate("/");
  } catch (err) {
    setAlert({
      severity: "warning",
      message: err.response.data.message,
    });
  }
}
