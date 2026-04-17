import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:2127/api",
});

// Add token to every request automatically
baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default baseAxios;
