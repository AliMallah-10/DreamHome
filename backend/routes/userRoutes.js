const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontrollers");
const userMiddleware = require("../middlewares/userMiddleware");

// Public routes
router.post(
  "/register",
  userMiddleware.validateRequiredFields,
  userMiddleware.validatePasswordMatch,
  userController.registerUser
);
// login route
router.post(
  "/login",
  userMiddleware.validateRequiredLogin,
  userController.loginUser
);
//   refresh token route
router.post("/refresh-token", userController.refreshToken);
// Forget Password Routes
router.post("/forget-password", userController.forgetPassword);
// Reset Password Routes
// This route renders the password reset form
router.get("/reset-password/:userId/:token", (req, res) => {
  const userId = req.params.userId;
  const token = req.params.token;

  ejs.renderFile(
    path.join(__dirname, "../views/reset-password.html"),
    { userId, token },
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(data);
      }
    }
  );
});
// This route handles the password reset form submission
router.post(
  "/reset-password/:userId/:token",
  userMiddleware.validateResetPassword,
  userController.resetPassword
);
// router.use(userMiddleware.verifyToken);
// Logout route
router.post("/logout", userController.logoutUser);
//  Get all users (admin only)
router.get("/Getusers", userController.getAllUsers);
//  Get users by ID
router.get(
  "/getuserbyid/:id",

  // userMiddleware.checkAdminRole,
  userController.getUserById
);
//  update users by ID
router.put("/updateuserbyid/:id", userController.updateUserById);
//  delete users by ID
router.delete(
  "/deleteuserbyid/:id",
  // userMiddleware.checkAdminRole,
  userController.deleteUserById
);
router.get(
  "/getuserbyUsername/:username",
  // userMiddleware.checkAdminRole,
  userController.getUserByUsername
);
router.post("/checkout", userController.Payments);
// User Verification Routes
router.get(
  "/verify/:userId/:uniqueString",
  userMiddleware.validateUserVerification,
  userController.handleUserVerification
);
router.get(
  "/verified",
  userMiddleware.validateShowVerifiedPage,
  userController.showVerifiedPage
);
router.post("/verify-password", userController.verifyPassword);
module.exports = router;
