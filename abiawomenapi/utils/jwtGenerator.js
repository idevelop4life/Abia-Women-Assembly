const jwt = require("jsonwebtoken");
require("dotenv").config();

// Updated to accept FULL user object
function jwtGenerator(user) {
  const payload = {
    user: {
      id: user.id,
      user_email: user.email, // Must match DB column names
      user_name: user.first_name,
      member_type: user.member_type, // Ensure this is included if needed
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });
}

module.exports = jwtGenerator;
