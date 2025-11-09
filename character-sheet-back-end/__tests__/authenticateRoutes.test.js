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

