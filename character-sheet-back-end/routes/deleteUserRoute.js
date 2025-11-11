const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/api/delete-user", async (req, res) => {

    const { userId } = req.body;
    // validate input
    if (!userId) {
        return res.status(400).json({ message: "userId required" });
    }

    try {
        // excute DELETE query using parameterized query to prevent SQL injection
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [userId]);

        // if affectedRows is 0, no user was found with that id
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error("Delete user error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
