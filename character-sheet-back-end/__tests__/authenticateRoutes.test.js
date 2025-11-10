const request = require("supertest");
const app = require("../app.js");
const db = require("../config/db.js");
const setupTestDB = require("../setupTestDB.js");

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
	await setupTestDB();
	await db.query("DELETE FROM users WHERE EMAIL = ?", [testingUser.email]);
});

// will run once after all tests to clear up test user from test db
afterAll(async () => {
	await db.query("DELETE FROM users where email = ?", [testingUser.email]);
	await db.end();
});

describe("Integration tests for 3 API Endpoints", () => {

	test("POST /api/register - should create a new user", async () => {
		const res = await request(app)
			.post("/api/register")
			.send(testingUser);

		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty("message", "User created successfully");
		expect(res.body).toHaveProperty("userId");

		// Verify that the user exists in DB
		const [rows] = await db.query(
			"SELECT * FROM users WHERE email = ?",
			[testingUser.email]
		);
		expect(rows.length).toBe(1);
		expect(rows[0].username).toBe(testingUser.username);
	});

	test("POST /api/login - should return jwt for user", async() => {
		const res = await request(app)
			.post("/api/login")
			.send({ email: testingUser.email, password: testingUser.password });

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("message", "Login successful");
		expect(res.body).toHaveProperty("token");
	});

})