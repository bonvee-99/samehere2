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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
  // this sends heroku to the client page and then displays the route "*". If this is some random route then it will not work.
});

// problem... heroku is using server routes instead of client routes when you type them into url

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
