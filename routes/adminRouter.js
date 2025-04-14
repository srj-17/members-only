const { Router } = require("express");
const {
  getAdminForm,
  postAdminForm,
} = require("../controllers/adminController");
const adminRouter = Router();

adminRouter.get("/", getAdminForm);
adminRouter.post("/", postAdminForm);

module.exports = adminRouter;
