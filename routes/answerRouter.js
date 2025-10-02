const express = require("express");
const router = express.Router();
const { postAnswer, getAnswer } = require("../controller/answerController");
const authMiddleware = require("../middleware/authMiddleware");

// Endpoint implementation for Post Answer for a question
router.post("/", authMiddleware, postAnswer);

// Endpoint implementation for Get Answer for a question
router.get("/:questionid", authMiddleware, getAnswer);

module.exports = router;
