const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  console.error("Authorization middleware invoked");
  const token = req.header("token");
  console.error("Authorization token received:", token);

  if (token === undefined) {
    return res.status(403).json({ msg: "authorization denied, this not work" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
