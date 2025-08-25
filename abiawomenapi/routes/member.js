// routes/members.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const cloudinary = require("../config/cloudinary"); // Adjust path as needed



router.post("/:memberId/complete-profile", async (req, res) => {
  const { memberId } = req.params;
  const profileData = req.body;

  try {
    // Get existing user
    const { rows } = await db.query("SELECT * FROM members WHERE id = $1", [
      memberId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Member not found" });
    }

    // Build SET clause dynamically
    const keys = Object.keys(profileData);
    if (keys.length === 0) {
      return res.status(400).json({ error: "No profile data provided" });
    }

    const setClauses = keys
      .map((key, idx) => `${key} = $${idx + 2}`)
      .join(", ");
    const values = keys.map((key) => profileData[key]);
    values.unshift(memberId);

    const query = `
      UPDATE members
      SET ${setClauses}, profile_complete = true, updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;

    const updatedUser = await db.query(query, values);

    return res.json({
      message: "Profile completed",
      member: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
