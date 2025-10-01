const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbPool = require("../config/db");
const authenticateToken = require("../middleware/authenticateToken");

// User Registration
router.post("/api/register", async (req, res) => {
   const { email, password } = req.body;

   // Basic validation
   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Email and password are required." });
   }

   try {
      // Check if user already exists
      const [existingUsers] = await dbPool.query(
         "SELECT email FROM users WHERE email = ?",
         [email]
      );
      if (existingUsers.length > 0) {
         return res.status(409).json({ message: "Email already in use." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // Store new user in the database
      const [result] = await dbPool.query(
         "INSERT INTO users (email, password_hash) VALUES (?, ?)",
         [email, password_hash]
      );

      res.status(201).json({
         message: "User created successfully",
         userId: result.insertId,
      });
   } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error during registration." });
   }
});

// User Login
router.post("/api/login", async (req, res) => {
   const { email, password } = req.body;

   // Basic validation
   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Email and password are required." });
   }

   try {
      // Find user by email
      const [rows] = await dbPool.query("SELECT * FROM users WHERE email = ?", [
         email,
      ]);
      const user = rows[0];

      if (!user) {
         return res.status(401).json({ message: "Invalid credentials." });
      }

      // Compare submitted password with stored hash
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials." });
      }

      // Create JWT
      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
         expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
   } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login." });
   }
});

// User Login Health Check
router.get("/api/check", authenticateToken, (req, res) => {
   res.json(
      `Hello, ${req.user.email}! You have successfully connected to the backend.`
   );
});

module.exports = router;