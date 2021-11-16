// validates login/register info
const validateInfo = (req, res, next) => {
  const { email, name, password } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  const validPassword = (userPassword) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{9,}$/.test(userPassword);
  };

  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      // if missing @ or does not look like an email
      return res.status(401).json("Invalid Email");
    } else if (!validPassword(password)) {
      return res
        .status(401)
        .json(
          "Invalid password. Must contain only letters, numbers, and underscores. Also at least one number, one lowercase, and one uppercase. Must have 9 or more character"
        );
    }
    // if does not only contains letters, numbers, underscores and at least one num, lowercase, uppercase
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};

module.exports = validateInfo;
