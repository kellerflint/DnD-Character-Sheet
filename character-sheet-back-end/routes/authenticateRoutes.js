const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbPool = require("../config/db");
const authenticateToken = require("../middleware/authenticateToken");

<<<<<<< HEAD
// User Registration
=======
router.get("/api/check", authenticateToken, (req, res) => {
   res.json(
      `Hello, ${req.user.email}! You have successfully connected to the backend.`
   );
});

>>>>>>> c8518e728af58cb1c577b4b9ff053656b5a9bb10
router.post("/api/register", async (req, res) => {
   const { username, firstName, lastName, email, password, securityInfo } = req.body;

   // Basic validation
   if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
   }

   try {
      // Check if user already exists
      const [existingUsers] = await dbPool.query(
         "SELECT email, username FROM users WHERE email = ? OR username = ?",
         [email, username]
      );
      if (existingUsers.length > 0) {
         return res
            .status(409)
            .json({ message: "Email and/or Username already in use." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      const security_hash = await bcrypt.hash(securityInfo, salt);

      // Store new user in the database
      const [result] = await dbPool.query(
         "INSERT INTO users (username, first_name, last_name, email, password_hash, security_hash) VALUES (?, ?, ?, ?, ?,?)",
         [username, firstName, lastName, email, password_hash, security_hash]
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

// Update Password
router.post("/api/update-password", async (req, res) => {
   try {
      const { email, answer, newPassword } = req.body;
      
      if (!email || !answer || newPassword) {
         return res.status(400).json({ message: "Email, security answer, and new password are required."})
      }

      const [rows] = await dbPool.query("SELECT id FROM users WHERE email = ?", [
         email
      ]);

      const user = rows[0];

      if (!user) {
         return res.status(401).json({ message: "Invalid credentials." });
      }

      const baseAnswer = answer.trim().toLowerCase();
      const isMatch = await bcrypt.compare(securityInfo, user.security_hash);
      
      if (!isMatch) {
         return res.status(401).json({ message: "Incorrect answer." });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(newPassword, salt);

      const isAnswerAsPassword = await bcrypt.compare(baseAnswer, password_hash);
      
      if (isAnswerAsPassword) {
         return res.status(400).json({ message: "New password cannot match your security answer." });
      }

      const [result] = await dbPool.query(
      "UPDATE users SET password_hash = ?, password_updated_at = NOW() WHERE id = ?",
      [password_hash, user.id]
      );

      return res.status(200).json({ message: "Password updated successfully." });

   } catch (err) {
      console.error("Error updating password: ", err);
      return res.status(500).json({ message: "Server Error." });
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
      const payload = {
         id: user.id,
         email: user.email,
         username: user.username,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
         expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
   } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login." });
   }
});

<<<<<<< HEAD
// User Login Health Check
router.get("/api/check", authenticateToken, (req, res) => {
   res.json(
      `Hello, ${req.user.email}! You have successfully connected to the backend.`
   );
=======
router.delete("/api/delete", authenticateToken, async (req, res) => {
   const userId = req.user.id;

   try {
      const [result] = await dbPool.query("DELETE FROM users WHERE id = ?", [
         userId,
      ]);

      if (result.affectedRows === 0) {
         return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({ message: "User account deleted successfully." });
   } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({
         message: "Server error during account deletion.",
      });
   }
>>>>>>> c8518e728af58cb1c577b4b9ff053656b5a9bb10
});

module.exports = router;
