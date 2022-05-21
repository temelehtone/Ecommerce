import isEmpty from "validator/lib/isEmpty";

export const productFormValidator = (productData, setAlert) => {
    if (productData.productImage === null) {
        setAlert({
            severity: 'error',
            message: 'Please select an image.'
        })
        return false
    } 
    if (isEmpty(productData.productName) || isEmpty(productData.productDescription) || isEmpty(productData.productPrice)) {
        setAlert({
            severity: 'error',
            message: 'All fields are required.'
        })
        return false
    }
    const price = parseFloat(productData.productPrice)
    
    if (isNaN(price) || productData.productPrice.split(",").length > 1 || productData.productPrice.split(" ").length > 1) {
        setAlert({
            severity: 'error',
            message: 'Price must be a number. Type should be something like 12.4'
        })
        return false
    }
    
    if (isEmpty(productData.productCategory) || productData.productCategory === "Choose One...") {
        setAlert({
            severity: 'error',
            message: 'Please select a category.'
        })
        return false
    }
    if (isEmpty(productData.productQuantity)) {
        setAlert({
            severity: 'error',
            message: 'Please select a quantity.'
        })
        return false
    }
    if (parseInt(productData.productQuantity) <= 0) {
        setAlert({
            severity: 'error',
            message: 'Quantity must be greater than 0.'
        })
        return false
    }

    return true
}