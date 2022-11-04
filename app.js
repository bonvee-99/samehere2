const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

// serve build if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ----- ROUTES ----- //

// register/login route:
app.get("/healthcheck", async (req, res) => {
  res.send("running")
})

app.use("/auth", require("./routes/jwtAuth"));

// home route:

app.use("/home", require("./routes/home"));

// app.use("/confirmation", require("./routes/verification"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
  // this sends heroku to the client page and then displays the route "*". If this is some random route then it will not work.
});

// problem... heroku is using server routes instead of client routes when you type them into url

module.exports = app;
