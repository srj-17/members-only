const passport = require("passport");

function getLogin(req, res, next) {
  res.render("login_form", { title: "Log in" });
}

postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login-failure",
});

function getLoginFailure(req, res, next) {
  res.send("login failure");
}

module.exports = {
  getLogin,
  postLogin,
  getLoginFailure,
};
