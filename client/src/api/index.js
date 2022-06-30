import axios from "axios";

const API = axios.create({ 
  withCredentials: true,
  baseURL: "http://localhost:5000" 
});

// Authentication
export const createAccount = (formData) =>API.post("/auth/createAccount", formData);
export const login = (formData) => API.post("/auth/login", formData);

// Category
export const createCategory = (formData) => API.post("/category/createCategory", formData);
export const getCategories = () => API.get("/category/getCategories");
export const getCategory = (categoryId) => API.get(`/category/getCategory/${categoryId}`);

// Product
export const createProduct = (formData) => API.post("/product/createProduct", formData);
export const getProduct = (productId) => API.get(`/product/getProduct/${productId}`);
export const getProducts = () => API.get("/product/getProducts");
export const getProductsByCategory = (categoryId) => API.get(`/product/getProductsByCategory/${categoryId}`);
export const deleteProduct = (productId) => API.delete(`/product/deleteProduct/${productId}`);
export const editProduct = (productId, formData) => API.put(`/product/editProduct/${productId}`, formData)
// New Arrivals
export const getNewArrivals = (sortBy, limit) => API.get(`/filter/getNewArrivals?sortBy=${sortBy}&limit=${limit}`);
