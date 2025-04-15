const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();
  let specialMember = false;
  const admin = req.isAuthenticated() ? req.user.admin : false;
  if (authenticated) {
    specialMember = req.user.membership_status === "special";
  }
  const messages = await getMessages();

  console.log(messages);

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
