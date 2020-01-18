const viewRouter = require("express").Router();
const { getHomePage } = require("../controllers/viewController");
viewRouter.route("").get(getHomePage);
module.exports = viewRouter;
