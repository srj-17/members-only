const { messages } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();
  let specialMember = false;
  const admin = req.isAuthenticated() ? req.user.admin : false;
  if (authenticated) {
    specialMember = req.user.membership_status === "special";
  }
  const messageList = await messages.getMessages();

  res.render("index", {
    title: "Home",
    authenticated: authenticated,
    specialMember: specialMember,
    messages: messageList,
    admin: admin,
  });
}

module.exports = {
  getIndex,
};
