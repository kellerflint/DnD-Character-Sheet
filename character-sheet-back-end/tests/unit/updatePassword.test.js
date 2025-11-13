jest.mock("../../config/db", () => ({
    query: jest.fn((sql, values, callback) => {
      if (sql.includes("SELECT")) {
        callback(null, [
          {
            email: "test@example.com",
            securityQuestion: "Favorite color?",
            securityAnswer: "blue",
          }
        ]);
      } else if (sql.includes("UPDATE")) {
        callback(null, []);
      }
    })
  }));
  
  const { updatePasswordHandler } = require("../../routes/updatePasswordRoute");
  
  describe("POST /api/update-password unit", () => {
    it("updates password successfully", async () => {
      const req = {
        body: {
          email: "test@example.com",
          securityQuestion: "Favorite color?",
          securityAnswer: "blue",
          password: "newpass123",
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updatePasswordHandler(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Password updated" });
    });
  
    it("should return 400 if required fields are missing", async () => {
      const req = {
        body: {
          email: "",
          securityQuestion: "",
          securityAnswer: "",
          password: "",
        }
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await updatePasswordHandler(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
    });
  });
  