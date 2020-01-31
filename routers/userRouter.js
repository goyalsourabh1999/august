const userRouter = require("express").Router();
const multer=require("multer");
var upload = multer({ dest: "uploads" });
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  protectRoute
} = require("../controllers/authController");
const { getUser, updateUser } = require("../controllers/userController");
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/getUser").get(getUser);
userRouter.route("/forgetPassword").patch(forgetPassword);
userRouter.route("/resetPassword").patch(resetPassword);

userRouter
  .route("/updateUser/:id")
  .post(protectRoute, upload.single("photo"), updateUser);
// userRouter.route("/updatePassword").patch(updatePassword);
module.exports = userRouter;
