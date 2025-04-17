const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { users } = require("../db/queries");
const bcrypt = require("bcryptjs");

async function verifyUser(username, password, done) {
  try {
    const user = await users.getUserByName(username);

    if (!user) {
      done(null, false);
    }

    if (await bcrypt.compare(password, user.password)) {
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
    const user = await users.getUserById(userId);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
