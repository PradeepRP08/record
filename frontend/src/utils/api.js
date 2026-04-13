import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("record_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const signupUser = (formData) => API.post("/auth/signup", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getMe = () => API.get("/auth/me");

export default API;
