// general setup
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("./db/pool");
const session = require("express-session");
const app = express();
const passport = require("passport");
// configure password strategy(ies)
require("./config/passport");

// decoding the body
app.use(express.urlencoded({ extended: true }));

// session setup
const SessionStore = require("connect-pg-simple")(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SessionStore({
      pool: pool,
      tableName: "session",
    }),
    cookie: {
      // 30 days to milliseconds calculation
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(passport.session());

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up path for static resources
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// import routes
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");

// use routes
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
