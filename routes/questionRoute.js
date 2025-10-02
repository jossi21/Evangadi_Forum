const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  postQuestion,
  allQuestion,
  singleQuestion,
} = require("../controller/questionController");

// implement Post question router
router.post("/", authMiddleware, postQuestion);

// implement Get all questions router
router.get("/", authMiddleware, allQuestion);

// implement single question router

router.get("/:questionid", authMiddleware, singleQuestion);

module.exports = router;
