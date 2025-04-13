const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

async function verifyUser(username, password, done) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    const user = rows[0];

    if (!user) {
      done(null, false);
    }

    if (bcrypt.compare(password, user.password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (e) {
    done(e);
  }
}

const strategy = new LocalStrategy(verifyUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
