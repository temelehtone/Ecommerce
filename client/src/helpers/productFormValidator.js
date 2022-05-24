import isEmpty from "validator/lib/isEmpty";

export const productFormValidator = (productData, setClientsideErrorMsg) => {
  if (productData.productImage === null) {
    setClientsideErrorMsg("Please select an image.");
    return false;
  }
  if (
    isEmpty(productData.productName) ||
    isEmpty(productData.productDescription) ||
    isEmpty(productData.productPrice.toString())
  ) {
    setClientsideErrorMsg("All fields are required.");
    return false;
  }

  const price = parseFloat(productData.productPrice.toString());

  if (
    isNaN(price) ||
    productData.productPrice.toString().split(",").length > 1 ||
    productData.productPrice.toString().split(" ").length > 1
  ) {
    setClientsideErrorMsg(
      "Price must be a number. Type should be something like 12.4"
    );
    return false;
  }

  if (
    isEmpty(productData.productCategory) ||
    productData.productCategory === "Choose One..."
  ) {
    setClientsideErrorMsg("Please select a category.");
    return false;
  }
  if (isEmpty(productData.productQuantity.toString())) {
    setClientsideErrorMsg("Please select a quantity.");
    return false;
  }
  if (parseInt(productData.productQuantity) <= 0) {
    setClientsideErrorMsg("Quantity must be greater than 0.");
    return false;
  }

  return true;
};
