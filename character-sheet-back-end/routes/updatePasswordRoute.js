const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Extract handler so we can test it directly
async function updatePasswordHandler(req, res) {
  const { email, securityQuestion, securityAnswer, password } = req.body;

  // Validation
  if (!email || !securityQuestion || !securityAnswer || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Fetch user
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      if (results.length === 0)
        return res.status(404).json({ error: "User not found" });

      const user = results[0];

      if (
        user.securityQuestion !== securityQuestion ||
        user.securityAnswer !== securityAnswer
      ) {
        return res.status(403).json({ error: "Security information incorrect" });
      }

      // Update password
      const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
      db.query(updateQuery, [password, email], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ error: "Failed to update password" });
        }

        return res.status(200).json({ message: "Password updated" });
      });
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

router.post("/", updatePasswordHandler);

module.exports = { router, updatePasswordHandler };
