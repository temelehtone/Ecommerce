import * as api from "../api"


export const createProduct = async (formData, setAlert) => {
    await api.createProduct(formData).then((response) => {
        
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