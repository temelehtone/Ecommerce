import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return req;
// });

// Authentication
export const createAccount = (formData) =>
  API.post("/auth/createAccount", formData);
export const login = (formData) => API.post("/auth/login", formData);

// Category
export const createCategory = (formData) => API.post("/category/createCategory", formData);