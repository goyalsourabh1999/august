const viewRouter = require("express").Router();
const {
  getHomePage,
  getPlansPage,
  getLoginPage
} = require("../controllers/viewController");
const {
  protectRoute,
  isUserVerified,logout
} = require("../controllers/authController");
viewRouter.use(isUserVerified);
viewRouter.route("/logout").get(logout)
viewRouter.route("").get(getHomePage);
viewRouter.route("/plans").get(protectRoute, getPlansPage);
viewRouter.route("/login").get(getLoginPage);

module.exports = viewRouter;
