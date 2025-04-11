const { getMessages, getUsers } = require("../db/queries");

async function getIndex(req, res) {
  res.send("This is index and messages will be shown here");
}

module.exports = {
  getIndex,
};
