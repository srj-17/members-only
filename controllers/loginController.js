const passport = require("passport");

function getLogin(req, res, next) {
  // only show the first message if there are messages
  const messages = req.session.messages ? req.session.messages.slice(0, 1) : "";
  res.render("login_form", { title: "Log in", messages: messages });
}

postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: "Wrong username or password",
});

module.exports = {
  getLogin,
  postLogin,
};
