const router = require("express").Router();
const pool = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const authorization = require("../middleware/authorization.js");

router.post("/", authorization, async (req, res) => {
  try {
    const { category, donation_date, amount_donated } = req.body;
    const memberId = req.user.id;

    const result = await pool.query(
      `INSERT INTO donations (member_id, category, donation_date, amount_donated)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [memberId, category, donation_date, amount_donated],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM donations ORDER BY donation_date DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/me", authorization, async (req, res) => {
  try {
    const userid = req.user.id;

    const result = await pool.query(
      "SELECT * FROM donations WHERE member_id = $1 ORDER BY donation_date DESC",
      [userid],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, donation_date, amount_donated } = req.body;

    const updated = await pool.query(
      `UPDATE donations
       SET category = $1, donation_date = $2, amount_donated = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [category, donation_date, amount_donated, id],
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM donations WHERE id = $1 RETURNING *",
      [id],
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.json({ message: "Donation deleted", donation: deleted.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
