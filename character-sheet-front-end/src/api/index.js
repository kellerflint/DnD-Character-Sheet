// Service Functions for API Calls
import apiConnection from "./axios";

export const getApiCheck = async () => {
   const response = await apiConnection.get("/api/check");
   return response.data;
}