const { addMessage } = require("../db/queries");

function getCreateMessage(req, res, next) {
  res.render("create_message_form", { title: "Create message" });
}

async function postCreateMessage(req, res, next) {
  const { message } = req.body;
  const { id: userId } = req.user;
  await addMessage(userId, message);
  res.redirect("/");
}

module.exports = {
  getCreateMessage,
  postCreateMessage,
};
