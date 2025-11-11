const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../config/db");

router.post("/api/update-password", async (req, res) => {
    const { userId, newPassword } = req.body;

    // validate input
    if (!userId || !newPassword) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // hash the new password
        // salt rounds set to 10
        const hashed = await bcrypt.hash(newPassword, 10);

        // update the user's password in the database
        const [result] = await db.query(
            "UPDATE users SET password_hash = ? WHERE id = ?",
            [hashed, userId]
        );

        // if no rows were affected, userId was not found
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // successful update response
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
