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

<<<<<<< HEAD
export const updatePassword = async (credentials) => {
   const response = await apiConnection.post("/api/update-password", credentials);
   return response.data;
};
=======
export const deleteUser = async () => {
   const response = await apiConnection.delete("/api/delete");
   return response.data;
}
>>>>>>> c8518e728af58cb1c577b4b9ff053656b5a9bb10
