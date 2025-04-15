const { addMessage, deleteMessage } = require("../db/queries");

function getCreateMessage(req, res, next) {
  res.render("create_message_form", { title: "Create message" });
}

async function postCreateMessage(req, res, next) {
  const { message } = req.body;
  const { id: userId } = req.user;
  await addMessage(userId, message);
  res.redirect("/");
}

async function postDeleteMessage(req, res, next) {
  const { messageId } = req.params;
  await deleteMessage(messageId);
  res.redirect("/");
}

module.exports = {
  getCreateMessage,
  postCreateMessage,
  postDeleteMessage,
};
