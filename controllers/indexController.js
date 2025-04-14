const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();
  let specialMember = false;
  const admin = req.user.admin;
  if (authenticated) {
    specialMember = req.user.membership_status === "special";
  }
  const messages = await getMessages();

  res.render("index", {
    title: "Home",
    authenticated: authenticated,
    specialMember: specialMember,
    messages: messages,
    admin: admin,
  });
}

module.exports = {
  getIndex,
};
