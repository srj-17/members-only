const { Router } = require("express");
const {
  getCreateMessage,
  postCreateMessage,
} = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/create", getCreateMessage);
messageRouter.post("/create", postCreateMessage);

module.exports = messageRouter;
