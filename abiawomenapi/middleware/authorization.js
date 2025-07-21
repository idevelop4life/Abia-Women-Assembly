const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  const token = req.header("token");
  console.log("toke", token)

  if (token === undefined) {
    console.log("Not working")
    return res.status(403).json({ msg: "authorization denied, this not work" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verify",verify)
    req.user = verify;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};