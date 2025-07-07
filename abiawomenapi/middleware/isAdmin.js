const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied, token missing" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user; // Adjust if your payload structure differs

    if (req.user.member_type !== "admin") {
      return res.status(403).json({ msg: "Admins only - access denied" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
