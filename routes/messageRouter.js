const { Router } = require("express");
const {
  getCreateMessage,
  postCreateMessage,
  postDeleteMessage,
} = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/create", getCreateMessage);
messageRouter.post("/create", postCreateMessage);
messageRouter.post("/delete/:messageId", postDeleteMessage);

module.exports = messageRouter;
