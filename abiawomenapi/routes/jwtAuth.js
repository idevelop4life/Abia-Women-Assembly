const router = require('express').Router();
const pool = require('../db.js')
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const { v4: uuidv4 } = require('uuid'); // Add this missing import
// const validInfo = require('../middleware/validinfo.js');
const authorization = require('../middleware/authorization.js');// Validation middleware

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
    const token = jwtGenerator(result.rows[0]); // ✅ use 'result' instead of undefined 'newUser'
    res.json({ token });


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
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // console.log("Received login request for:", email_or_phone);

    // Find user by email or phone
    const query = `
      SELECT id, first_name, last_name, email, member_type, password 
      FROM members 
      WHERE email = $1
    `;
    
    const result = await pool.query(query, [email]);
    
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


router.post('/google-login', async (req, res) => {
  const { google_id, email, first_name, last_name } = req.body;
  console.log(req.body)

  if (!google_id) {
    return res.status(400).json({ error: "google_id is required" });
  }

  try {
    const existingUser = await pool.query(
      'SELECT * FROM members WHERE google_id = $1',
      [google_id]
    );

    let user;

    if (existingUser.rows.length > 0) {
      user = existingUser.rows[0];
    } else {
      if (email) {
        const emailExists = await pool.query(
          'SELECT * FROM members WHERE email = $1',
          [email]
        );
        if (emailExists.rows.length > 0) {
          return res.status(400).json({ error: "Email already registered" });
        }
      }

      const result = await pool.query(
        `INSERT INTO members (google_id, email, first_name, last_name, profile_complete, member_type)
         VALUES ($1, $2, $3, $4, false, 'member')
         RETURNING *`,
        [google_id, email, first_name, last_name]
      );

      user = result.rows[0];
    }

    const token = jwtGenerator(user);

    return res.json({
      message: existingUser.rows.length > 0 ? "User exists" : "New user created",
      profile_complete: user.profile_complete,
      member_id: user.id,
      token, // send token here
    });

  } catch (error) {
    console.error("Error during Google login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post('/facebook', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Missing access token' });
  }

  try {
    // Fetch basic user info from Facebook
    const fbRes = await axios.get(
      `https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${accessToken}`
    );

    const { id: facebookId, first_name, last_name, email } = fbRes.data;

    // Insert or update member
    const result = await pool.query(
      `
      INSERT INTO members (facebook_id, first_name, last_name, email)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (facebook_id)
      DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name, email = EXCLUDED.email
      RETURNING *
      `,
      [facebookId, first_name, last_name, email]
    );

    const member = result.rows[0];

    // Return the user (or generate JWT if needed)
    res.json({ member });

  } catch (err) {
    console.error('Facebook login error:', err.message);
    res.status(401).json({ error: 'Invalid Facebook token' });
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