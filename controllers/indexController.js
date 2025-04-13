const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  const message = req.isAuthenticated()
    ? "You are authenticated"
    : "You aren't authenticated";

  res.render("index", { title: "Home", message: message });
}

module.exports = {
  getIndex,
};
