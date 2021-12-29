const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  jwtGenerator,
  jwtEmailGenerator,
} = require("../utilities/jwtGenerator");

// -----> Authentication/Authorization -----> //

const authorize = require("../middleware/authorize");
const { validateInfo, validateEmail } = require("../middleware/validateInfo");

// Register and returns a jwt token
router.post("/register", validateInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if users exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // if user exists with given email
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists with given email!");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    await jwtEmailGenerator(
      newUser.rows[0].user_id,
      newUser.rows[0].user_email
    );
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// email verification
router.get("/confirmation/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const payload = jwt.verify(token, process.env.emailSecret);
    const id = payload.user.id;
    const confirmUser = await pool.query(
      "UPDATE users SET confirmed = true WHERE user_id = $1",
      [id]
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
  if (process.env.NODE_ENV === "production") {
    url = `https://same-here.herokuapp.com/`;
  } else {
    url = `http://localhost:3000/`;
  }
  res.redirect(url);
});

// sends user of given email a new jwt token
router.post("/confirmation", validateEmail, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email does not exist!");
    }

    // send new link
    await jwtEmailGenerator(user.rows[0].user_id, user.rows[0].user_email);

    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Errror!");
  }
});

// login and returns jwt token
router.post("/login", validateInfo, async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user email exists
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // if email not found
    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect!");
    }

    // authenticate password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    // if password is wrong
    if (!validPassword) {
      return res.status(401).json("Password or email is incorrect!");
    }

    if (!user.rows[0].confirmed) {
      return res.status(401).json("Please confirm email!");
    }
    // if they did confirm email
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// check if authorized by looking at jwt token in header
router.get("/is-verified", authorize, async (req, res) => {
  try {
    // if verified by authorize return true
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

// deletes user and all corresponding posts (and comments on them) as well as their comments
router.delete("/user", authorize, async (req, res) => {
  try {
    console.log(req.user.id);
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [req.user.id]
    );

    if (deleteUser.rows.length === 0) {
      return res.json(false);
    }
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error!");
  }
});

module.exports = router;
