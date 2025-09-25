// Replaces using fetch with axios for API calls
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiConnection = axios.create({
   baseURL: baseURL,
   headers: {
      "Content-Type": "application/json",
   },
});

export default apiConnection;
