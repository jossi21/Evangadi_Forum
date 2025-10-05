const { StatusCodes, getStatusCode } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { response } = require("express");

// Implement API function for post answer
async function postAnswer(req, res) {
  const { questionid, answer } = req.body;
  const userid = req.user.userid;

  // Validate required fields
  if (!questionid || !answer) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide both question ID and answer",
    });
  }

  // Validate answer is not empty after trimming
  const trimmedAnswer = answer.trim();
  if (trimmedAnswer.length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Answer cannot be empty",
    });
  }

  try {
    // Check if user already posted the same answer to this question
    const [existingAnswers] = await dbConnection.query(
      `SELECT answerid FROM answertable 
       WHERE questionid = ? AND userid = ? AND answer = ?`,
      [questionid, userid, trimmedAnswer]
    );

    if (existingAnswers.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Duplicate Answer",
        message:
          "You have already posted this exact answer to this question. Please provide a different response.",
      });
    }

    // Insert the new answer if no duplicate exists
    const [result] = await dbConnection.query(
      "INSERT INTO answertable (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, trimmedAnswer]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
      answer_id: result.insertId,
    });
  } catch (error) {
    console.error("Database Error: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while posting your answer",
    });
  }
}
// implement Api function for get answer
async function getAnswer(req, res) {
  const { questionid } = req.params;
  // const username = req.user.username;
  // console.log(questionid);
  try {
    const [answers] = await dbConnection.query(
      "SELECT a.answerid AS answer_id, a.answer AS content, a.created_at, u.username AS user_name FROM answertable a JOIN usertable u ON a.userid = u.userid WHERE questionid = ?",
      [questionid]
    );
    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "Answer of the requested question not anyone reply yet",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        answers: answers.map((answer) => ({
          answer_id: answer.answer_id,
          content: answer.content,
          user_name: answer.user_name,
          created_at: answer.created_at,
        })),
      });
    }
  } catch (error) {
    // log to debug
    console.error("Database Error: ", error);

    // Handling Error of the Server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

module.exports = { postAnswer, getAnswer };
