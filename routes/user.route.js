const express = require("express");
const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById); // Add the deleteUserById route

module.exports = router;
