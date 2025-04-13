const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();
  const messages = await getMessages();

  res.render("index", {
    title: "Home",
    authenticated: authenticated,
    messages: messages,
  });
}

module.exports = {
  getIndex,
};
