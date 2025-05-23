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
const logoutRouter = require("./routes/logoutRouter");
const messageRouter = require("./routes/messageRouter");
const specialClubRouter = require("./routes/specialClubRouter");
const adminRouter = require("./routes/adminRouter");

// use routes
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/log-out", logoutRouter);
app.use("/special-club", specialClubRouter);
app.use("/admin", adminRouter);
app.use("/message", messageRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
