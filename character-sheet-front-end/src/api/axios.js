// Replaces using fetch with axios for back-end API calls
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiConnection = axios.create({
   baseURL: baseURL,
   headers: {
      "Content-Type": "application/json",
   },
});

apiConnection.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default apiConnection;
