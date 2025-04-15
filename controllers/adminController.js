const { createAdmin } = require("../db/queries");

function getAdminForm(req, res, next) {
  res.render("admin_form", { title: "Admin login" });
}

async function postAdminForm(req, res, next) {
  const { admin_password } = req.body;
  const { id: user_id } = req.user;
  if (admin_password === process.env.ADMIN_PASSWORD) {
    await createAdmin(user_id);
    return res.redirect("/");
  }

  res.render("admin_form", {
    title: "Admin form",
    errors: [{ msg: "Wrong admin password" }],
  });
}

module.exports = {
  getAdminForm,
  postAdminForm,
};
