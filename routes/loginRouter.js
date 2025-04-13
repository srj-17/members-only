const { Router } = require("express");
const {
  getLogin,
  postLogin,
  getLoginFailure,
} = require("../controllers/loginController");
const loginRouter = Router();

loginRouter.get("/", getLogin);
loginRouter.post("/", postLogin);
loginRouter.get("/login-failure", getLoginFailure);

module.exports = loginRouter;
