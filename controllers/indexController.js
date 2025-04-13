const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();
  let specialMember = false;
  if (authenticated) {
    specialMember = req.user.membership_status === "special";
  }
  const messages = await getMessages();

  res.render("index", {
    title: "Home",
    authenticated: authenticated,
    specialMember: specialMember,
    messages: messages,
  });
}

module.exports = {
  getIndex,
};
