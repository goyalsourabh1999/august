const viewRouter = require("express").Router();
const {
  getHomePage,
  getPlansPage,
  getLoginPage,
  getProfilePage,
  getUpdateUserPage,
  getPlansDetailsPage
} = require("../controllers/viewController");
const {
  protectRoute,
  isUserVerified,
  logout,getSignupPage
} = require("../controllers/authController");
viewRouter.use(isUserVerified);
viewRouter.route("/logout").get(logout);
viewRouter.route("/plans").get(protectRoute, getPlansPage);
viewRouter.route("/me").get(protectRoute, getProfilePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/updateUser").get(protectRoute, getUpdateUserPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/plans/:id").get(getPlansDetailsPage);
viewRouter.route("").get(getHomePage);

module.exports = viewRouter;
