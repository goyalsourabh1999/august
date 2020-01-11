const userRouter = require("express").Router();
const { signup,login } = require("../controllers/authController");
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
module.exports = userRouter;
