const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT events.*
   FROM events
   ORDER BY event_date DESC`,
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get one event by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT events.*
       FROM events
       WHERE events.id = $1`,
      [req.params.id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    event_date,
    event_day,
    description,
    contact_phone,
    contact_email,
    category,
  } = req.body;

  const id = uuidv4();

  try {
    const result = await pool.query(
      `INSERT INTO events (
        id, name, event_date, event_day, description,
        contact_phone, contact_email, category
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        id,
        name,
        event_date,
        event_day,
        description,
        contact_phone,
        contact_email,
        category,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.put("/events/:id", async (req, res) => {
  const {
    name,
    category_id,
    event_date,
    event_day,
    description,
    contact_phone,
    contact_email,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE events SET
        name = $1,
        category_id = $2,
        event_date = $3,
        event_day = $4,
        description = $5,
        contact_phone = $6,
        contact_email = $7,
        updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        name,
        category_id || null,
        event_date,
        event_day,
        description,
        contact_phone,
        contact_email,
        req.params.id,
      ],
    );

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

router.delete("/events/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM events WHERE id = $1 RETURNING *`,
      [req.params.id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted", event: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
