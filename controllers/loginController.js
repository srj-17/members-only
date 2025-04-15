const passport = require("passport");

function getLogin(req, res, next) {
  const messages = req.session.messages;
  res.render("login_form", { title: "Log in", messages: messages });
}

postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: "Wrong username or password!",
});

module.exports = {
  getLogin,
  postLogin,
};
