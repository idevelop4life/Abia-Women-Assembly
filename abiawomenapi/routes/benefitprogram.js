const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");
const upload = require("../utils/s3.js"); // Multer + S3 middleware
const AWS = require("aws-sdk");

// Helper: Generate pre-signed URL for S3 object
const getSignedUrl = (key) => {
  const s3 = new AWS.S3();
  return s3.getSignedUrl("getObject", {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: 3600, // 1 hour
  });
};

// Configure multer for allowed document uploads
const uploadFields = upload.fields([
  { name: "proof_of_identity", maxCount: 1 },
  { name: "proof_of_residence", maxCount: 1 },
  { name: "guardian_consent", maxCount: 1 },
]);

// POST: Submit new benefit application
// Client does NOT send member_id — taken from JWT
router.post("/", authorization, uploadFields, async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      identity_document,
      selected_benefit,
      willingness_to_participate,
      application_form_submitted,
    } = req.body;

    const memberId = req.user.id;


    // Validate required fields
    if (!first_name || !last_name || !selected_benefit || !willingness_to_participate || !application_form_submitted) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get S3 keys from uploaded files (or null if not provided)
    const proof_of_identity = req.files?.proof_of_identity?.[0]?.key || null;
    const proof_of_residence = req.files?.proof_of_residence?.[0]?.key || null;
    const guardian_consent = req.files?.guardian_consent?.[0]?.key || null;

    const result = await pool.query(
      `INSERT INTO benefitprogram (
        member_id, first_name, last_name, identity_document,
        proof_of_identity, proof_of_residence,
        selected_benefit, willingness_to_participate, guardian_consent,
        application_form_submitted
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        memberId,
        first_name,
        last_name,
        identity_document || null,
        proof_of_identity,
        proof_of_residence,
        selected_benefit,
        willingness_to_participate,
        guardian_consent,
        application_form_submitted,
      ]
    );

    res.status(201).json({
      success: true,
      applicationId: result.rows[0].id,
      message: "Benefit program application submitted successfully",
    });
  } catch (err) {
    console.error("Error creating application:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Get all applications for the logged-in user
router.get("/me", authorization, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, member_id, first_name, last_name, identity_document,
        proof_of_identity, proof_of_residence,
        selected_benefit, willingness_to_participate, guardian_consent,
        application_form_submitted, created_at, updated_at
      FROM benefitprogram 
      WHERE member_id = $1 
      ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Get a single application (user-owned)
router.get("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM benefitprogram WHERE id = $1 AND member_id = $2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found or unauthorized" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Generate signed URL for a specific document
// Example: GET /benefitprograms/abc123/document/proof_of_identity
router.get("/:id/document/:field", authorization, async (req, res) => {
  const { id, field } = req.params;

  const allowedFields = [
    "proof_of_identity",
    "proof_of_residence",
    "guardian_consent",
  ];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: "Invalid document field" });
  }

  try {
    const result = await pool.query(
      `SELECT ${field}, member_id FROM benefitprogram WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    const row = result.rows[0];

    if (row.member_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const key = row[field];
    if (!key) {
      return res.status(404).json({ error: "Document not uploaded" });
    }

    const url = getSignedUrl(key);
    res.json({ url });
  } catch (err) {
    console.error("Error generating document URL:", err.message);
    res.status(500).json({ error: "Failed to generate document URL" });
  }
});

// PUT: Update an existing application
router.put("/:id", authorization, uploadFields, async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    identity_document,
    selected_benefit,
    willingness_to_participate,
    application_form_submitted,
  } = req.body;

  try {
    const check = await pool.query(
      "SELECT * FROM benefitprogram WHERE id = $1 AND member_id = $2",
      [id, req.user.id]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Application not found or unauthorized" });
    }

    const current = check.rows[0];

    // Use new file if uploaded, otherwise keep existing
    const proof_of_identity = req.files?.proof_of_identity?.[0]?.key || current.proof_of_identity;
    const proof_of_residence = req.files?.proof_of_residence?.[0]?.key || current.proof_of_residence;
    const guardian_consent = req.files?.guardian_consent?.[0]?.key || current.guardian_consent;

    const result = await pool.query(
      `UPDATE benefitprogram SET
        first_name = $1,
        last_name = $2,
        identity_document = $3,
        proof_of_identity = $4,
        proof_of_residence = $5,
        selected_benefit = $6,
        willingness_to_participate = $7,
        guardian_consent = $8,
        application_form_submitted = $9,
        updated_at = NOW()
      WHERE id = $10
      RETURNING *`,
      [
        first_name || current.first_name,
        last_name || current.last_name,
        identity_document || current.identity_document,
        proof_of_identity,
        proof_of_residence,
        selected_benefit || current.selected_benefit,
        willingness_to_participate || current.willingness_to_participate,
        guardian_consent,
        application_form_submitted || current.application_form_submitted,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Application updated successfully",
      application: result.rows[0],
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Delete an application
router.delete("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM benefitprogram WHERE id = $1 AND member_id = $2 RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found or unauthorized" });
    }

    res.json({
      message: "Application deleted successfully",
      deleted: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;