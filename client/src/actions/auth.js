import * as api from "../api";

export async function createAccount(formData, setAlert) {
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
    })
    .catch((err) => {
    
        setAlert({
            severity: "warning",
            message: err.response.data.message,
          });
    });
}

export async function login(formData, setAlert) {
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
  } catch (err) {
    setAlert({
      severity: "warning",
      message: err.response.data.message,
    });
  }
}
