const router = require('express').Router();
const pool = require('../db.js')
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const validInfo = require('../middleware/validinfo.js');
const authorization = require('../middleware/authorization.js');// Validation middleware

router.post("/register", validInfo, async (req, res) => {
  try {
    const {
      last_name,
      first_name,
      nationality,
      state_city,
      local_government,
      gender,
      primary_phone,
      email,
      additional_contact_info,
      marital_status,
      date_of_birth,
      occupation,
      next_of_kin_name,
      next_of_kin_phone,
      next_of_kin_occupation,
      relationship_with_next_of_kin,
      password,
      member_type // should be either 'member' or 'verified_member'
    } = req.body;

    // Check if primary phone or email already exists
    const existingMember = await pool.query(
      "SELECT * FROM members WHERE primary_phone = $1 OR email = $2",
      [primary_phone, email]
    );

    if (existingMember.rows.length > 0) {
      return res.status(400).json({ error: "Member already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new member
    const newMember = await pool.query(
      `INSERT INTO members (
        last_name,
        first_name,
        nationality,
        state_city,
        local_government,
        gender,
        primary_phone,
        email,
        additional_contact_info,
        marital_status,
        date_of_birth,
        occupation,
        next_of_kin_name,
        next_of_kin_phone,
        next_of_kin_occupation,
        relationship_with_next_of_kin,
        password,
        member_type
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, 
        $10, $11, $12, $13, $14, $15, $16, $17, $18
      ) RETURNING *`,
      [
        last_name,
        first_name,
        nationality,
        state_city,
        local_government,
        gender,
        primary_phone,
        email,
        additional_contact_info,
        marital_status,
        date_of_birth,
        occupation,
        next_of_kin_name,
        next_of_kin_phone,
        next_of_kin_occupation,
        relationship_with_next_of_kin,
        hashedPassword,
        member_type
      ]
    );

    // Generate token using returned user (optional)
    const token = jwtGenerator(newMember.rows[0].id); // or however your jwtGenerator is structured

    res.json({ token });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
});




router.post("/login", validInfo, async (req, res) => {
  const { user_email, password } = req.body;

  try {
    // Check if the user exists
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [user_email]
    );

    if (userQuery.rows.length === 0) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const user = userQuery.rows[0];

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwtGenerator(user);

    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Server Error" });
  }
});


router.get("/verify", authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router;