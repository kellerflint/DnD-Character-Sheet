const request = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");
const route = require("../../routes/updatePasswordRoute");
const db = require("../../config/db");

// mock database module so we can control its behavior
jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

// mock bcrypt so password hashing can be controlled
jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use(route);

describe("POST /api/update-password unit", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns 400 if required fields missing", async () => {
    // send empty body missing userId and newPassword
    const res = await request(app).post("/api/update-password").send({});
    expect(res.status).toBe(400);
  });

  test("updates password successfully", async () => {
    // mock bcrypt to return a hashed password
    bcrypt.hash.mockResolvedValue("hashedPassword");

    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    // send valid request
    const res = await request(app).post("/api/update-password").send({
      userId: 1,
      newPassword: "Password123!"
    });

    // ensure bcrypt.hash and db.query were called
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Password updated");
  });
});
