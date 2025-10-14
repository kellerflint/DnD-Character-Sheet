const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbPool = require("../config/db");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/api/check", authenticateToken, (req, res) => {
   res.json(
      `Hello, ${req.user.email}! You have successfully connected to the backend.`
   );
});

router.post("/api/register", async (req, res) => {
   const { username, firstName, lastName, email, password } = req.body;

   if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
   }

   try {
      const [existingUsers] = await dbPool.query(
         "SELECT email, username FROM users WHERE email = ? OR username = ?",
         [email, username]
      );

      if (existingUsers.length > 0) {
         return res
            .status(409)
            .json({ message: "Email and/or Username already in use." });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      const [result] = await dbPool.query(
         "INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)",
         [username, firstName, lastName, email, password_hash]
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

router.post("/api/login", async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res
         .status(400)
         .json({ message: "Email and password are required." });
   }

   try {
      const [rows] = await dbPool.query("SELECT * FROM users WHERE email = ?", [
         email,
      ]);

      const user = rows[0];

      if (!user) {
         return res.status(401).json({ message: "Invalid credentials." });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials." });
      }

      const userInfo = {
         id: user.id,
         email: user.email,
         username: user.username,
      };

      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
         expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
   } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login." });
   }
});

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
});

module.exports = router;
