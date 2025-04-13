const { updateMembershipStatus } = require("../db/queries");

function getSpecialClubForm(req, res) {
  res.render("special_club_form", { title: "Special Club Form" });
}

function postSpecialClubForm(req, res) {
  const { secret_password } = req.body;
  const { id: userId } = req.user;
  if (secret_password === process.env.SPECIAL_CLUB_PASSWORD) {
    // make member special
    updateMembershipStatus(userId, "special");
    return res.redirect("/");
  }

  res.render("special_club_form", {
    title: "Special Club Form",
    errors: [{ msg: "Wrong password!" }],
  });
}

module.exports = {
  getSpecialClubForm,
  postSpecialClubForm,
};
