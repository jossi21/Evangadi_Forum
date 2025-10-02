const express = require("express");
const router = express.Router();

// import authMiddleware to protect the user secret
const authMiddleware = require("../middleware/authMiddleware");

// import API implement functions
const { register, login, checkUser } = require("../controller/userController");

// sign-up user
router.post("/register", register);

// login user
router.post("/login", login);

// Authentication middleware
router.get("/checkUser", authMiddleware, checkUser);

module.exports = router;
