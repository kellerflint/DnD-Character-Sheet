vi.mock("axios", () => {
    const mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      interceptors: { request: { use: vi.fn() } },
    };
  
    return {
      default: {
        create: vi.fn(() => mockAxiosInstance),
        __mockInstance: mockAxiosInstance, 
      },
    };
  });
  
  import axios from "axios";
  import {
    getApiCheck,
    registerUser,
    loginUser,
    updatePassword,
    deleteUser,
  } from "../api";
  
  const getMockAxios = () => axios.__mockInstance;
  
  describe("API utility functions", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    test("getApiCheck calls apiConnection.get and returns data", async () => {
      const mockAxios = getMockAxios();
      mockAxios.get.mockResolvedValueOnce({ data: { status: "ok" } });
  
      const data = await getApiCheck();
      expect(mockAxios.get).toHaveBeenCalledWith("/api/check");
      expect(data).toEqual({ status: "ok" });
    });
  
    test("registerUser posts to /api/register and returns data", async () => {
      const mockAxios = getMockAxios();
      const mockUser = { username: "alex", password: "123" };
      mockAxios.post.mockResolvedValueOnce({ data: { success: true } });
  
      const data = await registerUser(mockUser);
      expect(mockAxios.post).toHaveBeenCalledWith("/api/register", mockUser);
      expect(data).toEqual({ success: true });
    });
  
    test("loginUser posts to /api/login and returns token", async () => {
      const mockAxios = getMockAxios();
      const creds = { email: "test@mail.com", password: "pass" };
      mockAxios.post.mockResolvedValueOnce({ data: { token: "abc123" } });
  
      const data = await loginUser(creds);
      expect(mockAxios.post).toHaveBeenCalledWith("/api/login", creds);
      expect(data).toEqual({ token: "abc123" });
    });
  
    test("updatePassword posts to /api/update-password", async () => {
      const mockAxios = getMockAxios();
      const payload = { email: "a@b.com", newPassword: "new123" };
      mockAxios.post.mockResolvedValueOnce({ data: { updated: true } });
  
      const data = await updatePassword(payload);
      expect(mockAxios.post).toHaveBeenCalledWith("/api/update-password", payload);
      expect(data).toEqual({ updated: true });
    });
  
    test("deleteUser calls apiConnection.delete and returns data", async () => {
      const mockAxios = getMockAxios();
      mockAxios.delete.mockResolvedValueOnce({ data: { deleted: true } });
  
      const data = await deleteUser();
      expect(mockAxios.delete).toHaveBeenCalledWith("/api/delete");
      expect(data).toEqual({ deleted: true });
    });
  });
  