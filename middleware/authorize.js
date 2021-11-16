const jwt = require("jsonwebtoken");
require("dotenv").config();

// -----> AUTHORIZATION ----->
// handles authorization using jwt header token
const authorize = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    // if no token/not logged in
    if (!jwtToken) {
      return res.status(403).json("No token found. Please log in!");
    }

    // if payload does not match then will fail
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Invalid token. Please log in!");
  }
};

module.exports = authorize;
