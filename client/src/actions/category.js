import * as api from "../api"


export const createCategory = async (formData, setAlert) => {
    await api.createCategory(formData).then((response) => {
        
        setAlert({
            severity: "success",
            message: response.data.message
          });
    }).catch(err => {
        
        setAlert({
            severity: "error",
            message: err.response.data.message,
        });
    })
}
