const { body, validationResult } = require("express-validator");
const { getUserByName, addUser } = require("../db/queries");
const bcrypt = require("bcryptjs");

const alphaError = `must only contain letters.`;
const lengthError = `must be between 1 and 20 characters.`;

const validateUser = [
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`First Name ${alphaError}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First Name ${lengthError}`),

  body("last_name")
    .trim()
    .isAlpha()
    .withMessage(`Last Name ${alphaError}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Last Name ${lengthError}`),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthError}`)
    .custom(async (value) => {
      const user = await getUserByName(value);

      // if user exists, don't create the user again
      if (user) {
        // thrown value will be the error message for custom validator
        throw new Error("Username already in use. 😢");
      }
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords must match."),
];

function getSignup(req, res) {
  res.render("signup_form", { title: "Sign-up" });
}

const postSignup = [
  validateUser,
  async (req, res, next) => {
    // test if the request is valid or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("signup_form", {
        title: "Sign up",
        errors: errors.array(),
      });
    }

    try {
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const username = req.body.username;
      const SALT = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, SALT);

      // there are 2 status of membership for a user: common and special,
      // by default, we're common members, until we know of a secret
      // password
      // TODO: implement secret password to non-members
      const membership_status = "common";

      await addUser(
        first_name,
        last_name,
        username,
        hashedPassword,
        membership_status,
      );

      res.redirect("/");
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
];

module.exports = {
  getSignup,
  postSignup,
};
