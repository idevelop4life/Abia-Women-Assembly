require("dotenv").config({path: __dirname + "/.env"})
const PORT = process.env.PORT || 9000; 
const express = require('express')
const app = express(); 
const cors = require('cors')
const pool = require('./db.js') // Add database connection
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const { v4: uuidv4 } = require('uuid'); // Add uuid for generating IDs

app.use(express.json())
app.use(cors())
app.use("/auth", require("./routes/jwtAuth.js"))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

// Registration endpoint directly in main server
app.post('/register', async (req, res) => {
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

app.listen(PORT, ()=> {
    console.log(`Server listening on the port ${PORT}`)
})