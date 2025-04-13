function postLogout(req, res) {
  // logout method is attached by passport.session()
  req.logout((err) => {
    if (err) {
      next(err);
    }

    res.redirect("/");
  });
}

module.exports = {
  postLogout,
};
