const router = require("express").Router();
const pool = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const authorization = require("../middleware/authorization.js");

router.get("/categories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// router.get('/categories/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
//         if (result.rowCount === 0) return res.status(404).json({ error: 'Category not found' });
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

router.post("/categories", async (req, res) => {
  const { name, description } = req.body;
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO categories (id, name, description) VALUES ($1, $2, $3) RETURNING *`,
      [id, name, description],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE categories SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
      [name, description, id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Category not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM categories WHERE id = $1 RETURNING *`,
      [id],
    );
    if (result.rowCount === 0)
      return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted", category: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
