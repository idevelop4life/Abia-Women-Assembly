const router = require('express').Router();
const pool = require('../db.js')
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const { v4: uuidv4 } = require('uuid'); // Add this missing import
// const validInfo = require('../middleware/validinfo.js');
// const authorization = require('../middleware/authorization.js');// Validation middleware

// Registration endpoint
router.get("/", (req, res) => {
    res.send("Hello World from Auth Route!")
})

router.post('/register', async (req, res) => {
  console.log("Registration endpoint hit");
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
      member_type = 'member' // default to basic member
    } = req.body;

    // Validate required fields
    if (!last_name || !first_name || !nationality || !state_city || !local_government || 
        !gender || !primary_phone || !marital_status || !date_of_birth || !occupation || 
        !next_of_kin_name || !next_of_kin_phone || !relationship_with_next_of_kin || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    console.log("Received registration request:", req.body);

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new member
    const query = `
      INSERT INTO members (
        id, last_name, first_name, nationality, state_city, local_government,
        gender, primary_phone, email, additional_contact_info, marital_status,
        date_of_birth, occupation, next_of_kin_name, next_of_kin_phone,
        next_of_kin_occupation, relationship_with_next_of_kin, password, member_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING id, first_name, last_name, email, member_type, created_at
    `;

    const values = [
      uuidv4(),
      last_name,
      first_name,
      nationality,
      state_city,
      local_government,
      gender,
      primary_phone,
      email || null,
      additional_contact_info || null,
      marital_status,
      new Date(date_of_birth),
      occupation,
      next_of_kin_name,
      next_of_kin_phone,
      next_of_kin_occupation || null,
      relationship_with_next_of_kin,
      hashedPassword,
      member_type
    ];

    const result = await pool.query(query, values);
    const newMember = result.rows[0];

    res.status(201).json({
      message: 'Member registered successfully',
      member: newMember
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email or phone
    if (error.code === '23505') {
      if (error.constraint.includes('email')) {
        return res.status(400).json({ error: 'Email already exists' });
      } else if (error.constraint.includes('primary_phone')) {
        return res.status(400).json({ error: 'Phone number already exists' });
      }
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email_or_phone, password } = req.body;

    // Validate required fields
    if (!email_or_phone || !password) {
      return res.status(400).json({ error: 'Email/phone and password are required' });
    }

    console.log("Received login request for:", email_or_phone);

    // Find user by email or phone
    const query = `
      SELECT id, first_name, last_name, email, member_type, password 
      FROM members 
      WHERE email = $1 OR primary_phone = $1
    `;
    
    const result = await pool.query(query, [email_or_phone]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You might want to generate a JWT token here for authentication
    // const token = generateJWTToken(user.id);

    // Return user info (excluding password)
    const userResponse = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      member_type: user.member_type
      // token: token // if using JWT
    };

    res.status(200).json({
      message: 'Login successful',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;