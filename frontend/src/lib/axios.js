import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

axiosInstance.interceptors.request.use((config) => {
  console.log("AXIOS REQUEST:", config.baseURL + config.url);
  return config;
});

export default axiosInstance;
