const { Router } = require("express");
const { postLogout } = require("../controllers/logoutController");
const logoutRouter = Router();

logoutRouter.post("/", postLogout);

module.exports = logoutRouter;
