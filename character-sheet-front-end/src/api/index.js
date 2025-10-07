import apiConnection from "./axios";

export const getApiCheck = async () => {
   const response = await apiConnection.get("/api/check");
   return response.data;
}

export const registerUser = async (credentials) => {
   const response = await apiConnection.post("/api/register", credentials);
   return response.data;
};

export const loginUser = async (credentials) => {
   const response = await apiConnection.post("/api/login", credentials);
   return response.data;
};