const request = require("supertest");
const app = require("../server.js");
const db = require("../config/db.js");

let testingUser = {
    username: "testUser",
    firstName: "User",
    lastName: "Testing",
    email: "test@testing.com",
    password: "Testing123$",
    securityAnswer: "blue",
};

let authenticateToken = "";

// will run one time before all the tests
beforeAll(async () => {
    await db.query("DELETE FROM users WHERE EMAIL = ?", [testingUser.email]);
});

// will run once after all tests to clear up test user from test db
afterAll(async () => {
    await db.query("DELETE FROM users where email = ?", [testingUser.email]);
    await db.end();
});

describe("Integration tests for 3 API Endpoints", () => {
    
})