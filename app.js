// general setup
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

// decoding the body
app.use(express.urlencoded({ extended: true }));

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up path for static resources
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// import routes
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");

// use routes
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
