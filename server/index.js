const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// ----- ROUTES ----- //

// register/login route:

app.use("/auth", require("./routes/jwtAuth"));

// home route:

app.use("/home", require("./routes/home"));

app.listen(5000, () => {
  console.log("server is running on port ");
});
