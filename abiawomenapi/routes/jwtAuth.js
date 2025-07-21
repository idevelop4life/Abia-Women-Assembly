const router = require('express').Router();
const pool = require('../db.js')
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator.js');
const { v4: uuidv4 } = require('uuid'); 
const authorization = require('../middleware/authorization.js');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,         
  api_secret: process.env.CLOUDINARY_API_SECRET,   
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


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
      member_type = 'member',
      profile_picture // optional
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

    // Use provided profile picture or fallback to default avatar
    let finalProfilePicture = profile_picture;

    if (!finalProfilePicture) {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      finalProfilePicture = `https://res.cloudinary.com/${cloudName}/image/upload/default_avatar.png`;
    }

    // Insert new member into DB
    const query = `
      INSERT INTO members (
        id, last_name, first_name, nationality, state_city, local_government,
        gender, primary_phone, email, additional_contact_info, marital_status,
        date_of_birth, occupation, next_of_kin_name, next_of_kin_phone,
        next_of_kin_occupation, relationship_with_next_of_kin, password, member_type,
        profile_picture
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
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
      member_type,
      finalProfilePicture
    ];

    const result = await pool.query(query, values);
    const newMember = result.rows[0];
    const token = jwtGenerator(newMember);

    res.json({ token });

  } catch (error) {
    console.error('Registration error:', error);

    if (error.code === '23505') {
      if (error.constraint?.includes('email')) {
        return res.status(400).json({ error: 'Email already exists' });
      } else if (error.constraint?.includes('primary_phone')) {
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

    // ✅ Check if email is returned
    if (!email) {
      return res.status(400).json({ error: 'Email permission not granted by Facebook' });
    }

    // Insert or update member in your database
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

    // Send the user back (you could issue a JWT here too)
    res.json({ member });

  } catch (err) {
    console.error('Facebook login error:', err.message);
    res.status(401).json({ error: 'Invalid Facebook token' });
  }
});
router.get("/verify", authorization, async (req, res) => {
  try {
    console.log("req",req.user)
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT first_name, last_name, email, primary_phone, nationality, state_city, profile_picture 
       FROM members 
       WHERE id = $1`, 
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    res.json({
      verified: true,
      user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.patch('/edit', authorization, upload.single('profile_picture'), async (req, res) => {
  try {
    const userId = req.user.user.id;
    const {
      first_name,
      last_name,
      email,
      primary_phone,
      nationality,
      state_city,
      password,
    } = req.body;

    // Fetch existing user
    const existingUser = await pool.query('SELECT * FROM members WHERE id = $1', [userId]);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    let hashedPassword = existingUser.rows[0].password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    let profilePictureUrl = existingUser.rows[0].profile_picture;
    if (req.file) {
      profilePictureUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'profile_pictures' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const updateQuery = `
      UPDATE members
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        primary_phone = $4,
        nationality = $5,
        state_city = $6,
        password = $7,
        profile_picture = $8
      WHERE id = $9
      RETURNING id, first_name, last_name, email, primary_phone, nationality, state_city, profile_picture
    `;
    const values = [
      first_name,
      last_name,
      email,
      primary_phone,
      nationality,
      state_city,
      hashedPassword,
      profilePictureUrl,
      userId,
    ];
    const updatedUser = await pool.query(updateQuery, values);

    res.json({ message: 'Profile updated successfully', user: updatedUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;