const { Router } = require("express");
const {
  getSpecialClubForm,
  postSpecialClubForm,
} = require("../controllers/speicalClubController");
const specialClubRouter = Router();

specialClubRouter.get("/", getSpecialClubForm);
specialClubRouter.post("/", postSpecialClubForm);

module.exports = specialClubRouter;
