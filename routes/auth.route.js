const express = require("express");
const authController = require("../controllers/auth.controller.js");


const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshTokens);
router.post("/forgot-password", authController.forgotPassword);
router.post("/change-password", authController.changePassword);
router.put("/edit-profile",  authController.editProfile);

module.exports = router;
