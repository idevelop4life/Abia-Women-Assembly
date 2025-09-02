const router = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");
const upload = require("../utils/s3.js");

const uploadFields = upload.fields([
  { name: "proof_of_identity", maxCount: 1 },
]);


router.post("/", authorization, uploadFields, async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      proof_of_identity_type,
      area_of_interest,
      previous_experience,
      goals,
      availability,
      letter_of_intent,
      application_form_submitted,
    } = req.body;

    const memberId = req.user.id;

    if (!first_name || !last_name || !area_of_interest || !goals || !application_form_submitted) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const isValidYesNo = (value) => ["yes", "no"].includes(value);
    if (!isValidYesNo(application_form_submitted)) {
      return res.status(400).json({ error: "application_form_submitted must be 'yes' or 'no'" });
    }

    const proof_of_identity = req.files?.proof_of_identity?.length > 0 ? "yes" : "no";

    const result = await pool.query(
      `INSERT INTO empowermentopportunity (
        member_id,
        first_name,
        last_name,
        proof_of_identity_type,
        proof_of_identity,
        area_of_interest,
        previous_experience,
        goals,
        availability,
        letter_of_intent,
        application_form_submitted
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        memberId,
        first_name,
        last_name,
        proof_of_identity_type || null,
        proof_of_identity,
        area_of_interest,
        previous_experience || null,
        goals,
        availability || null,
        letter_of_intent || null,
        application_form_submitted,
      ]
    );

    res.status(201).json({
      success: true,
      applicationId: result.rows[0].id,
      message: "Empowerment opportunity application submitted successfully",
    });
  } catch (err) {
    console.error("Error creating application:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/me", authorization, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, 
        member_id, 
        first_name, 
        last_name, 
        proof_of_identity_type,
        proof_of_identity,
        area_of_interest, 
        previous_experience, 
        goals,
        availability, 
        letter_of_intent,
        application_form_submitted
      FROM empowermentopportunity 
      WHERE member_id = $1 
      ORDER BY id DESC`,  
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching applications:", err.message); // Better log
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM empowermentopportunity WHERE id = $1 AND member_id = $2`,
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

router.put("/:id", authorization, uploadFields, async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    proof_of_identity_type,
    area_of_interest,
    previous_experience,
    goals,
    availability,
    letter_of_intent,
    application_form_submitted,
  } = req.body;

  try {
    const check = await pool.query(
      "SELECT * FROM empowermentopportunity WHERE id = $1 AND member_id = $2",
      [id, req.user.id]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: "Application not found or unauthorized" });
    }

    const current = check.rows[0];
    const proof_of_identity = req.files?.proof_of_identity?.length > 0 ? "yes" : current.proof_of_identity;

    if (application_form_submitted && !["yes", "no"].includes(application_form_submitted)) {
      return res.status(400).json({ error: "application_form_submitted must be 'yes' or 'no'" });
    }

    const result = await pool.query(
      `UPDATE empowermentopportunity SET
        first_name = $1,
        last_name = $2,
        proof_of_identity_type = $3,
        proof_of_identity = $4,
        area_of_interest = $5,
        previous_experience = $6,
        goals = $7,
        availability = $8,
        letter_of_intent = $9,
        application_form_submitted = $10,
        updated_at = NOW()
      WHERE id = $11
      RETURNING *`,
      [
        first_name || current.first_name,
        last_name || current.last_name,
        proof_of_identity_type || current.proof_of_identity_type,
        proof_of_identity,
        area_of_interest || current.area_of_interest,
        previous_experience || current.previous_experience,
        goals || current.goals,
        availability || current.availability,
        letter_of_intent || current.letter_of_intent,
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

router.delete("/:id", authorization, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM empowermentopportunity WHERE id = $1 AND member_id = $2 RETURNING *`,
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