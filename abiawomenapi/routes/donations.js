// donations.js
const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");
const upload = require("../utils/s3.js"); // ✅ Fixed path
const AWS = require('aws-sdk'); // ✅ Added AWS import

// POST /donations - Create with receipt
router.post("/", authorization, upload.single("receipt"), async (req, res) => {
  try {
    const { category, donation_date, amount_donated } = req.body;
    const memberId = req.user.id;
    const receipt_s3_key = req.file ? req.file.key : null;

    const result = await pool.query(
      `INSERT INTO donations (member_id, category, donation_date, amount_donated, receipt_s3_key)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [memberId, category, donation_date, amount_donated, receipt_s3_key]
    );

    res.json({
      success: true,
      donationId: result.rows[0].id,
      message: "File uploaded and donation recorded successfully"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id/receipt-url", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT receipt_s3_key FROM donations WHERE id = $1 AND member_id = $2`,
      [id, userId]
    );

    const donation = result.rows[0];
    if (!donation || !donation.receipt_s3_key) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    const s3 = new AWS.S3(); // ✅ Fixed: was aws.S3()
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: donation.receipt_s3_key,
      Expires: 3600,
    });

    res.json({ url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to generate URL" });
  }
});

// GET /me - My donations
router.get("/me", authorization, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM donations WHERE member_id = $1 ORDER BY donation_date DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /:id - Update donation + receipt
router.put("/:id", authorization, upload.single("receipt"), async (req, res) => {
  try {
    const { id } = req.params;
    const { category, donation_date, amount_donated } = req.body;

    const check = await pool.query(
      "SELECT * FROM donations WHERE id = $1 AND member_id = $2",
      [id, req.user.id]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found or unauthorized" });
    }

    const receipt_s3_key = req.file ? req.file.key : check.rows[0].receipt_s3_key;

    const updated = await pool.query(
      `UPDATE donations
       SET category = $1, donation_date = $2, amount_donated = $3, receipt_s3_key = $4, updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [category, donation_date, amount_donated, receipt_s3_key, id]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    if (err.message === 'Only PDF and images allowed') {
      return res.status(400).json({ error: 'Only PDF and images allowed' });
    }
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /:id - Secure delete
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query(
      "DELETE FROM donations WHERE id = $1 AND member_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: "Donation not found or unauthorized" });
    }

    res.json({ message: "Donation deleted", donation: deleted.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;