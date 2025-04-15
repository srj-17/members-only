const passport = require("passport");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
];

function getLogin(req, res, next) {
  // only show the first message if there are messages
  const auth_messages = req.session.messages
    ? req.session.messages.slice(0, 1)
    : "";
  res.render("login_form", {
    title: "Log in",
    auth_messages: auth_messages,
  });
}

postLogin = [
  validateUser,

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login_form", {
        title: "login_form",
        errors: errors.array(),
      });
    }

    // if there are no errors during validation
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: "Wrong username or password",
  }),
];

module.exports = {
  getLogin,
  postLogin,
};
