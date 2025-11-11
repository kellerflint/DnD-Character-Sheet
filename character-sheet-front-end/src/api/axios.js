// Replaces using fetch with axios for back-end API calls
import axios from "axios";

const baseURL = process.env.VITE_API_BASE_URL || "http://localhost:3001";

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
