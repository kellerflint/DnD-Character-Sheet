// Service Functions for API Calls
import apiConnection from "./axios";

// Only works if user is logged in since it requires a token now
export const getApiCheck = async () => {
   const response = await apiConnection.get("/api/check");
   return response.data;
}

// Connection for user registraction
export const registerUser = async (credentials) => {
   const response = await apiConnection.post("/api/register", credentials);
   return response.data;
};

// Connection for user login
export const loginUser = async (credentials) => {
   const response = await apiConnection.post("/api/login", credentials);
   return response.data;
};