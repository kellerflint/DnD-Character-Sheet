const request = require("supertest");
const express = require("express");
const db = require("../../config/db");

// mock database module so we can control its behavior
jest.mock("../../config/db", () => ({
  query: jest.fn(),
}));

const route = require("../../routes/deleteUserRoute");

// create express server for testing
const app = express();
app.use(express.json());
app.use(route);

describe("POST /api/delete-user unit", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // reset mock call counts and implementations
  });

  test("returns 400 if userId missing", async () => {
    // send POST request without userId
    const res = await request(app).post("/api/delete-user").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("userId required");
  });

  test("deletes user successfully", async () => {
    // mock database to indicate one row affected (user deleted)
    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const res = await request(app).post("/api/delete-user").send({ userId: 1 });

    expect(db.query).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});
