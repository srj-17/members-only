const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const authenticated = req.isAuthenticated();

  res.render("index", {
    title: "Home",
    authenticated: authenticated,
  });
}

module.exports = {
  getIndex,
};
