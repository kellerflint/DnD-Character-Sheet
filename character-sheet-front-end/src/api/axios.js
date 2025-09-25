// Replaces using fetch with axios for back-end API calls
import axios from "axios";

// Base URL from environment variable, defaults to localhost:PORT if not defined
const baseURL = import.meta.env.VITE_API_BASE_URL;

const apiConnection = axios.create({
   baseURL: baseURL,
   headers: {
      "Content-Type": "application/json",
   },
});

export default apiConnection;
