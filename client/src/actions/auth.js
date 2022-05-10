import * as api from "../api";

export async function createAccount(formData, setAlert) {
  await api
    .createAccount(formData)
    .then((data) => {
      console.log(data);
      localStorage.setItem(
        "profile",
        JSON.stringify({ result: data.data.result, token: data.data.token })
      );
      console.log(data.message)
      setAlert({
        severity: "success",
        message: data.data.message,
      });
    })
    .catch((err) => {
        setAlert({
            severity: "error",
            message: err.response.data.message,
          });
    });
}

export async function login(formData) {
  try {
    const { data } = await api.login(formData);
    localStorage.setItem(
      "profile",
      JSON.stringify({ result: data.result, token: data.token })
    );
  } catch (error) {
    console.log(error.message);
  }
}
