const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// serve build if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ----- ROUTES ----- //

// register/login route:

app.use("/auth", require("./routes/jwtAuth"));

// home route:

app.use("/home", require("./routes/home"));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
