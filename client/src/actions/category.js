import * as api from "../api"


export const createCategory = async (formData, setAlert) => {
    await api.createCategory(formData).then((data) => {
        
        setAlert({
            severity: "success",
            message: data.data.category + " category was created successfully.",
          });
    }).catch(err => {
        console.log(err.response.data.message);
        setAlert({
            severity: "error",
            message: err.response.data.message,
        });
    })
}